import React from 'react';
import { Clock, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

// Import the OR image
import orImage from '../assets/or.png';

// Course images - Using high-quality placeholder images
const courseImages = {
  pythonBasics: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=80',
  advancedPython: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80',
  machineLearning: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=80'
};

// Updated courses data
const courses = [
  {
    title: 'Python Basics',
    level: 'Beginner',
    duration: '20 Days',
    href: '#',
    image: courseImages.pythonBasics,
    description: 'Start your coding journey with Python. Learn fundamental concepts, syntax, and build your first programs with hands-on projects.',
  },
  {
    title: 'Advanced Python',
    level: 'Intermediate',
    duration: '40 Days',
    href: '#',
    image: courseImages.advancedPython,
    description: 'Master advanced Python concepts including OOP, decorators, generators, and asynchronous programming for professional development.',
  },
  {
    title: 'Machine Learning Intern',
    level: 'Advanced',
    duration: '60 Days',
    href: '#',
    image: courseImages.machineLearning,
    description: 'Dive deep into ML algorithms, neural networks, and real-world projects. Build predictive models and deploy AI solutions.',
  },
];

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const FeaturedCourses = () => {
  return (
    <motion.div
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-black"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* OR IMAGE - Positioned at the top with proper z-index */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] z-10 pointer-events-none">
        <img
          src={orImage}
          alt="Or separator"
          className="w-full h-auto"
        />
      </div>

      {/* Content Container - Higher z-index to be above OR image */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">

        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center lg:text-center pt-16 sm:pt-20 md:pt-24"
          variants={headerVariants}
        >
          <h2 className="text-sm sm:text-base font-semibold leading-7 text-orange-500">
            Start Your Journey
          </h2>
          <p className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Our Most Popular Courses
          </p>
          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
            Choose from our carefully curated courses designed to take you from beginner to expert
          </p>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          className="mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={gridVariants}
        >
          {courses.map((course) => (
            <motion.article
              key={course.title}
              className="group flex flex-col justify-between rounded-2xl bg-gray-950 p-px ring-1 ring-gray-800
              transition-all duration-300 relative overflow-hidden
              transform hover:-translate-y-2 hover:ring-orange-500/50
              hover:before:opacity-100 before:opacity-0 before:absolute before:inset-0 
              before:rounded-2xl before:bg-orange-500 before:z-0 before:blur-xl 
              before:transition-opacity before:duration-500"
              variants={cardVariants}
            >
              {/* Inner container */}
              <div className="flex flex-col justify-between h-full relative z-10 bg-gray-950 rounded-[calc(0.75rem-1px)] overflow-hidden">
                
                {/* Course Image */}
                <div className="relative w-full overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden bg-gray-900">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60"></div>
                  </div>
                  
                  {/* Level Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <span className="inline-flex items-center gap-x-1.5 rounded-full bg-orange-500/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white shadow-lg">
                      <BarChart3 className="h-3.5 w-3.5" />
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 sm:p-6">
                  {/* Duration */}
                  <div className="flex items-center gap-x-2 text-xs mb-4">
                    <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-400">
                      <Clock className="h-3.5 w-3.5 text-orange-500" />
                      {course.duration}
                    </span>
                  </div>

                  {/* Course Title & Description */}
                  <div className="relative">
                    <h3 className="text-lg sm:text-xl font-semibold leading-6 text-white group-hover:text-orange-500 transition-colors duration-200 mb-3">
                      <a href={course.href}>
                        <span className="absolute inset-0" />
                        {course.title}
                      </a>
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-400 line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  {/* Button */}
                  <div className="mt-6 w-full">
                    <a
                      href={course.href}
                      className="block w-full text-center rounded-lg bg-orange-500/10 px-4 py-2.5 sm:py-3 text-sm font-semibold text-orange-500
                      shadow-sm shadow-orange-500/5 border border-orange-500/20
                      transition-all duration-300 ease-in-out
                      hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/30 hover:border-orange-500
                      active:scale-95"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Courses Button */}
        <motion.div 
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a
            href="#all-courses"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full
                     bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold
                     shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40
                     transition-all duration-300 hover:scale-105 active:scale-95
                     text-sm sm:text-base"
          >
            View All Courses
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeaturedCourses;