'use client';
import { motion, useAnimation, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    title: 'Brand Identity – Solis', 
    category: 'Branding',
    description: 'Complete visual identity for sustainable energy startup',
    img: '/solis.png',
    colors: ['#FFD700', '#FF6B6B', '#4ECDC4'],
    caseStudy: {
      overview: 'Solis is a renewable energy startup focused on making solar power accessible to urban households. The brand needed to communicate innovation, sustainability, and approachability.',
      challenge: 'How to position a tech-forward energy company as friendly and consumer-focused while standing out in a competitive market.',
      solution: 'We developed a vibrant identity system combining organic solar motifs with geometric precision. The logo represents both sunlight and connectivity.',
      deliverables: ['Logo Design', 'Brand Guidelines', 'Stationery Suite', 'Marketing Collateral', 'Website Design'],
      testimonial: '"The team transformed our vision into a stunning visual identity that perfectly captures our mission." — Sarah Chen, CEO of Solis'
    }
  },
  { 
    title: 'Packaging – Bloom Co.', 
    category: 'Packaging',
    description: 'Eco-friendly cosmetic line packaging design',
    img: '/bloom.png',
    colors: ['#A78BFA', '#F472B6', '#60A5FA'],
    caseStudy: {
      overview: 'Bloom Co. wanted sustainable packaging for their new organic skincare line that would appeal to eco-conscious millennials without sacrificing luxury appeal.',
      challenge: 'Creating premium unboxing experiences while maintaining 100% compostable materials and minimizing environmental impact.',
      solution: 'We developed a modular packaging system using seeded paper that customers could plant, with soy-based inks and minimalist design that emphasized the natural ingredients.',
      deliverables: ['Primary Packaging', 'Secondary Packaging', 'Shipping Boxes', 'Point-of-Sale Displays', 'Brand Guidelines'],
      testimonial: '"Our sales increased 40% after the packaging redesign, with customers specifically mentioning the packaging as a purchase motivator." — James Bloom, Founder'
    }
  },
  { 
    title: 'Poster Art – Jazz Festival', 
    category: 'Print',
    description: 'Series of vibrant posters for international jazz festival',
    img: '/jazz.png',
    colors: ['#F59E0B', '#10B981', '#3B82F6'],
    caseStudy: {
      overview: 'The annual International Jazz Festival needed a poster series that would capture the energy of live jazz while appealing to both traditional jazz audiences and younger demographics.',
      challenge: 'Creating designs that felt fresh and contemporary while honoring jazz heritage, with enough visual impact to work as street posters and digital assets.',
      solution: 'We developed a kinetic typography system that visualized musical rhythms, paired with bold color blocking that changed for each headlining act while maintaining series cohesion.',
      deliverables: ['Main Festival Poster', 'Artist Series (12 variations)', 'Digital Assets', 'Merchandise Designs', 'Wayfinding System'],
      testimonial: '"These posters became collector\'s items—we\'ve never had such demand for festival artwork before." — Maria Gonzalez, Festival Director'
    }
  },
];

export default function Portfolio() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const floatingShapes = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollYProgress } = useScroll();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject !== null && modalRef.current) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      // Apply the lock
      disableBodyScroll(modalRef.current, {
        reserveScrollBarGap: true,
      });
      // Reset the scroll position to prevent page jump
      window.scrollTo(0, scrollY);
      
      // Cleanup function
      return () => {
        if (modalRef.current) {
          enableBodyScroll(modalRef.current);
        }
        clearAllBodyScrollLocks();
      };
    }
  }, [selectedProject]);

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
      
      // Initial fade in
      gsap.to(shape, {
        opacity: 0.15,
        duration: 2,
        delay: i * 0.3
      });
      
      return gsap.to(shape, {
        x: gsap.utils.random(-50, 50),
        y: gsap.utils.random(-30, 30),
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

  // Project hover effect
  const handleHover = (index: number) => {
    setHoveredIndex(index);
    controls.start({
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400, damping: 20 }
    });
  };

  // Floating shapes component
  const FloatingShapes = () => {
    const shapes = [
      { color: '#facc15', size: 120, left: '10%', top: '20%' },
      { color: '#ef4444', size: 80, left: '80%', top: '30%' },
      { color: '#3b82f6', size: 100, left: '15%', top: '70%' },
      { color: '#8b5cf6', size: 60, left: '85%', top: '60%' }
    ];

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden" id="portfolio">
        {shapes.map((shape, i) => (
          <div
            key={i}
            ref={el => { floatingShapes.current[i] = el; }}
            className="absolute rounded-full mix-blend-overlay opacity-0"
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

  // Modal scroll progress animation
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (selectedProject !== null) {
      // You can use this to animate elements based on modal scroll
    }
  });

  return (
    <section 
      ref={containerRef}
      className="relative py-32 px-6 max-w-7xl mx-auto overflow-hidden"
    >
      <FloatingShapes />
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute -left-40 top-1/4 w-80 h-80 rounded-full bg-[#facc15] opacity-5 mix-blend-overlay filter blur-3xl"
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div 
        className="absolute -right-40 bottom-1/4 w-96 h-96 bg-[#3b82f6] opacity-5 mix-blend-overlay filter blur-3xl"
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

      <div className="relative z-10">
        <motion.h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-serif text-center mb-20 text-[#facc15] relative inline-block"
          initial={{ opacity: 1 }}
        >
          <span className="relative z-10">Selected Works</span>
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

        <div className="grid md:grid-cols-3 gap-8 relative">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              className="portfolio-item overflow-hidden rounded-xl group relative cursor-pointer"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.8, type: 'spring' }}
              viewport={{ once: true, margin: "-100px" }}
              onHoverStart={() => handleHover(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setSelectedProject(idx)}
              animate={{
                zIndex: hoveredIndex === idx ? 10 : 1,
                scale: hoveredIndex === idx ? 1.05 : 1
              }}
            >
              {/* Project image with parallax effect */}
              <motion.div 
                className="w-full h-80 relative overflow-hidden"
                animate={{
                  scale: hoveredIndex === idx ? 1.1 : 1
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.img 
                  src={proj.img} 
                  alt={proj.title}
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                />
                
                {/* Color overlay */}
                <motion.div 
                  className="absolute inset-0 mix-blend-overlay"
                  style={{ backgroundColor: proj.colors[0] }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredIndex === idx ? 0.3 : 0,
                    backgroundColor: [
                      proj.colors[0],
                      proj.colors[1],
                      proj.colors[2],
                      proj.colors[0]
                    ]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
              
              {/* Project info */}
              <motion.div 
                className="absolute inset-0 flex flex-col justify-end p-6 text-white bg-gradient-to-t from-black/90 via-black/60 to-transparent"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.2 + 0.3, duration: 0.6 }}
              >
                <motion.span 
                  className="text-sm font-mono mb-1 text-[#facc15]"
                  animate={{ 
                    x: hoveredIndex === idx ? 5 : 0
                  }}
                >
                  {proj.category}
                </motion.span>
                <motion.h3 
                  className="text-2xl font-serif mb-2"
                  animate={{ 
                    x: hoveredIndex === idx ? 10 : 0
                  }}
                >
                  {proj.title}
                </motion.h3>
                <motion.p 
                  className="text-sm opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                >
                  {proj.description}
                </motion.p>
              </motion.div>
              
              {/* Hover border effect */}
              <motion.div 
                className="absolute inset-0 border-2 border-transparent pointer-events-none"
                animate={{
                  borderColor: hoveredIndex === idx ? proj.colors[0] : 'transparent',
                  opacity: hoveredIndex === idx ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Subtle glow effect */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hoveredIndex === idx ? 0.2 : 0,
                  boxShadow: `0 0 60px 10px ${proj.colors[0]}`
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Project modal */}
        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div 
                ref={modalRef}
                className="relative max-w-6xl w-full max-h-[90vh] bg-gray-900 rounded-xl overflow-hidden flex flex-col"
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                style={{ boxShadow: `0 0 40px ${projects[selectedProject].colors[0]}40` }}
              >
                <motion.button 
                  className="absolute top-4 right-4 z-50 text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition-all"
                  onClick={() => setSelectedProject(null)}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                >
                  &times;
                </motion.button>
                
                {/* Hero section with parallax */}
                <div className="h-96 bg-gray-800 relative overflow-hidden">
                  <motion.img 
                    src={projects[selectedProject].img} 
                    alt={projects[selectedProject].title}
                    className="w-full h-full object-cover absolute inset-0"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  
                  <motion.div 
                    className="absolute bottom-0 left-0 p-8 w-full"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex gap-2 mb-4">
                      {projects[selectedProject].colors.map((color, i) => (
                        <motion.div
                          key={i}
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: color }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 + 0.3 }}
                        />
                      ))}
                    </div>
                    
                    <motion.h3 
                      className="text-4xl md:text-5xl font-serif mb-2 text-white"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {projects[selectedProject].title}
                    </motion.h3>
                    <motion.p 
                      className="text-xl text-gray-300"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {projects[selectedProject].description}
                    </motion.p>
                  </motion.div>
                </div>
                
                {/* Scrollable content area */}
                <div className="overflow-y-auto flex-1 p-8 space-y-12">
                  {/* Overview section */}
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h4 className="text-2xl font-serif mb-4 text-white border-b pb-2 border-gray-700">Overview</h4>
                    <p className="text-gray-300 leading-relaxed">
                      {projects[selectedProject].caseStudy.overview}
                    </p>
                  </motion.section>
                  
                  {/* Challenge & Solution */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.section
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <h4 className="text-2xl font-serif mb-4 text-[#ef4444]">Challenge</h4>
                      <p className="text-gray-300 leading-relaxed">
                        {projects[selectedProject].caseStudy.challenge}
                      </p>
                    </motion.section>
                    
                    <motion.section
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h4 className="text-2xl font-serif mb-4 text-[#10B981]">Solution</h4>
                      <p className="text-gray-300 leading-relaxed">
                        {projects[selectedProject].caseStudy.solution}
                      </p>
                    </motion.section>
                  </div>
                  
                  {/* Deliverables */}
                  <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <h4 className="text-2xl font-serif mb-4 text-white border-b pb-2 border-gray-700">Deliverables</h4>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {projects[selectedProject].caseStudy.deliverables.map((item, i) => (
                        <motion.li
                          key={i}
                          className="px-4 py-3 bg-gray-800 rounded-lg text-gray-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 + i * 0.05 }}
                          whileHover={{ 
                            y: -5,
                            backgroundColor: projects[selectedProject].colors[i % projects[selectedProject].colors.length] + '20',
                            borderLeft: `4px solid ${projects[selectedProject].colors[i % projects[selectedProject].colors.length]}`
                          }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.section>
                  
                  {/* Testimonial */}
                  <motion.section
                    className="bg-black/30 p-8 rounded-xl relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-10"
                      style={{ 
                        backgroundColor: projects[selectedProject].colors[0],
                        filter: 'blur(80px)'
                      }}
                    />
                    <motion.blockquote 
                      className="text-xl italic text-gray-300 relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      &quot;{projects[selectedProject].caseStudy.testimonial}&quot;
                    </motion.blockquote>
                  </motion.section>
                  
                  {/* CTA */}
                  <motion.div 
                    className="flex justify-center pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                  >
                    <motion.button
                      className="px-8 py-3 bg-[#facc15] text-black rounded-full font-sans font-medium text-lg flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>View Full Project</span>
                      <motion.svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </motion.svg>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}