'use client';
import { motion } from 'framer-motion';
import { useRef, Suspense } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Model Component
function DesignToolsModel() {
  const group = useRef<THREE.Group>(null);
  
  // Load a simple 3D model of design tools (pen, brush, etc.)
  // In a real implementation, you'd use actual GLTF models
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
  });

  // Simple placeholder geometry - replace with actual models
  return (
    <group ref={group} position={[0, 0, 0]} dispose={null}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-1, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1.5, 32]} />
          <meshStandardMaterial color="#ff4d4d" metalness={0.3} roughness={0.2} />
        </mesh>
        <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1, 1, 0.2]} />
          <meshStandardMaterial color="#4d79ff" metalness={0.3} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#4dff4d" metalness={0.4} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
}

// 3D Floating Shapes Background
function Floating3DShapes() {
  const shapes = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!shapes.current) return;
    shapes.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    shapes.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  const shapesCount = 15;
  const shapeTypes = ['box', 'sphere', 'torus', 'cone'];

  return (
    <group ref={shapes} position={[0, 0, -10]}>
      {Array.from({ length: shapesCount }).map((_, i) => {
        const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const position = [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          Math.random() * -20
        ];
        const rotation = [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI];
        const scale = 0.5 + Math.random() * 1.5;
        const color = new THREE.Color(
          Math.random() * 0.2 + 0.8,
          Math.random() * 0.2 + 0.8,
          Math.random() * 0.2 + 0.8
        );
        
        return (
          <Float 
            key={i} 
            speed={1 + Math.random() * 2} 
            rotationIntensity={0.5} 
            floatIntensity={0.5}
          >
            <mesh 
              position={position as [number, number, number]} 
              rotation={rotation as [number, number, number]}
              scale={[scale, scale, scale]}
            >
              {type === 'box' && <boxGeometry args={[1, 1, 1]} />}
              {type === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
              {type === 'torus' && <torusGeometry args={[0.5, 0.2, 16, 32]} />}
              {type === 'cone' && <coneGeometry args={[0.5, 1, 32]} />}
              <meshStandardMaterial 
                color={color} 
                transparent 
                opacity={0.05} 
                metalness={0.5} 
                roughness={0.8}
                emissive={color}
                emissiveIntensity={0.1}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridItems = useRef<(HTMLDivElement | null)[]>([]);
  const floatingShapes = useRef<(HTMLDivElement | null)[]>([]);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useGSAP(() => {
    if (!titleRef.current || !canvasContainerRef.current) return;

    const tl = gsap.timeline();
    
    // Title animation
    tl.fromTo(titleRef.current, 
      { y: 80, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.4, 
        ease: 'power3.out'
      }
    );

    // Canvas container fade in
    tl.fromTo(canvasContainerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
        ease: 'power2.inOut'
      },
      ">-=1"
    );

    // Grid animation
    tl.fromTo(gridItems.current, 
      { opacity: 0, scale: 0.8 },
      {
        opacity: 0.03,
        scale: 1,
        duration: 1.5,
        stagger: {
          grid: [15, 10],
          from: "center",
          amount: 0.5
        },
        ease: "power2.out"
      },
      ">-=0.5"
    );

    // Floating shapes animation
    floatingShapes.current.forEach((shape, i) => {
      if (!shape) return;
      const duration = 15 + Math.random() * 10;
      const delay = i * 0.3;
      
      gsap.to(shape, {
        x: gsap.utils.random(-50, 50),
        y: gsap.utils.random(-30, 30),
        rotation: gsap.utils.random(-180, 180),
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

  }, { scope: containerRef });

  // Design grid background
  const DesignGrid = () => {
    const columns = 15;
    const rows = 10;
    
    return (
      <div className="absolute inset-0 grid pointer-events-none overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`
        }}>
        {Array.from({ length: columns * rows }).map((_, i) => (
          <div
            key={i}
            ref={el => { if (el) gridItems.current[i] = el; }}
            className="border border-gray-800 opacity-0"
          />
        ))}
      </div>
    );
  };

  // Floating design elements
  const FloatingDesignElements = () => {
    const elements = [
      { shape: 'circle', color: 'rgba(255, 77, 77, 0.15)', size: 120 },
      { shape: 'square', color: 'rgba(77, 121, 255, 0.15)', size: 80 },
      { shape: 'triangle', color: 'rgba(77, 255, 77, 0.15)', size: 100 },
      { shape: 'blob', color: 'rgba(255, 77, 255, 0.15)', size: 90 },
      { shape: 'circle', color: 'rgba(255, 255, 77, 0.15)', size: 70 }
    ];
    
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {elements.map((el, i) => {
          let shapeStyle = {};
          switch(el.shape) {
            case 'circle':
              shapeStyle = { borderRadius: '50%' };
              break;
            case 'triangle':
              shapeStyle = { 
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                borderRadius: '10%'
              };
              break;
            case 'blob':
              shapeStyle = { 
                borderRadius: '40% 60% 60% 40% / 70% 30% 70% 30%'
              };
              break;
            default: // square
              shapeStyle = { borderRadius: '10%' };
          }
          
          return (
            <div
              key={i}
              ref={el => { if (el) floatingShapes.current[i] = el; }}
              className="absolute opacity-0"
              style={{
                ...shapeStyle,
                backgroundColor: el.color,
                width: `${el.size}px`,
                height: `${el.size}px`,
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                filter: 'blur(20px)',
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          );
        })}
      </div>
    );
  };

  // Color bleed effect (like ink spreading)
  const ColorBleedEffect = () => {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#ff4d4d] opacity-5 mix-blend-overlay filter blur-3xl" />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 rounded-full bg-[#4d79ff] opacity-5 mix-blend-overlay filter blur-3xl" />
        <div className="absolute top-1/3 left-2/3 w-64 h-64 rounded-full bg-[#4dff4d] opacity-5 mix-blend-overlay filter blur-3xl" />
      </div>
    );
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-black"
    >
      <DesignGrid />
      <ColorBleedEffect />
      <FloatingDesignElements />
      
      {/* 3D Canvas Background */}
      <div ref={canvasContainerRef} className="absolute inset-0 opacity-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <Floating3DShapes />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
      
      {/* 3D Tools Model - positioned near the title */}
      <div className="absolute right-10 bottom-1/4 w-64 h-64 md:w-80 md:h-80 opacity-70 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <DesignToolsModel />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.h1 
          ref={titleRef} 
          className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight font-bold relative"
          initial={{ opacity: 0 }}
        >
          <motion.span 
            className="block"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            Hello, I'm <span className="text-[#ff4d4d]">Ava</span> —
          </motion.span>
          <motion.span 
            className="block"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10, delay: 0.1 }}
          >
            Graphic Designer & Visual Thinker
          </motion.span>
          
          {/* Decorative design elements */}
          <motion.div 
            className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-[#ff4d4d] opacity-10 hidden md:block"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-6 -right-6 w-12 h-12 bg-[#4d79ff] opacity-10 hidden md:block"
            animate={{ 
              scale: [1, 0.8, 1],
              borderRadius: ['10%', '50%', '10%']
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 max-w-xl mx-auto text-lg md:text-xl text-gray-300 font-sans relative"
          whileHover={{
            scale: 1.02,
            textShadow: "0 0 10px rgba(255,255,255,0.3)"
          }}
        >
          I craft visual experiences that tell stories and build brands.
        </motion.p>
        
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            className="px-8 py-3 bg-[#ff4d4d] text-white rounded-full font-sans font-medium relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 15px rgba(255, 77, 77, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View Portfolio</span>
            <motion.span 
              className="absolute inset-0 bg-white opacity-0 rounded-full"
              whileHover={{ opacity: 0.1, scale: 1.5 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          <motion.button
            className="px-8 py-3 border border-white text-white rounded-full font-sans font-medium relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Contact Me</span>
            <motion.span 
              className="absolute inset-0 bg-white opacity-0 rounded-full"
              whileHover={{ opacity: 0.1, scale: 1.5 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="block text-sm text-gray-400">Scroll down</span>
        <motion.div 
          className="mx-auto mt-2 w-4 h-8 border-2 border-gray-400 rounded-full"
          animate={{ 
            y: [0, 10],
            opacity: [1, 0.5]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  );
}