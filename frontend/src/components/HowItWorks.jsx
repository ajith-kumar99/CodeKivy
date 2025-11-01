import React from 'react';
import { Search, PlayCircle, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion'; // Import framer-motion

const steps = [
  {
    name: '1. Find Your Course',
    description: 'Browse our catalog of expert-led courses on every topic.',
    icon: Search,
  },
  {
    name: '2. Learn By Doing',
    description: 'Watch lessons, complete projects, and get instant feedback.',
    icon: PlayCircle,
  },
  {
    name: '3. Get Certified',
    description: 'Receive your certificate and showcase your new skills.',
    icon: GraduationCap,
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


const HowItWorks = () => {
  return (
    <motion.div 
      className="relative z-10 py-24 sm:py-32"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible" // Animate when it enters the viewport
      viewport={{ once: true, amount: 0.1 }} // Trigger once, when 10% is visible
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-2xl lg:text-center"
          variants={headerVariants} // Animate header as one block
        >
          <h2 className="text-base font-semibold leading-7 text-orange-500">
            A Clear Path
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How It Works
          </p>
        </motion.div>
        
        <motion.div 
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:mt-20 lg:mt-24 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          variants={gridVariants} // Stagger children of this grid
        >
          {steps.map((step) => (
            <motion.div
              key={step.name}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-gray-950 border border-gray-800
                         transition-all duration-300 
                         hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/10
                         transform hover:-translate-y-1"
              variants={cardVariants} // Animate each card
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 ring-1 ring-orange-500/30">
                <step.icon
                  className="h-6 w-6 text-orange-500"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-white">
                {step.name}
              </h3>
              <p className="mt-2 text-base text-gray-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HowItWorks;
