"use client";
import { cn } from "@/utils/cn";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiWeb3Dotjs, SiBlockchaindotcom } from 'react-icons/si';

export const Card3D = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [hovering, setHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]), {
    damping: 50,
    stiffness: 200,
    mass: 1
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]), {
    damping: 50,
    stiffness: 200,
    mass: 1
  });

  const scale = useSpring(hovering ? 1.02 : 1, {
    damping: 30,
    stiffness: 300,
  });

  const float = useSpring(hovering ? -10 : 0, {
    damping: 30,
    stiffness: 300,
  });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left - width / 2) / (width / 3));
    mouseY.set((clientY - top - height / 2) / (height / 3));
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setHovering(false);
  }

  const skills = [
    { name: 'React', icon: SiReact, color: 'text-blue-500' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'text-black' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
    { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-600' },
    { name: 'Web3', icon: SiWeb3Dotjs, color: 'text-purple-600' },
    { name: 'Blockchain', icon: SiBlockchaindotcom, color: 'text-orange-500' }
  ];

  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    size: number;
    speed: number;
  }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
      }))
    );
  }, []);

  return (
    <motion.div
      className={cn(
        "flex items-center justify-center perspective-[2000px]",
        className
      )}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => setHovering(true)}
      style={{
        y: float
      }}
    >
      {hovering && particles.map((particle, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          initial={{ 
            x: particle.x + "%",
            y: particle.y + "%",
            opacity: 0 
          }}
          animate={{ 
            y: particle.y - 20 + "%",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.speed * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      <motion.div
        className={cn(
          "flex items-center justify-center relative",
          "bg-gradient-to-br from-white/90 via-white/80 to-white/70",
          "rounded-3xl border border-white/20",
          "p-8 shadow-2xl",
          hovering ? "shadow-xl shadow-blue-500/10" : "",
          "backdrop-blur-xl"
        )}
        style={{ 
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"
          style={{
            transform: "translateZ(-20px)",
            opacity: hovering ? 1 : 0
          }}
        />

        <motion.div 
          className="relative z-10"
          style={{
            transform: "translateZ(20px)"
          }}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-40 h-40">
              <Image
                src="./avater.png"
                alt="Kling-zero"
                fill
                className="rounded-full object-cover border-4 border-gray-200"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
            </div>
            
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Hi there, I&apos;m Kling-zero! 👋
              </h1>
              <p className="text-gray-600">
                New to Web3, but dreaming big! 🚀 Developer 🧑‍💻 with a product mindset.
              </p>

              <div className="space-y-2">
                <p className="text-gray-500">
                  <span className="text-blue-500">🌱</span> Currently learning Web3, blockchain, and full-stack development
                </p>
                <p className="text-gray-500">
                  <span className="text-blue-500">👯</span> Looking to collaborate on Web3 and blockchain projects
                </p>
                <p className="text-gray-500">
                  <span className="text-blue-500">💻</span> Focused on full-stack development
                </p>
              </div>

              <div className="w-full bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Technical Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="px-3 py-2 rounded-xl bg-white/70 border border-gray-200
                        hover:scale-105 transition-all duration-300 cursor-default flex items-center gap-2"
                    >
                      <skill.icon className={`text-lg ${skill.color}`} />
                      <span className="text-gray-700">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">GitHub Contributions</h3>
                <Image
                  src="https://ghchart.rshah.org/Kelin0x"
                  alt="GitHub Contributions"
                  width={800}
                  height={128}
                  className="w-full rounded-xl"
                  unoptimized
                />
              </div>

              <div className="flex justify-center gap-4">
                <a 
                  href="mailto:lei812397@gmail.com"
                  className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  📫 Contact Me
                </a>
                <a 
                  href="#projects"
                  className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-500 hover:bg-purple-500/30 transition-colors"
                >
                  View Projects
                </a>
              </div>
            </div>
          </div>

          {children}
        </motion.div>

        <motion.div 
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0"
          animate={{
            opacity: hovering ? 0.2 : 0
          }}
          transition={{
            duration: 0.4
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            boxShadow: hovering 
              ? "inset 0 0 10px rgba(255,255,255,0.3)" 
              : "none",
            transition: "box-shadow 0.4s ease"
          }}
        />
      </motion.div>
    </motion.div>
  );
}; 
