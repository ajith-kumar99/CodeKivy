import os
import base64
import hashlib
from typing import Optional, Dict
from io import BytesIO
import PyPDF2
import docx
from dotenv import load_dotenv

load_dotenv()

# In-memory cache for parsed documents (faster than re-parsing)
document_cache: Dict[str, str] = {}

def get_document_hash(document_data: str) -> str:
    """Generate a hash for caching purposes."""
    return hashlib.md5(document_data.encode()).hexdigest()

def extract_text_from_pdf(file_data: bytes) -> str:
    """
    Extract text from PDF file.
    Optimized for speed - uses PyPDF2 for fast extraction.
    """
    try:
        pdf_file = BytesIO(file_data)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        
        text_parts = []
        # Limit to first 50 pages for speed (can be adjusted)
        max_pages = min(len(pdf_reader.pages), 50)
        
        for page_num in range(max_pages):
            page = pdf_reader.pages[page_num]
            text_parts.append(page.extract_text())
        
        full_text = "\n".join(text_parts)
        print(f"✓ Extracted {len(full_text)} characters from {max_pages} pages")
        return full_text
        
    except Exception as e:
        print(f"❌ PDF extraction error: {e}")
        return f"[Error: Could not read PDF - {str(e)}]"

def extract_text_from_docx(file_data: bytes) -> str:
    """
    Extract text from DOCX file.
    Fast extraction using python-docx.
    """
    try:
        docx_file = BytesIO(file_data)
        doc = docx.Document(docx_file)
        
        text_parts = []
        for paragraph in doc.paragraphs:
            if paragraph.text.strip():
                text_parts.append(paragraph.text)
        
        full_text = "\n".join(text_parts)
        print(f"✓ Extracted {len(full_text)} characters from DOCX")
        return full_text
        
    except Exception as e:
        print(f"❌ DOCX extraction error: {e}")
        return f"[Error: Could not read DOCX - {str(e)}]"

def extract_text_from_txt(file_data: bytes) -> str:
    """
    Extract text from TXT file.
    Handles multiple encodings.
    """
    try:
        # Try UTF-8 first (most common)
        try:
            text = file_data.decode('utf-8')
        except UnicodeDecodeError:
            # Fallback to latin-1 if UTF-8 fails
            text = file_data.decode('latin-1')
        
        print(f"✓ Extracted {len(text)} characters from TXT")
        return text
        
    except Exception as e:
        print(f"❌ TXT extraction error: {e}")
        return f"[Error: Could not read TXT - {str(e)}]"

def process_document(document: Dict) -> str:
    """
    Main function to process uploaded document.
    Returns extracted text, using cache when possible.
    
    Args:
        document: Dict with 'name', 'type', 'data' (base64), 'size'
    
    Returns:
        Extracted text content
    """
    try:
        # Get document hash for caching
        doc_hash = get_document_hash(document['data'])
        
        # Check cache first
        if doc_hash in document_cache:
            print("✓ Using cached document")
            return document_cache[doc_hash]
        
        print(f"📄 Processing: {document['name']} ({document['size']} bytes)")
        
        # Decode base64 data
        # Remove "data:application/pdf;base64," prefix if present
        base64_data = document['data']
        if ',' in base64_data:
            base64_data = base64_data.split(',')[1]
        
        file_data = base64.b64decode(base64_data)
        
        # Extract text based on file type
        file_type = document['type']
        file_name = document['name'].lower()
        
        if file_type == 'application/pdf' or file_name.endswith('.pdf'):
            text = extract_text_from_pdf(file_data)
        elif file_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' or file_name.endswith('.docx'):
            text = extract_text_from_docx(file_data)
        elif file_type == 'text/plain' or file_name.endswith('.txt'):
            text = extract_text_from_txt(file_data)
        else:
            return f"[Error: Unsupported file type - {file_type}]"
        
        # Validate extraction
        if not text or text.startswith("[Error"):
            return text
        
        if len(text.strip()) < 10:
            return "[Error: Document appears to be empty or unreadable]"
        
        # Cache the result
        document_cache[doc_hash] = text
        
        # Limit cache size (keep last 10 documents)
        if len(document_cache) > 10:
            oldest_key = next(iter(document_cache))
            del document_cache[oldest_key]
        
        return text
        
    except Exception as e:
        print(f"❌ Document processing error: {e}")
        return f"[Error: Failed to process document - {str(e)}]"

def summarize_document(text: str, max_chars: int = 2000) -> str:
    """
    Create a quick summary of the document for context.
    Used to give LLM a preview without overwhelming it.
    """
    if len(text) <= max_chars:
        return text
    
    # Take beginning, middle, and end sections
    section_size = max_chars // 3
    beginning = text[:section_size]
    middle_start = len(text) // 2 - section_size // 2
    middle = text[middle_start:middle_start + section_size]
    end = text[-section_size:]
    
    summary = f"{beginning}\n\n[...middle section...]\n\n{middle}\n\n[...end section...]\n\n{end}"
    return summary

def clear_document_cache():
    """Clear the document cache (can be called periodically)."""
    global document_cache
    document_cache.clear()
    print("✓ Document cache cleared")