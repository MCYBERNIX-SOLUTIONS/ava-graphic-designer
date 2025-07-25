'use client';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const floatingShapes = useRef<(HTMLDivElement | null)[]>([]);

  // Floating shapes data
  const shapes = [
    { color: '#facc15', size: 120, initialX: -100, initialY: -50 },
    { color: '#ef4444', size: 80, initialX: 100, initialY: -30 },
    { color: '#3b82f6', size: 100, initialX: -80, initialY: 70 },
    { color: '#8b5cf6', size: 60, initialX: 120, initialY: 40 }
  ];

  // Content cards data
  const contentCards = [
    {
      title: "Design Philosophy",
      content: "I believe in design that communicates clearly while evoking emotion. My approach combines minimalist aesthetics with bold, intentional details that create memorable experiences.",
      color: "#facc15"
    },
    {
      title: "Creative Process",
      content: "From initial sketches to final delivery, my process is iterative and collaborative. I thrive on feedback and believe the best designs emerge from dialogue and experimentation.",
      color: "#3b82f6"
    },
    {
      title: "Technical Expertise",
      content: "Mastery of industry tools including Adobe Creative Suite, Figma, and emerging AI-assisted design platforms. I stay current with design trends while maintaining timeless fundamentals.",
      color: "#ef4444"
    },
    {
      title: "Client Approach",
      content: "I view each project as a partnership. Understanding your vision, audience, and goals is the foundation for creating designs that truly resonate and perform.",
      color: "#8b5cf6"
    }
  ];

  // Main animation timeline
  useGSAP(() => {
    if (!containerRef.current) return;

    // Set initial positions
    gsap.set([shape1Ref.current, shape2Ref.current, shape3Ref.current], { opacity: 0 });
    gsap.set(floatingShapes.current, { opacity: 0, y: 50 });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Title animation
    tl.fromTo(titleRef.current, 
      { 
        opacity: 0,
        y: 50,
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
      }, 
      { 
        opacity: 1,
        y: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.2,
        ease: "power3.out"
      }
    );

    // Decorative shapes animation
    tl.fromTo([shape1Ref.current, shape2Ref.current, shape3Ref.current], 
      { opacity: 0, scale: 0 },
      { 
        opacity: 0.3,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)"
      },
      "-=0.8"
    );

    // Text animation
    tl.fromTo(textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      },
      "-=0.5"
    );

    // Floating shapes animation
    floatingShapes.current.forEach((shape, i) => {
      if (!shape) return;
      
      tl.to(shape, {
        opacity: 0.15,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, `-=${0.7 - i * 0.1}`);

      // Continuous floating animation
      gsap.to(shape, {
        y: gsap.utils.random(-20, 20),
        x: gsap.utils.random(-15, 15),
        rotation: gsap.utils.random(-10, 10),
        duration: gsap.utils.random(3, 5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3
      });
    });

    // Continuous rotation for decorative shapes
    gsap.to([shape1Ref.current, shape2Ref.current, shape3Ref.current], {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: "none"
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative py-32 px-6 max-w-6xl mx-auto overflow-hidden"
      id="about"
    >
      {/* Background floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {shapes.map((shape, i) => (
          <div
            key={i}
            ref={el => { floatingShapes.current[i] = el; }}
            className="absolute rounded-full mix-blend-overlay"
            style={{
              backgroundColor: shape.color,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              left: `${50 + shape.initialX/4}%`,
              top: `${50 + shape.initialY/4}%`,
              filter: 'blur(40px)'
            }}
          />
        ))}
      </div>

      {/* Decorative shapes */}
      <motion.div
        ref={shape1Ref}
        className="absolute -left-10 top-1/4 w-40 h-40 rounded-full bg-[#facc15] opacity-0 mix-blend-overlay filter blur-3xl"
      />
      <motion.div
        ref={shape2Ref}
        className="absolute -right-10 top-1/3 w-32 h-32 bg-[#3b82f6] opacity-0 mix-blend-overlay filter blur-3xl"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
      />
      <motion.div
        ref={shape3Ref}
        className="absolute left-1/4 -bottom-20 w-48 h-48 bg-[#ef4444] opacity-0 mix-blend-overlay filter blur-3xl"
        style={{ borderRadius: '40% 60% 60% 40% / 70% 30% 70% 30%' }}
      />

      <div className="relative z-10">
        <motion.h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-serif mb-12 text-[#facc15] relative inline-block"
          initial={{ opacity: 0 }}
        >
          <span className="relative z-10">About Me</span>
          <motion.span
            className="absolute -bottom-2 left-0 w-full h-1 bg-[#facc15]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.33, 1, 0.68, 1] }}
            viewport={{ once: true }}
          />
        </motion.h2>

        <motion.div
          className="relative max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          viewport={{ once: true }}
        >
          <motion.p
            ref={textRef}
            className="text-gray-300 font-sans text-lg md:text-xl leading-relaxed mb-8"
            initial={{ opacity: 0 }}
          >
            I'm <span className="text-[#facc15] font-medium">Ava</span>, a graphic designer with a passion for storytelling through <span className="text-[#3b82f6]">color</span>, <span className="text-[#ef4444]">shape</span>, and <span className="text-[#8b5cf6]">typography</span>.
          </motion.p>

          <motion.p
            className="text-gray-300 font-sans text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: true }}
          >
            With over <span className="text-[#facc15]">5 years</span> of experience, I've helped <span className="text-[#3b82f6]">startups</span>, <span className="text-[#ef4444]">artists</span>, and <span className="text-[#8b5cf6]">brands</span> create bold visual identities that stand out and communicate effectively.
          </motion.p>
        </motion.div>

        {/* Content cards grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          {contentCards.map((card, i) => (
            <motion.div
              key={i}
              className="relative p-8 rounded-3xl bg-gray-900/50 backdrop-blur-md border border-gray-800 overflow-hidden h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div 
                className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20"
                style={{ backgroundColor: card.color, filter: 'blur(40px)' }}
              />
              <h3 
                className="text-2xl font-serif mb-4 relative z-10"
                style={{ color: card.color }}
              >
                {card.title}
              </h3>
              <p className="text-gray-300 relative z-10">
                {card.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Animated decorative elements */}
        <motion.div
          className="absolute -left-20 top-1/2 w-40 h-40 rounded-full border-2 border-[#facc15] opacity-10"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -right-20 bottom-1/3 w-32 h-32 border-2 border-[#3b82f6] opacity-10"
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