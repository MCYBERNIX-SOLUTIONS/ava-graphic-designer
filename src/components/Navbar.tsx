'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaBehance, FaDribbble, FaInstagram } from 'react-icons/fa';

const navLinks = [
  { name: 'about', color: '#4ade80' },
  { name: 'portfolio', color: '#60a5fa' },
  { name: 'services', color: '#f472b6' },
  { name: 'testimonials', color: '#fbbf24' },
  { name: 'contact', color: '#a78bfa' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -70 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-white">
          <Link href="#" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold font-serif bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent"
            >
              Ava Designs
            </motion.div>
            <motion.span 
              className="ml-2 text-xs bg-yellow-500 text-black px-2 py-1 rounded-full hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Available for work
            </motion.span>
          </Link>

          <ul className="hidden md:flex space-x-8 font-sans text-sm uppercase tracking-wider relative">
            {navLinks.map((link, i) => (
              <li key={i} className="relative">
                <a 
                  href={`#${link.name}`} 
                  className="hover:text-white transition duration-300 relative"
                  onMouseEnter={() => setHoveredLink(i)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.name}
                  {hoveredLink === i && (
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5"
                      style={{ backgroundColor: link.color }}
                      layoutId="underline"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-pink-500 transition">
              <FaBehance size={18} />
            </a>
            <a href="#" className="text-gray-300 hover:text-red-500 transition">
              <FaDribbble size={18} />
            </a>
            <a href="#" className="text-gray-300 hover:text-purple-500 transition">
              <FaInstagram size={18} />
            </a>
          </div>

          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 w-full bg-black/95 backdrop-blur-md z-40 md:hidden shadow-xl"
          >
            <ul className="flex flex-col space-y-2 px-6 py-4">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a 
                    href={`#${link.name}`} 
                    className="block py-3 text-white uppercase text-sm tracking-wider border-b border-gray-800 hover:pl-4 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ color: hoveredLink === i ? link.color : 'inherit' }}
                    onMouseEnter={() => setHoveredLink(i)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex justify-center space-x-6 pb-6">
              <a href="#" className="text-gray-400 hover:text-pink-500 transition">
                <FaBehance size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition">
                <FaDribbble size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition">
                <FaInstagram size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}