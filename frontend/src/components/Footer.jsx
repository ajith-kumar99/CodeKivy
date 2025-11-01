import React from 'react';
import { CodeSquare, Github, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion'; // Import framer-motion
import Logo from '../assets/Logo.png'

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger children
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const Footer = () => {
  return (
    <motion.footer 
      className="relative z-10 bg-black border-t border-gray-800"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible" // Animate when it enters the viewport
      viewport={{ once: true, amount: 0.1 }} // Trigger once, when 10% is visible
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="md:flex md:justify-between md:gap-8">
          {/* Column 1: Logo, Description, Socials */}
          <motion.div className="max-w-sm space-y-6" variants={itemVariants}>
            <a href="#" className="flex items-center gap-2">
              <img src={Logo} alt="KivyLogo" className='w-12 h-12' />
              <span className="text-2xl font-bold text-white">CodeKivy</span>
            </a>
            <p className="text-base leading-6 text-gray-400">
              Master in-demand coding skills with expert-led courses. Go from
              beginner to job-ready, one lesson at a time.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-500 transition-colors duration-200 hover:text-orange-500"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 transition-colors duration-200 hover:text-orange-500"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 transition-colors duration-200 hover:text-orange-500"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Column 2 & 3: Links */}
          <motion.div 
            className="mt-12 grid grid-cols-2 gap-8 md:mt-0"
            variants={itemVariants}
          >
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">
                Platform
              </h3>
              <ul role="list" className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">
                Company
              </h3>
              <ul role="list" className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    About Us
                  </a>
                </li>
<li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Bottom Copyright Bar */}
        <motion.div 
          className="mt-16 border-t border-gray-800 pt-8"
          variants={itemVariants} // Re-using itemVariants for a simple fade-up
        >
          <p className="text-center text-sm leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} CodeKivy, Inc. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
