import React from 'react';
// Import icons for this component
import { BookOpenCheck, Users, Award, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion'; // Import framer-motion

// 1. IMPORT THE ORANGE GLOW IMAGE
import OrangeGlowImage from '../assets/OrangeGlow.png';

// Key features of the platform - UPDATED FOR AI AUTOMATION
const features = [
  {
    name: 'Adaptive Curriculum Mapping',
    description:
      'The learning path dynamically restructures content in real-time to focus on your specific knowledge gaps.',
    icon: Award, // Keeping Award for high-quality pathing
  },
  {
    name: 'Simulated Project Environments',
    description:
      'Practice skills within automated sandboxes that provide instant, line-by-line code correction and optimization feedback.',
    icon: BookOpenCheck, // Keeping BookOpenCheck for practice/checks
  },
  {
    name: 'Autonomous Skill Refinement',
    description:
      'The system continuously analyzes your performance to generate personalized, targeted practice modules until mastery is confirmed.',
    icon: ShieldCheck, // Using ShieldCheck for reliable skill building
  },
  {
    name: 'Synthetic Career Alignment',
    description:
      'Automatically translates acquired skills into verifiable data points for resume generation and job role matching, optimized by AI.',
    icon: Users, // Using Users to represent career success/outcomes
  },
];

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger children (header and grid)
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
      staggerChildren: 0.15, // Stagger each card
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


const Features = () => {
  return (
    // CRITICAL FIX: Increased top padding (pt-64 sm:pt-72) to make room for the background image
    <motion.div 
      className="relative z-10 **pt-64 sm:pt-72 pb-24 sm:pb-32** overflow-hidden" // 'relative' is crucial for positioning the image
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible" // Animate when it enters the viewport
      viewport={{ once: true, amount: 0.1 }} // Trigger once, when 10% is visible
    >
      
      {/* 2. IMAGE PLACEMENT: Orange Glow at the top, low Z-index */}
      <img
        src={OrangeGlowImage}
        alt="AI Glow Effect Background"
        // Position at the top, centered, and in the background (z-0)
        // Adjust max-w and h-auto if the image itself is too tall or wide
        className="absolute top-0 left-1/2 z-0 max-w-full h-auto opacity-70 -translate-x-1/2 pointer-events-none" 
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-3xl lg:text-center relative z-10" // Ensure header is above the image
          variants={headerVariants} // Animate header as one block
        >
          <h2 className="text-base font-semibold leading-7 text-orange-500">
            Why CodeKivy?
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to master your craft
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our platform utilizes deep algorithmic analysis to create a completely 
            optimized, self-adjusting learning ecosystem for every student.
          </p>
        </motion.div>
        
        <motion.div 
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none relative z-10" // Ensure grid is above the image
          variants={gridVariants} // Stagger children of this grid
        >
          <dl className="grid max-w-xl grid-cols-1 gap-8 md:max-w-none md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                className="flex flex-col p-6 bg-gray-950 rounded-2xl border border-gray-800 
                            transition-all duration-300 relative z-20 // Ensure card is fully above the image
                            hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/10
                            transform hover:-translate-y-1"
                variants={cardVariants} // Animate each card
              >
                {/* Premium icon container */}
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900">
                    <feature.icon
                      className="h-6 w-6 text-orange-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <dt className="mt-6 text-lg font-semibold leading-7 text-white">
                  {feature.name}
                </dt>
                <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-gray-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Features;