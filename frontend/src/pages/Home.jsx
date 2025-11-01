import React, { useState } from 'react'; // Import useState
import { MessageCircle, Mic } from 'lucide-react'; 
import Hero from '../components/Hero';
import Features from '../components/Features';
import FeaturedCourses from '../components/FeaturedCourses';
import HowItWorks from '../components/HowItWorks';
import ChatWindow from '../components/ChatWindow';
import { VoiceAgentOverlay } from '../components/VoiceAgentOverlay'; // 1. Import new voice component

function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false); // 2. Add new state for voice

  return (
    <div className="relative">
      
      {/* 🚀 FLOATING ICONS CONTAINER */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-4">
        
        {/* Microphone Icon (MODIFIED) */}
        {/* 3. Changed from <a> to <button> */}
        <button
          onClick={() => setIsVoiceAgentOpen(true)} // 4. Set click handler
          className="p-4 rounded-full 
                      bg-gray-800 hover:bg-gray-700 transition-colors 
                      shadow-xl shadow-gray-800/30 ring-4 ring-gray-900"
          aria-label="Open voice support"
        >
          <Mic className="h-6 w-6 text-white" strokeWidth={2.5} />
        </button>

        {/* Chat Icon (No change from your previous version) */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="p-4 rounded-full 
                      bg-orange-500 hover:bg-orange-600 transition-colors 
                      shadow-xl shadow-orange-500/30 ring-4 ring-gray-900"
          aria-label="Open chat support"
        >
          <MessageCircle className="h-6 w-6 text-white" strokeWidth={2.5} />
        </button>
      </div>

      {/* 5. Conditionally render both components */}
      {isChatOpen && <ChatWindow />}
      {isVoiceAgentOpen && <VoiceAgentOverlay onClose={() => setIsVoiceAgentOpen(false)} />}
      
      {/* Page content (no change) */}
      <Hero/>
      <FeaturedCourses />
      <Features />
      <HowItWorks />
      
    </div>
  );
}

export default Home;