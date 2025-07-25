'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Brand Strategy',
    description: 'Comprehensive brand development from positioning to visual identity',
    icon: '★',
    color: '#F59E0B'
  },
  {
    title: 'Digital Design',
    description: 'Pixel-perfect interfaces for web and mobile applications',
    icon: '🖥️',
    color: '#3B82F6'
  },
  {
    title: 'Motion Graphics',
    description: 'Captivating animations that bring your brand to life',
    icon: '🎬',
    color: '#EC4899'
  },
  {
    title: 'Packaging',
    description: 'Shelf-stopping designs that communicate brand values',
    icon: '📦',
    color: '#10B981'
  },
  {
    title: 'Art Direction',
    description: 'Cohesive visual storytelling across all mediums',
    icon: '👁️',
    color: '#8B5CF6'
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLLIElement | null)[]>([]);

  useGSAP(() => {
    // Title animation - Ensure it's always visible
    gsap.set(titleRef.current, { opacity: 1, y: 0 });
    
    // Card animations
    gsap.from(cardsRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });

    // Background animation - Removed as it was causing issues
    // gsap.to("div", {
    //   backgroundPosition: "100% 50%",
    //   duration: 30,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: "linear"
    // });
  }, { scope: containerRef });

  const setCardRef = (el: HTMLLIElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-28 px-6 overflow-hidden bg-black"
      id="services"
    >
      {/* Animated gradient background */}
      <div className="z-0 pointer-events-none"/>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-medium text-left mb-20 text-[#facc15]"
          initial={{ opacity: 1, y: 0 }}
        >
          Premium Services
          <motion.span 
            className="block w-32 h-1 ml-6 mt-6 opacity-80"
            style={{
              background: 'linear-gradient(90deg, transparent, #F59E0B, #EC4899, #8B5CF6, transparent)'
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ 
              scaleX: 1,
              transition: { 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1] 
              }
            }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          />
        </motion.h2>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.li
              key={index}
              ref={el => setCardRef(el, index)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-900/80 to-gray-900/20 backdrop-blur-sm border border-gray-800 hover:border-opacity-50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1,
                y: 0,
                transition: { 
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                } 
              }}
              viewport={{ once: true, margin: "-50px 0px" }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.4 }
              }}
            >
              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ 
                  background: `radial-gradient(circle at center, ${service.color}, transparent 70%)`,
                  mixBlendMode: 'screen'
                }}
              />

              <div className="relative z-10 p-8 h-full flex flex-col">
                <motion.div
                  className="text-5xl mb-6 w-16 h-16 flex items-center justify-center rounded-xl backdrop-blur-sm"
                  style={{
                    backgroundColor: `${service.color}20`,
                    border: `1px solid ${service.color}30`
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.6 }
                  }}
                >
                  {service.icon}
                </motion.div>

                <h3 
                  className="text-2xl font-medium mb-3 text-white group-hover:text-transparent transition-all duration-300"
                  style={{
                    backgroundImage: `linear-gradient(45deg, ${service.color}, #fff)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text'
                  }}
                >
                  {service.title}
                </h3>
                
                <p className="text-gray-400 mt-2 group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Animated underline */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 w-full"
                  style={{ backgroundColor: service.color }}
                  initial={{ scaleX: 0, transformOrigin: 'left center' }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Floating decorative elements */}
      <motion.div 
        className="absolute left-[15%] top-[20%] w-64 h-64 rounded-full bg-[#F59E0B] opacity-5 mix-blend-overlay filter blur-[80px] pointer-events-none"
        animate={{ 
          x: [0, 40, 0],
          y: [0, -30, 0],
          transition: { 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
      
      <motion.div 
        className="absolute right-[20%] bottom-[15%] w-72 h-72 bg-[#8B5CF6] opacity-5 mix-blend-overlay filter blur-[90px] pointer-events-none"
        animate={{ 
          borderRadius: ['40% 60% 60% 40%', '50% 50% 50% 50%', '60% 40% 40% 60%', '40% 60% 60% 40%'],
          rotate: [0, 180, 360],
          transition: { 
            duration: 24,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      />
    </section>
  );
}