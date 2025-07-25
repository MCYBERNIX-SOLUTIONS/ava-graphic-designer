'use client';
import { motion } from 'framer-motion';
import { FaBehance, FaDribbble, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: <FaBehance />, url: "#", color: "hover:text-[#1769ff]" },
    { icon: <FaDribbble />, url: "#", color: "hover:text-[#ea4c89]" },
    { icon: <FaInstagram />, url: "#", color: "hover:text-[#e1306c]" },
    { icon: <FaLinkedin />, url: "#", color: "hover:text-[#0077b5]" },
    { icon: <FiMail />, url: "mailto:hello@avadesigns.com", color: "hover:text-[#ff4d4d]" },
  ];

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          {/* Branding Section */}
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <motion.h3 
              className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-2"
              whileHover={{ scale: 1.02 }}
            >
              Ava Designs
            </motion.h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Creating visual stories that inspire and engage audiences worldwide.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  className={`text-gray-400 text-xl transition-colors ${link.color}`}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            
            <motion.a
              href="#contact"
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-red-500 text-black font-medium rounded-full text-sm uppercase tracking-wider"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Work Together
            </motion.a>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="border-t border-gray-800 my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm"
        >
          <p className="mb-4 md:mb-0">
            &copy; {currentYear} Ava Designs. All rights reserved.
          </p>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
          
          <p className="mt-4 md:mt-0 flex items-center">
            Crafted with <span className="text-[#ff4d4d] mx-1">&hearts;</span> using 
            <span className="ml-1 text-white">Next.js</span> & 
            <span className="text-[#38bdf8] ml-1">Tailwind CSS</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}