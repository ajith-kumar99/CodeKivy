import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { CodeSquare, Menu, X } from 'lucide-react';
import Logo from '../assets/Logo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get current location

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  // Check if a link is active
  const isActive = (href) => location.pathname === href;

  const glowColor = "text-amber-400";
  const baseGlowShadow = 'inset 0 0 12px rgba(249, 115, 22, 0.58)'; 
  const hoverGlowShadow = 'inset 0 0 14px rgba(251, 146, 60, 0.7)'; 
  const textGlowStyle = {
    textShadow: '0 0 5px rgba(255, 255, 255, 0.2)' 
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;800&display=swap');
          .font-poppins-forced * {
            font-family: 'Poppins', sans-serif !important;
          }
          .border-gradient-fade {
            border-style: solid;
            border-width: 0 0 1px 0;
            border-image-slice: 1;
            border-image-source: linear-gradient(
              to right, 
              transparent 0%, 
              rgba(251, 146, 60, 0.15) 30%,
              rgba(251, 146, 60, 0.4) 50%,
              rgba(251, 146, 60, 0.15) 70%, 
              transparent 100%
            );
          }
          
          /* Animated underline for active nav links */
          .nav-link-wrapper {
            position: relative;
            display: inline-block;
          }
          
          .nav-link-underline {
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #f97316, #fb923c, #f97316);
            transition: width 0.3s ease-in-out;
            box-shadow: 0 0 8px rgba(249, 115, 22, 0.6);
          }
          
          .nav-link-wrapper.active .nav-link-underline {
            width: 100%;
            animation: glow-pulse 2s ease-in-out infinite;
          }
          
          @keyframes glow-pulse {
            0%, 100% {
              box-shadow: 0 0 8px rgba(249, 115, 22, 0.6);
            }
            50% {
              box-shadow: 0 0 12px rgba(251, 146, 60, 0.8);
            }
          }
        `}
      </style>
      
      <header
        className="sticky top-0 z-50 w-full font-poppins-forced
                   bg-black/35 backdrop-blur-md 
                   border-gradient-fade"
      >
        <nav className="flex w-full max-w-7xl mx-auto items-center justify-between px-8 py-6 lg:px-10">
          
          <Link
            to="/"
            className="flex items-center gap-3 flex-shrink-0 -m-1.5 p-1.5"
          >
            <img src={Logo} alt="Logo" className={`h-12 w-12 ${glowColor}`}/>
            <span className="text-2xl font-light text-white">CodeKivy</span>
          </Link>

          <div className="flex lg:hidden">
            <button
              type="button"
              className={`-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-gray-50 hover:${glowColor} transition-colors duration-200`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop Navigation Links with Animated Underline */}
          <div className="hidden lg:flex">
            <div className="flex items-center gap-x-8 border border-white/20 rounded-full px-6 py-1.5 bg-black/20">
              {navLinks.map((link) => (
                <div 
                  key={link.name} 
                  className={`nav-link-wrapper ${isActive(link.href) ? 'active' : ''}`}
                >
                  <Link
                    to={link.href}
                    className={`text-base font-medium leading-6 ${
                      isActive(link.href) ? glowColor : 'text-gray-50'
                    } hover:${glowColor} transition-colors duration-200`}
                    style={textGlowStyle}
                  >
                    {link.name}
                  </Link>
                  <div className="nav-link-underline"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-x-6">
            <Link
              to="/login"
              className={`text-base font-medium leading-6 text-gray-50 hover:${glowColor} transition-colors duration-200`}
              style={textGlowStyle}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-lg bg-transparent border border-orange-400 px-10 py-1 text-sm font-light text-white 
                         transition-all duration-300 ease-in-out 
                         hover:bg-orange-900/10 hover:border-orange-300 hover:text-white
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              style={{ 
                boxShadow: baseGlowShadow,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = hoverGlowShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = baseGlowShadow;
              }}
            >
              Start now
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-amber-500/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-3">
                <CodeSquare className={`h-8 w-8 ${glowColor}`} />
                <span className="text-2xl font-extrabold text-white">CodeKivy</span>
              </Link>
              <button
                type="button"
                className={`-m-2.5 rounded-lg p-2.5 text-gray-50 hover:${glowColor} transition-colors duration-200`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-7 w-7" aria-hidden="true" />
              </button>
            </div>
            
            {/* Mobile Nav Links with Active Indicator */}
            <div className="mt-8 flow-root">
              <div className="-my-6 divide-y divide-amber-900/25">
                <div className="space-y-2 py-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className={`-mx-3 block rounded-lg px-3 py-2 text-lg font-medium leading-7 
                                  ${isActive(link.href) ? `${glowColor} bg-orange-900/20` : 'text-gray-50'}
                                  hover:bg-stone-800 hover:${glowColor} transition-colors duration-200
                                  ${isActive(link.href) ? 'border-l-4 border-orange-500' : ''}`}
                      style={textGlowStyle}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                
                <div className="py-6 space-y-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`-mx-3 block rounded-lg px-3 py-2.5 text-lg font-medium leading-7 text-gray-50 hover:bg-stone-800 hover:${glowColor} transition-colors duration-200`}
                    style={textGlowStyle}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-lg bg-transparent border border-orange-400 px-5 py-1 text-center text-lg font-light text-white hover:bg-orange-900/20 hover:border-orange-300 hover:text-white transition-colors duration-200"
                    style={{ 
                      boxShadow: baseGlowShadow,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = hoverGlowShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = baseGlowShadow;
                    }}
                  >
                    Start now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;