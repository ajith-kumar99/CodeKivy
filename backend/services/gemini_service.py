import httpx
import json
import os
from dotenv import load_dotenv

load_dotenv()

# The system prompt to define the bot's persona for CodeKivy
CODEKIVY_SYSTEM_PROMPT = """
You are "KivyBot," the official assistant for CodeKivy, a Python-focused EdTech platform.
Your persona is friendly, encouraging, and knowledgeable, like a helpful tutor.
Your main goal is to help users learn Python and related programming concepts.

RULES:
1.  **Focus on Python:** Always prioritize Python-related questions.
2.  **Be Concise:** Keep answers short and easy to read for a chat window. Use code snippets (```python ... ```) for examples.
3.  **Be Encouraging:** Use positive language (e.g., "Great question!", "That's a common concept!").
4.  **Handle Off-Topic Questions:** Briefly answer and steer back: "My main job is helping you with Python. Do you have any coding questions?"
5.  **Greet Users:** If the user says "hi," introduce yourself as KivyBot.
6.  **Handle Screenshots:** If you are given a screenshot, you MUST analyze it based on the user's prompt.
    - If it's a screenshot of code, analyze the code for errors, explain what it does, or suggest improvements.
    - If it's a screenshot of the website, answer the user's question about it.
"""

# We use an async client because FastAPI is async
async def get_gemini_response(user_message: str, image_base64: str = None):
    
    api_key = os.getenv("GEMINI_API_KEY", "")
    
    # Use the appropriate model URL based on whether an image is present
    if image_base64:
        #
        # --- THIS IS THE FIX ---
        # "generativeluanguage" has been corrected to "generativelanguage"
        #
        model_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key="
    else:
        # Use the text-only model
        model_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key="

    url = f"{model_url}{api_key}"

    # --- Construct the Payload ---
    parts = []
    # Add the text prompt first
    parts.append({"text": user_message})

    if image_base64:
        # If an image exists, add it to the parts list
        # Remove the "data:image/jpeg;base64," prefix sent by the browser
        if "," in image_base64:
            image_data = image_base64.split(",")[1]
        else:
            image_data = image_base64

        parts.append({
            "inlineData": {
                "mimeType": "image/jpeg",
                "data": image_data
            }
        })

    payload = {
        "contents": [{"parts": parts}],
        "systemInstruction": {
            "parts": [{"text": CODEKIVY_SYSTEM_PROMPT}]
        }
    }
    # --- End Payload Construction ---

    try:
        # Increase timeout for potentially large image uploads
        async with httpx.AsyncClient() as client:
            response = await client.post(
                url,
                headers={"Content-Type": "application/json"},
                json=payload,
                timeout=60.0 # 60-second timeout for image processing
            )

            response.raise_for_status() 
            
            result = response.json()
            
            candidate = result.get("candidates", [{}])[0]
            content = candidate.get("content", {})
            part = content.get("parts", [{}])[0]
            text = part.get("text", "Sorry, I couldn't generate a response right now.")
            
            return text

    except httpx.HTTPStatusError as e:
        print(f"HTTP error occurred: {e}")
        # Check for API key specific error
        if e.response.status_code == 400:
             return "Sorry, there seems to be an issue with the API configuration. (Error 400)"
        return f"Sorry, I'm having trouble connecting to the AI (HTTP error: {e.response.status_code})."
    except Exception as e:
        # This is the block that was being triggered by the typo
        print(f"An error occurred: {e}") 
        return "Sorry, something went wrong on my end."