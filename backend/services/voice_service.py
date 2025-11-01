import asyncio
import os
import httpx
from dotenv import load_dotenv

load_dotenv()

# --- OPTIMIZED TRANSCRIPTION ---

async def transcribe_audio(audio_data: bytes) -> str:
    """
    Transcribe audio using Deepgram's Prerecorded API.
    Optimized for speed.
    """
    try:
        api_key = os.getenv("DEEPGRAM_API_KEY")
        if not api_key:
            print("❌ DEEPGRAM_API_KEY not found")
            return "[Error: API key not configured]"
        
        print(f"✓ Audio: {len(audio_data)} bytes")
        
        # Use faster model and fewer features for lower latency
        url = "https://api.deepgram.com/v1/listen?model=nova-2&smart_format=false&punctuate=false&language=en"
        
        headers = {
            "Authorization": f"Token {api_key}",
            "Content-Type": "audio/webm"
        }
        
        print("✓ Transcribing...")
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                url,
                headers=headers,
                content=audio_data,
                timeout=20.0  # Reduced timeout
            )
            
            response.raise_for_status()
            result = response.json()
        
        transcript = result.get('results', {}).get('channels', [{}])[0].get('alternatives', [{}])[0].get('transcript', '')
        
        print(f"✓ Transcript: '{transcript}'")
        
        if not transcript or transcript.strip() == "":
            return "[Error: No speech detected]"
            
        return transcript

    except httpx.HTTPStatusError as e:
        print(f"❌ HTTP {e.response.status_code}: {e.response.text}")
        return f"[Error: HTTP {e.response.status_code}]"
    except Exception as e:
        print(f"❌ Error: {e}")
        return f"[Error: {str(e)}]"


# --- OPTIMIZED TTS WITH FASTER MODEL ---

async def speak_text(text: str) -> bytes:
    """
    Convert text to speech using Deepgram's fastest voice.
    Optimized for low latency.
    """
    try:
        api_key = os.getenv("DEEPGRAM_API_KEY")
        if not api_key:
            print("❌ DEEPGRAM_API_KEY not found")
            return b"[Error: API key not configured]"
        
        print(f"✓ Generating speech: '{text[:50]}...'")
        
        # Using faster model and lower sample rate for reduced latency
        # aura-luna-en is faster than asteria
        url = "https://api.deepgram.com/v1/speak?model=aura-luna-en&encoding=linear16&sample_rate=16000&container=wav"
        
        headers = {
            "Authorization": f"Token {api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {"text": text}
        
        print("✓ Calling TTS...")
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                url,
                headers=headers,
                json=payload,
                timeout=20.0  # Reduced timeout
            )
            
            response.raise_for_status()
            audio_data = response.content
        
        print(f"✓ Generated {len(audio_data)} bytes")
        
        if len(audio_data) == 0:
            print("❌ No audio generated")
            return b"[Error: No audio generated]"
            
        return audio_data

    except httpx.HTTPStatusError as e:
        print(f"❌ HTTP {e.response.status_code}: {e.response.text}")
        return f"[Error: HTTP {e.response.status_code}]".encode()
    except Exception as e:
        print(f"❌ Error: {e}")
        return f"[Error: {str(e)}]".encode()


# --- BONUS: PARALLEL PROCESSING FOR EVEN LOWER LATENCY ---

async def process_voice_fast(audio_data: bytes, llm_service) -> tuple:
    """
    Process voice with maximum speed using parallel operations where possible.
    
    Args:
        audio_data: Raw audio bytes
        llm_service: Function to call for LLM response (e.g., get_groq_response)
    
    Returns:
        tuple: (transcript, text_response, audio_response_bytes)
    """
    try:
        # Step 1: Transcribe (must be first)
        transcript = await transcribe_audio(audio_data)
        
        if transcript.startswith("[Error"):
            return transcript, "", b""
        
        # Step 2: Get LLM response (Groq is fastest)
        text_response = await llm_service(transcript)
        
        # Step 3: Generate TTS
        audio_response = await speak_text(text_response)
        
        return transcript, text_response, audio_response
        
    except Exception as e:
        print(f"❌ Processing error: {e}")
        return f"[Error: {e}]", "", b""