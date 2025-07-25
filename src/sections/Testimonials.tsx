'use client';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const feedbacks = [
  { 
    name: 'Emily Carter', 
    role: 'CEO, Bloom Cosmetics',
    quote: 'Ava transformed our brand identity with her visionary approach. The designs she created gave our company a whole new personality that resonated perfectly with our audience. Phenomenal work from start to finish!',
    avatar: '👩‍💼',
    color: '#f59e0b'
  },
  { 
    name: 'Raj Mehta', 
    role: 'Marketing Director, Solis Energy',
    quote: 'Working with Ava was a revelation. She\'s a creative genius who delivered beyond our expectations. Punctual, professional, and packed with fresh ideas that elevated our marketing materials.',
    avatar: '👨‍💼',
    color: '#3b82f6'
  },
  { 
    name: 'Sophia Williams', 
    role: 'Founder, Jazz Festival',
    quote: 'The poster series Ava created for our festival became collector\'s items! Her ability to capture the essence of music in visual form is unparalleled. We\'ve never received so many compliments on our branding.',
    avatar: '👩‍🎤',
    color: '#8b5cf6'
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const feedbackCards = useRef<(HTMLDivElement | null)[]>([]);
  const floatingShapes = useRef<(HTMLDivElement | null)[]>([]);
  const controls = useAnimation();

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % feedbacks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Master animation timeline
  useGSAP(() => {
    // Ensure title is visible initially
    gsap.set(titleRef.current, { opacity: 1 });
    
    // Title animation
    gsap.fromTo(titleRef.current, 
      { 
        y: 60,
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
      },
      {
        y: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true
        }
      }
    );

    // Floating shapes animation with cleanup
    const shapesAnimation = floatingShapes.current.map((shape, i) => {
      if (!shape) return null;
      
      return gsap.to(shape, {
        x: gsap.utils.random(-30, 30),
        y: gsap.utils.random(-20, 20),
        rotation: gsap.utils.random(-15, 15),
        duration: gsap.utils.random(8, 12),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5
      });
    }).filter(Boolean);

    // Cleanup function
    return () => {
      shapesAnimation.forEach(anim => anim?.kill());
      gsap.killTweensOf(floatingShapes.current);
    };
  }, { scope: containerRef, revertOnUpdate: true });

  // Floating shapes component
  const FloatingShapes = () => {
    const shapes = [
      { color: '#facc15', size: 120, left: '10%', top: '20%' },
      { color: '#3b82f6', size: 80, left: '85%', top: '30%' },
      { color: '#ef4444', size: 100, left: '15%', top: '80%' },
      { color: '#8b5cf6', size: 60, left: '90%', top: '70%' }
    ];

    return (
      <div className="absolute inset-0 bg-black pointer-events-none overflow-hidden" id="testimonials">
        {shapes.map((shape, i) => (
          <div
            key={i}
            ref={el => { floatingShapes.current[i] = el; }}
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

  return (
    <section 
      ref={containerRef}
      className="relative py-32 px-6 bg-[#111] overflow-hidden"
      id="testimonials"
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

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-serif text-center mb-16 text-[#facc15] relative inline-block"
          initial={{ opacity: 1 }}  // Ensure title is always visible
        >
          <span className="relative z-10">Client Love</span>
          <motion.span
            className="absolute -bottom-3 left-0 w-full h-1 bg-[#facc15]"
            initial={{ scaleX: 0 }}
            whileInView={{ 
              scaleX: 1,
              transition: { 
                duration: 1.5, 
                delay: 0.8, 
                ease: [0.33, 1, 0.68, 1] 
              }
            }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          />
        </motion.h2>

        <div className="relative h-96 md:h-80 w-full">
          <AnimatePresence mode="wait">
            {feedbacks.map((feedback, idx) => (
              activeIndex === idx && (
                <motion.div
                  key={idx}
                  ref={el => { feedbackCards.current[idx] = el; }}
                  className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-gray-800 flex flex-col md:flex-row items-center gap-8"
                  initial={{ 
                    opacity: 0,
                    x: idx % 2 === 0 ? 100 : -100,
                    rotate: idx % 2 === 0 ? 5 : -5
                  }}
                  animate={{ 
                    opacity: 1,
                    x: 0,
                    rotate: 0,
                    borderColor: feedback.color,
                    boxShadow: `0 0 30px ${feedback.color}40`
                  }}
                  exit={{ 
                    opacity: 0,
                    x: idx % 2 === 0 ? -100 : 100,
                    rotate: idx % 2 === 0 ? -5 : 5
                  }}
                  transition={{ 
                    duration: 0.8,
                    ease: "backOut"
                  }}
                >
                  <motion.div 
                    className="text-8xl w-32 h-32 flex items-center justify-center rounded-full bg-gray-800 border-4"
                    style={{ borderColor: feedback.color }}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 0.3,
                      type: 'spring',
                      stiffness: 400,
                      damping: 15
                    }}
                  >
                    {feedback.avatar}
                  </motion.div>
                  
                  <div className="text-left flex-1">
                    <motion.blockquote 
                      className="text-xl md:text-2xl font-serif italic text-white mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      &quot;{feedback.quote}&quot;
                    </motion.blockquote>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <p className="text-xl font-semibold" style={{ color: feedback.color }}>
                        {feedback.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {feedback.role}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-10">
          {feedbacks.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className="w-3 h-3 rounded-full bg-gray-700 relative overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: feedbacks[idx].color }}
                animate={{ 
                  scale: activeIndex === idx ? 1 : 0.3,
                  opacity: activeIndex === idx ? 1 : 0.5
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>

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