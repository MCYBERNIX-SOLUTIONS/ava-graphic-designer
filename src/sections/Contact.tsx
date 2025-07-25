'use client';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const floatingShapes = useRef<(HTMLDivElement | null)[]>([]);
  const controls = useAnimation();

  // Master animation timeline
  useGSAP(() => {
    // Title animation
    gsap.fromTo(titleRef.current, 
      { 
        opacity: 0,
        y: 60,
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
      },
      {
        opacity: 1,
        y: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Form animation
    gsap.fromTo(formRef.current, 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      }
    );

    // Floating shapes animation
    floatingShapes.current.forEach((shape, i) => {
      if (!shape) return;
      
      gsap.to(shape, {
        x: gsap.utils.random(-30, 30),
        y: gsap.utils.random(-20, 20),
        rotation: gsap.utils.random(-15, 15),
        duration: gsap.utils.random(8, 12),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5
      });
    });

  }, { scope: containerRef });

  // Floating shapes component
  const FloatingShapes = () => {
    const shapes = [
      { color: '#facc15', size: 120, left: '10%', top: '20%' },
      { color: '#3b82f6', size: 80, left: '85%', top: '30%' },
      { color: '#ef4444', size: 100, left: '15%', top: '80%' },
      { color: '#8b5cf6', size: 60, left: '90%', top: '70%' }
    ];

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden" id="contact">
        {shapes.map((shape, i) => (
          <div
            key={i}
            ref={el => {floatingShapes.current[i] = el}}
            className="absolute rounded-full mix-blend-overlay opacity-10"
            style={{
              backgroundColor: shape.color,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              left: shape.left,
              top: shape.top,
              filter: 'blur(40px)'
            }}
          />
        ))}
      </div>
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.6 }
    });
    setIsSubmitted(true);
    // Here you would typically send the form data to your backend
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-32 px-6 bg-black overflow-hidden"
      id="contact"
    >
      <FloatingShapes />
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute left-1/4 top-1/4 w-96 h-96 rounded-full bg-[#facc15] opacity-5 mix-blend-overlay filter blur-3xl"
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div 
        className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-[#3b82f6] opacity-5 mix-blend-overlay filter blur-3xl"
        style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
        animate={{ 
          borderRadius: [
            '30% 70% 70% 30% / 30% 30% 70% 70%',
            '50% 50% 50% 50% / 60% 60% 40% 40%',
            '70% 30% 30% 70% / 70% 70% 30% 30%',
            '30% 70% 70% 30% / 30% 30% 70% 70%'
          ],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-serif text-center mb-6 text-[#facc15] relative flex justify-center items-center"
          initial={{ opacity: 0 }}
        >
          <span className="relative z-10 py-6">Let's Work Together</span>
          <motion.span
            className="absolute -bottom-3 left-0 w-full h-1 bg-[#facc15]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
            viewport={{ once: true }}
          />
        </motion.h2>

        <motion.p
          className="text-xl text-gray-400 mb-12 font-sans text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Got a project or idea? I'd love to hear about it.
        </motion.p>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-900/30 border border-green-700 rounded-xl p-8 text-center"
            >
              <motion.div
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                ✨
              </motion.div>
              <h3 className="text-2xl font-serif text-green-300 mb-2">Message Sent!</h3>
              <p className="text-gray-300">I'll get back to you soon.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative">
                <motion.label
                  htmlFor="name"
                  className={`absolute left-4 transition-all duration-300 ${
                    activeField === 'name' || formData.name 
                      ? 'top-1 text-xs text-[#facc15]' 
                      : 'top-4 text-gray-500'
                  }`}
                >
                  Your Name
                </motion.label>
                <motion.input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setActiveField('name')}
                  onBlur={() => setActiveField(null)}
                  className="w-full bg-gray-900 text-white border border-gray-700 p-4 pt-6 rounded-lg focus:border-[#facc15] focus:outline-none"
                  whileFocus={{ 
                    boxShadow: '0 0 0 2px rgba(250, 204, 21, 0.3)'
                  }}
                />
              </div>

              <div className="relative">
                <motion.label
                  htmlFor="email"
                  className={`absolute left-4 transition-all duration-300 ${
                    activeField === 'email' || formData.email 
                      ? 'top-1 text-xs text-[#facc15]' 
                      : 'top-4 text-gray-500'
                  }`}
                >
                  Your Email
                </motion.label>
                <motion.input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                  className="w-full bg-gray-900 text-white border border-gray-700 p-4 pt-6 rounded-lg focus:border-[#facc15] focus:outline-none"
                  whileFocus={{ 
                    boxShadow: '0 0 0 2px rgba(250, 204, 21, 0.3)'
                  }}
                />
              </div>

              <div className="relative">
                <motion.label
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-300 ${
                    activeField === 'message' || formData.message 
                      ? 'top-1 text-xs text-[#facc15]' 
                      : 'top-4 text-gray-500'
                  }`}
                >
                  Your Message
                </motion.label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                  className="w-full bg-gray-900 text-white border border-gray-700 p-4 pt-6 rounded-lg h-40 focus:border-[#facc15] focus:outline-none resize-none"
                  whileFocus={{ 
                    boxShadow: '0 0 0 2px rgba(250, 204, 21, 0.3)'
                  }}
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-[#facc15] text-black font-semibold py-4 rounded-lg relative overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 20px rgba(250, 204, 21, 0.5)'
                }}
                whileTap={{ scale: 0.98 }}
                animate={controls}
              >
                <span className="relative z-10">Send Message</span>
                <motion.span
                  className="absolute inset-0 bg-white opacity-0"
                  whileHover={{ opacity: 0.2 }}
                />
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Decorative animated elements */}
        <motion.div 
          className="absolute -left-20 top-1/2 w-40 h-40 rounded-full border-2 border-[#facc15] opacity-10 pointer-events-none"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="absolute -right-20 bottom-1/3 w-32 h-32 border-2 border-[#3b82f6] opacity-10 pointer-events-none"
          animate={{ 
            borderRadius: ['20%', '50%', '20%'],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </section>
  );
}