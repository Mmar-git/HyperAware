import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navicons = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <div className="flex flex-col space-y-4 relative">
      {/* Main Navigation Links */}
      <div className="flex space-x-4 gap-3">
        <button
          onClick={toggleServicesDropdown}
          className="text-[#FFFFFF] hover:text-neon transform transition-transform duration-500 hover:-translate-y-1 focus:outline-none buttonglow"
        >
          Services
        </button>
        <a
          href="/about"
          className="text-[#FFFFFF] hover:text-neon transform transition-transform duration-500 hover:-translate-y-1"
        >
          About Us
        </a>
        <a
          href="/contact"
          className="text-[#FFFFFF] hover:text-neon transform transition-transform duration-500 hover:-translate-y-1"
        >
          Contact
        </a>
      </div>

      {/* Dropdown Menu for Services */}
      <AnimatePresence>
        {isServicesOpen && (
          <motion.div
            className="flex flex-col space-y-3 p-6 glass absolute z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 25 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.75,
              type: "tween",
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <a href="/Website" className="text-[#FFFFFF] hover:text-neon">
              Website Development and redesign
            </a>
            <a href="/Branding" className="text-[#FFFFFF] hover:text-neon">
              Branding
            </a>
            <a href="/Social" className="text-[#FFFFFF] hover:text-neon">
              Social Media Marketing and Management
            </a>
            <a href="/Content" className="text-[#FFFFFF] hover:text-neon">
              Content Creation
            </a>
            <a href="/Photo" className="text-[#FFFFFF] hover:text-neon">
              Photography and Videography
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navicons;
