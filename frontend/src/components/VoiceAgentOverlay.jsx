import React, { useState, useRef, useEffect } from 'react';
import { X, Mic, Square, Loader2 } from 'lucide-react';
import { useReactMediaRecorder } from 'react-media-recorder';

// Import assets
import helloGif from '../assets/Hello.webp';
import voiceSound from '../assets/Voice.mp3';

// Helper to decode Base64 audio
const b64toBlob = (b64Data, contentType = 'audio/wav', sliceSize = 512) => {
  try {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  } catch (error) {
    console.error('Error decoding base64 audio:', error);
    return null;
  }
};

export const VoiceAgentOverlay = ({ onClose }) => {
  const [statusText, setStatusText] = useState('Press to speak');
  const [transcript, setTranscript] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [error, setError] = useState(null);
  const [showGif, setShowGif] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef(null);
  const voiceSoundRef = useRef(null);

  // Play voice sound on mount
  useEffect(() => {
    if (voiceSoundRef.current) {
      voiceSoundRef.current.play().catch(err => console.log('Sound autoplay blocked:', err));
    }
  }, []);

  // Main voice processing function
  const handleVoiceStop = async (blobUrl, blob) => {
    console.log('🎤 Recording stopped, processing audio...');
    setStatusText('Processing...');
    setIsProcessing(true);
    setIsBotSpeaking(false);
    setError(null);

    const formData = new FormData();
    formData.append('file', blob, 'recording.webm');

    try {
      console.log('📤 Sending audio to backend...');
      const response = await fetch('/api/voice', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📥 Response received:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.transcript || !data.text_response || !data.audio_response_b64) {
        throw new Error('Incomplete response from server');
      }

      setTranscript(data.transcript);
      setBotResponse(data.text_response);
      setStatusText('Speaking...');
      setIsProcessing(false);

      console.log('🔊 Decoding audio response...');
      const audioBlob = b64toBlob(data.audio_response_b64, 'audio/wav');
      
      if (!audioBlob) {
        throw new Error('Failed to decode audio');
      }

      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        
        audioRef.current.onloadeddata = () => {
          console.log('✅ Audio loaded, playing...');
          audioRef.current.play().catch(err => {
            console.error('Error playing audio:', err);
            setError('Failed to play audio response');
            setIsBotSpeaking(false);
            setStatusText('Press to speak');
          });
        };

        audioRef.current.onplay = () => {
          console.log('▶️ Audio playing');
          setIsBotSpeaking(true);
        };

        audioRef.current.onended = () => {
          console.log('⏹️ Audio finished');
          setStatusText('Press to speak');
          setIsBotSpeaking(false);
          URL.revokeObjectURL(audioUrl);
        };

        audioRef.current.onerror = (e) => {
          console.error('Audio playback error:', e);
          setError('Failed to play audio response');
          setIsBotSpeaking(false);
          setStatusText('Press to speak');
          URL.revokeObjectURL(audioUrl);
        };
      }

    } catch (error) {
      console.error('❌ Error processing voice:', error);
      setStatusText('Error occurred');
      setError(error.message);
      setTranscript('');
      setBotResponse('');
      setIsProcessing(false);
      setIsBotSpeaking(false);
    }
  };

  const {
    status,
    startRecording,
    stopRecording,
  } = useReactMediaRecorder({
    audio: true,
    blobPropertyBag: { type: 'audio/webm' },
    onStop: handleVoiceStop,
    askPermissionOnMount: true,
  });

  const isRecording = status === 'recording';

  const handleMicButtonClick = () => {
    if (isRecording) {
      console.log('⏸️ Stopping recording...');
      stopRecording();
      setStatusText('Processing...');
    } else if (!isProcessing && !isBotSpeaking) {
      console.log('🎙️ Starting recording...');
      
      // Hide GIF and mark as started
      if (!hasStarted) {
        setHasStarted(true);
      }
      setShowGif(false);
      
      setTranscript('');
      setBotResponse('');
      setError(null);
      setStatusText('Listening...');
      startRecording();
    }
  };

  const getWaveAnimation = () => {
    if (isRecording) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-full rounded-full border-2 border-red-500/30 animate-ping"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </div>
        </div>
      );
    }
    if (isBotSpeaking) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-full rounded-full border-2 border-blue-500/30 animate-pulse"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '1.5s',
                }}
              />
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center gap-4 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10 p-2 hover:bg-gray-800/50 rounded-full"
          aria-label="Close voice assistant"
        >
          <X size={20} />
        </button>

        {/* Main Content Area */}
        <div className="w-full flex flex-col items-center gap-6">
          
          {/* Hello GIF - Shows only before first interaction */}
          {showGif && (
            <div className="flex items-center justify-center mb-4">
              <img 
                src={helloGif} 
                alt="Hello" 
                className="w-48 h-48 object-contain drop-shadow-2xl"
              />
            </div>
          )}

          {/* Voice Visualizer / Mic Button Container */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            
            {/* Wave Animations */}
            {getWaveAnimation()}

            {/* Main Mic Button */}
            <button
              onClick={handleMicButtonClick}
              disabled={isProcessing || isBotSpeaking}
              className={`
                relative z-10 w-20 h-20 rounded-full transition-all duration-300
                flex items-center justify-center
                ${isProcessing ? 'bg-gray-700 cursor-wait' : ''}
                ${isRecording ? 'bg-gradient-to-br from-red-500 to-red-600 scale-110' : ''}
                ${isBotSpeaking ? 'bg-gradient-to-br from-blue-500 to-blue-600 cursor-wait' : ''}
                ${!isRecording && !isProcessing && !isBotSpeaking ? 'bg-gradient-to-br from-orange-500 to-orange-600 hover:scale-110' : ''}
                shadow-2xl disabled:opacity-70
              `}
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isProcessing ? (
                <Loader2 size={32} className="text-white animate-spin" />
              ) : isRecording ? (
                <Square size={28} className="text-white" />
              ) : (
                <Mic size={28} className="text-white" />
              )}
            </button>
          </div>

          {/* Status Text */}
          <h2 className="text-lg font-medium text-white text-center -mt-2">
            {statusText}
          </h2>

          {/* Transcript & Response */}
          {(transcript || botResponse || error) && (
            <div className="w-full max-h-40 overflow-y-auto space-y-3 p-4 bg-gray-800/30 rounded-2xl backdrop-blur-sm">
              {error && (
                <div className="animate-fade-in">
                  <p className="text-red-400 text-sm">
                    {error}
                  </p>
                </div>
              )}
              {transcript && (
                <div className="animate-fade-in">
                  <p className="text-gray-300 text-sm">
                    <span className="text-gray-500">You:</span> {transcript}
                  </p>
                </div>
              )}
              {botResponse && (
                <div className="animate-fade-in">
                  <p className="text-blue-300 text-sm">
                    <span className="text-blue-500">KivyBot:</span> {botResponse}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="text-center text-gray-500 text-xs">
            {isRecording ? (
              <p>Speak now • Click to stop</p>
            ) : isProcessing ? (
              <p>Processing your request...</p>
            ) : isBotSpeaking ? (
              <p>Listening to response...</p>
            ) : (
              <p>Tap the microphone to ask anything</p>
            )}
          </div>
        </div>

        {/* Hidden Audio Players */}
        <audio ref={audioRef} className="hidden" preload="auto" />
        <audio ref={voiceSoundRef} src={voiceSound} className="hidden" preload="auto" />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        /* Custom scrollbar */
        *::-webkit-scrollbar {
          width: 4px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 2px;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.5);
        }
      `}</style>
    </div>
  );
};