import React, { useState, useEffect } from 'react';
import { MapPin, Users, GraduationCap, BookOpen, TrendingUp, Award, Target, Sparkles } from 'lucide-react';
// Import your map images
import image1 from '../assets/AP.png';
import image2 from '../assets/KN.png';
import image3 from '../assets/TG1.png';
import image4 from '../assets/TM.png';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    students: 0,
    institutes: 0,
    states: 0
  });

  // Animate counters on mount
  useEffect(() => {
    setIsVisible(true);
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = {
      students: 800 / steps,
      institutes: 25 / steps,
      states: 4 / steps
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCounters({
        students: Math.min(Math.floor(increment.students * currentStep), 800),
        institutes: Math.min(Math.floor(increment.institutes * currentStep), 25),
        states: Math.min(Math.floor(increment.states * currentStep), 4)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: `${counters.students}+`,
      label: 'Students Enrolled',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      value: `${counters.institutes}+`,
      label: 'Partner Institutes',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      value: `${counters.states}`,
      label: 'States Covered',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: '100%',
      label: 'Success Rate',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const states = [
    { name: 'Andhra Pradesh', color: 'bg-orange-500' },
    { name: 'Telangana', color: 'bg-orange-600' },
    { name: 'Karnataka', color: 'bg-orange-700' },
    { name: 'Tamil Nadu', color: 'bg-orange-800' }
  ];

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Python-Focused Curriculum',
      description: 'Comprehensive learning path designed for real-world applications'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Project-Based Learning',
      description: 'Hands-on projects that build your portfolio and skills'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Career Support',
      description: 'Guidance and mentorship to launch your tech career'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI-Powered Assistant',
      description: '24/7 support with our intelligent KiwiBot assistant'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

          <div className={`relative text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-300">Leading EdTech Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              About CodeKiwi
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Empowering the next generation of developers with 
              <span className="text-orange-500 font-semibold"> Python excellence</span> across South India
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`relative group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our Mission
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              To democratize quality programming education and create a thriving community 
              of Python developers across South India
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-black border-2 border-gray-800 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-xl text-orange-400 group-hover:bg-orange-500/30 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Reach Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our Geographic Reach
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Serving students across 4 major states in South India
            </p>
            
            {/* States Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {states.map((state, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-gray-900 border border-orange-500/30 rounded-full px-6 py-3 hover:border-orange-500 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-3 h-3 ${state.color} rounded-full animate-pulse`}></div>
                  <span className="text-white font-medium">{state.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Display with Animated Icon */}
          <div className="relative max-w-5xl mx-auto">
            {/* Animated Map Pin Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="animate-bounce">
                <div className="relative">
                  <MapPin className="w-16 h-16 text-orange-500 drop-shadow-2xl filter" fill="currentColor" />
                  <div className="absolute inset-0 w-16 h-16 bg-orange-500/30 rounded-full blur-xl animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Map Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[image1, image2, image3, image4].map((image, index) => (
                <div 
                  key={index}
                  className="relative group overflow-hidden rounded-2xl border-2 border-gray-800 hover:border-orange-500/50 transition-all duration-300"
                >
                  <img 
                    src={image} 
                    alt={`Map of region ${index + 1}`}
                    className="w-full h-64 object-contain transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback if images don't exist
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23111" width="400" height="300"/%3E%3Ctext fill="%23ea580c" font-size="20" font-family="Arial" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EMap Image ' + (index + 1) + '%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-600/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Video Section Placeholder */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              See CodeKiwi in Action
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Watch how we're transforming education across South India
            </p>
          </div>

          {/* Video Placeholder - You'll add the video later */}
          <div className="relative rounded-2xl overflow-hidden border-4 border-orange-500/30 aspect-video bg-gradient-to-br from-gray-900 to-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex p-6 bg-orange-500/20 rounded-full mb-4">
                  <svg className="w-16 h-16 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-gray-400 text-lg">Video Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Join Our Growing Community
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Be part of South India's largest Python learning platform
          </p>
          <button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-500 hover:to-orange-400 transition-all duration-300 hover:scale-105 shadow-xl shadow-orange-500/30">
            Start Learning Today
          </button>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;