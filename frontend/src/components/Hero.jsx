import React from 'react';
import { ChevronRight, Play, Sparkles } from 'lucide-react';
import background from '../assets/Background.jpeg'

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <img src={background} alt="background" className='object-cover w-full h-full' />
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/90 to-black/30"></div>
        
        {/* Noise texture for premium feel (optional) */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             }}>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge/Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="h-4 w-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-300">AI-Powered Learning Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-top-6 duration-700 delay-100">
            <span className="block text-white mb-2">Master the</span>
            <span className="block bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              Future of Code
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-top-8 duration-700 delay-200">
            Transform your career with cutting-edge courses in AI, Web Development, and Data Science. 
            Learn from industry experts and build real-world projects.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-top-10 duration-700 delay-300">
            <a
              href="#courses"
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 
                       text-white font-semibold rounded-full overflow-hidden
                       shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40
                       transition-all duration-300 hover:scale-105 active:scale-95
                       flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <span className="relative z-10">Start Learning Now</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a
              href="#demo"
              className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10
                       text-white font-semibold rounded-full
                       hover:bg-white/10 hover:border-white/20
                       transition-all duration-300 hover:scale-105 active:scale-95
                       flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Play className="h-5 w-5" />
              <span>Browse Courses</span>
            </a>
          </div>

          {/* Stats/Trust Indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">800+</div>
              <div className="text-sm text-gray-400">Active Students</div>
            </div>
            <div className="text-center border-x border-gray-700">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">5+</div>
              <div className="text-sm text-gray-400">Expert Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">4+</div>
              <div className="text-sm text-gray-400">States</div>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Hero;