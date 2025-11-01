import base64
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict

# Import Gemini for image support
from services.gemini_service import get_gemini_response 

# Import Groq for fast responses
from services.groq_service import get_groq_response, get_groq_voice_response

# Import Voice service
from services.voice_service import transcribe_audio, speak_text

# Import Document service (NEW)
from services.document_service import process_document, summarize_document

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store current document context (in production, use Redis or database)
# Key: session_id, Value: document_text
active_documents: Dict[str, str] = {}

# --- ENHANCED CHAT ENDPOINT (Text + Images + Documents) ---
class ChatRequest(BaseModel):
    message: str
    image: Optional[str] = None
    document: Optional[Dict] = None  # NEW: {name, type, data, size}
    mode: Optional[str] = "chat"  # "chat" or "document"
    session_id: Optional[str] = "default"  # For tracking document context

@app.post("/api/chat")
async def handle_chat(request: ChatRequest):
    """
    Enhanced chat endpoint supporting:
    - Regular text chat (Groq - fast)
    - Image analysis (Gemini - supports vision)
    - Document Q&A (Groq with document context)
    """
    user_message = request.message
    image_base64 = request.image
    document = request.document
    mode = request.mode
    session_id = request.session_id or "default"
    
    print(f"📝 Chat request: {user_message[:50]}...")
    
    try:
        # --- SCENARIO 1: Image Analysis (use Gemini for vision) ---
        if image_base64:
            print("🖼️ Processing with image...")
            response = await get_gemini_response(user_message, image_base64)
            return {"response": response, "mode": "image"}
        
        # --- SCENARIO 2: Document Upload (process and store) ---
        if document and mode == "document":
            print(f"📄 Processing document: {document.get('name')}")
            
            # Extract text from document
            document_text = process_document(document)
            
            if document_text.startswith("[Error"):
                return {"response": document_text, "mode": "error"}
            
            # Store in session
            active_documents[session_id] = document_text
            
            # Create a summary for quick response
            doc_summary = summarize_document(document_text, max_chars=3000)
            
            print(f"✓ Document processed: {len(document_text)} chars")
            
            # Initial response about the document
            initial_response = f"""✅ Document loaded successfully! 

📊 **Stats:**
- File: {document.get('name')}
- Size: {len(document_text)} characters
- Ready for questions!

Ask me anything about this document!"""
            
            return {
                "response": initial_response,
                "mode": "document",
                "document_loaded": True
            }
        
        # --- SCENARIO 3: Document Q&A (use stored document context) ---
        if mode == "document" and session_id in active_documents:
            print(f"📖 Answering from document context...")
            
            document_context = active_documents[session_id]
            
            # For long documents, create a smart summary
            if len(document_context) > 8000:
                # Use a more aggressive summary for very long docs
                context_summary = summarize_document(document_context, max_chars=6000)
            else:
                context_summary = document_context
            
            # Use Groq with document context (FAST + ACCURATE)
            response = await get_groq_response(user_message, context_summary)
            
            return {
                "response": response,
                "mode": "document"
            }
        
        # --- SCENARIO 4: Regular Chat (use Groq for speed) ---
        print("💬 Regular chat mode...")
        response = await get_groq_response(user_message)
        return {"response": response, "mode": "chat"}
    
    except Exception as e:
        print(f"❌ Chat error: {e}")
        return {
            "response": "Sorry, something went wrong. Please try again.",
            "mode": "error"
        }


# --- VOICE ENDPOINT (Uses Groq for speed) ---
@app.post("/api/voice")
async def handle_voice(file: UploadFile = File(...)):
    """Handle voice input. Uses Groq for ultra-fast responses."""
    try:
        # 1. Read audio
        audio_data = await file.read()
        print(f"🎤 Received: {len(audio_data)} bytes")

        # 2. Transcribe
        print("📝 Transcribing...")
        transcript = await transcribe_audio(audio_data)
        if transcript.startswith("[Error"):
            print(f"❌ Transcription failed: {transcript}")
            return {"error": transcript}
        print(f"✅ Transcript: {transcript}")

        # 3. Get response from Groq (FASTEST) - Voice optimized
        print("🚀 Getting Groq response...")
        text_response = await get_groq_voice_response(transcript)
        print(f"✅ Response: {text_response[:50]}...")

        # 4. Generate speech
        print("🔊 Generating speech...")
        audio_response_bytes = await speak_text(text_response)
        if not audio_response_bytes or audio_response_bytes.startswith(b"[Error"):
            print(f"❌ TTS failed")
            return {"error": "TTS generation failed"}
        print(f"✅ Audio: {len(audio_response_bytes)} bytes")

        # 5. Return everything
        audio_response_b64 = base64.b64encode(audio_response_bytes).decode('utf-8')
        
        return {
            "transcript": transcript,
            "text_response": text_response,
            "audio_response_b64": audio_response_b64
        }
        
    except Exception as e:
        print(f"❌ Voice error: {e}")
        return {"error": str(e)}


# --- DOCUMENT MANAGEMENT ENDPOINTS ---

@app.post("/api/document/clear")
async def clear_document(session_id: str = "default"):
    """Clear document from session."""
    if session_id in active_documents:
        del active_documents[session_id]
        return {"status": "cleared", "session_id": session_id}
    return {"status": "not_found", "session_id": session_id}


@app.get("/api/document/status")
async def document_status(session_id: str = "default"):
    """Check if document is loaded in session."""
    has_document = session_id in active_documents
    doc_length = len(active_documents.get(session_id, "")) if has_document else 0
    
    return {
        "has_document": has_document,
        "document_length": doc_length,
        "session_id": session_id
    }


@app.get("/")
def read_root():
    return {
        "status": "CodeKivy API running",
        "features": {
            "chat": "Groq (ultra-fast text)",
            "images": "Gemini (vision support)",
            "documents": "PDF/DOCX/TXT analysis",
            "voice": "Groq + Deepgram"
        },
        "active_sessions": len(active_documents)
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "active_documents": len(active_documents)
    }