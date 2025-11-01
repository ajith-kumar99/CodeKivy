import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Clock, IndianRupee, FileText, CheckCircle } from 'lucide-react';

const Courses = () => {
  const [visibleCourses, setVisibleCourses] = useState([]);
  const courseRefs = useRef([]);

  const courses = [
    {
      id: 1,
      title: 'Python Basics',
      duration: '20 Days',
      price: 499,
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80',
      color: 'from-blue-500 to-cyan-500',
      level: 'Beginner',
      about: 'Master the fundamentals of Python programming. Learn variables, data types, loops, functions, and object-oriented programming. Perfect for complete beginners starting their coding journey.',
      pdfUrl: '/pdfs/python-basics.pdf'
    },
    {
      id: 2,
      title: 'Advanced Python',
      duration: '40 Days',
      price: 999,
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
      color: 'from-purple-500 to-pink-500',
      level: 'Intermediate',
      about: 'Take your Python skills to the next level. Dive deep into advanced concepts, data structures, algorithms, web frameworks, and API development. Build real-world applications.',
      pdfUrl: '/pdfs/advanced-python.pdf'
    },
    {
      id: 3,
      title: 'Machine Learning Intern',
      duration: '60 Days',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
      color: 'from-orange-500 to-red-500',
      level: 'Advanced',
      about: 'Become a Machine Learning expert. Learn algorithms, neural networks, deep learning, and AI applications. Work on real industry projects and build your ML portfolio.',
      pdfUrl: '/pdfs/machine-learning.pdf'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = courseRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleCourses.includes(index)) {
              setTimeout(() => {
                setVisibleCourses((prev) => [...prev, index]);
              }, index * 150);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    courseRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleCourses]);

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Our Courses
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Choose your path to Python mastery
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-32">
          {courses.map((course, index) => (
            <div
              key={course.id}
              ref={(el) => (courseRefs.current[index] = el)}
              // --- CHANGED --- Removed 'group' from this parent div
              className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center`}
            >
              {/* Image Side */}
              <div 
                // --- CHANGED --- Added 'relative' and 'group' here
                className={`relative group w-full md:w-5/12 transition-all duration-700 ${
                  visibleCourses.includes(index) 
                    ? 'opacity-100 translate-x-0' 
                    : index % 2 === 0 
                      ? 'opacity-0 -translate-x-20' 
                      : 'opacity-0 translate-x-20'
                }`}
              >
                {/* This nested 'group' is for the image scale effect, which is fine! */}
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`}></div>
                  <div className="relative rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`}></div>
                    <div className={`absolute top-3 left-3 px-3 py-1 bg-gradient-to-r ${course.color} rounded-full text-white font-semibold text-xs`}>
                      {course.level}
                    </div>
                  </div>
                </div>

                {/* --- CHANGED --- Hover Popup is NOW INSIDE the Image Side div */}
                <div 
                  className={`absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} top-1/2 transform -translate-y-1/2 
                  ${index % 2 === 0 ? 'translate-x-[105%]' : '-translate-x-[105%]'} 
                  w-80 z-10 
                  opacity-0 pointer-events-none 
                  group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto
                  transition-all duration-500 ease-in-out`} // <-- CHANGED duration-300 to duration-500
                >
                  <div className="bg-gray-900 border-2 border-orange-500/50 rounded-xl p-5 shadow-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${course.color}`}>
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-white">About Course</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {course.about}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
                      <span className="text-xs text-gray-500">Hover on image to view</span>
                      <CheckCircle className="w-4 h-4 text-orange-500" />
                    </div>
                  </div>
                  {/* Arrow indicator */}
                  <div className={`absolute top-1/2 ${index % 2 === 0 ? '-left-2' : '-right-2'} transform -translate-y-1/2 w-4 h-4 bg-orange-500/50 rotate-45`}></div>
                </div>
              </div>

              {/* Content Side */}
              <div 
                className={`w-full md:w-6/12 transition-all duration-700 ${
                  visibleCourses.includes(index) 
                    ? 'opacity-100 translate-x-0' 
                    : index % 2 === 0 
                      ? 'opacity-0 translate-x-20' 
                      : 'opacity-0 -translate-x-20'
                }`}
                style={{ transitionDelay: '150ms' }}
              >
                <div className="space-y-4">
                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {course.title}
                  </h2>

                  {/* Info */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="font-medium text-sm">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <IndianRupee className="w-4 h-4 text-orange-500" />
                      <span className="font-bold text-xl text-white">{course.price}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button 
                      className={`flex items-center gap-2 bg-gradient-to-r ${course.color} text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:scale-105 transition-transform shadow-lg`}
                    >
                      <span>Register Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={() => window.open(course.pdfUrl, '_blank')}
                      className="flex items-center gap-2 bg-gray-900 border-2 border-gray-800 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:border-orange-500 transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Show PDF</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* --- CHANGED --- The Hover Popup was MOVED from here */}
              
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Start Your Journey Today
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join 800+ students learning Python with CodeKiwi
          </p>
          <button className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-xl shadow-orange-500/30">
            Explore All Courses
          </button>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Courses;