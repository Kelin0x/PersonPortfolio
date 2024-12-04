"use client";
import { cn } from "@/utils/cn";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiWeb3Dotjs, SiBlockchaindotcom } from 'react-icons/si';
import { OrbitingCircles } from "./orbiting-circles";

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

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]), {
    damping: 40,
    stiffness: 300,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]), {
    damping: 40,
    stiffness: 300,
  });

  const scale = useSpring(hovering ? 1.02 : 1, {
    damping: 30,
    stiffness: 300,
  });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left - width / 2) / width);
    mouseY.set((clientY - top - height / 2) / height);
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

  return (
    <motion.div
      className={cn("flex items-center justify-center perspective-1200 relative", className)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => setHovering(true)}
    >
      <div className="absolute inset-0 z-10">
        <OrbitingCircles />
      </div>

      <motion.div
        className={cn(
          "flex items-center justify-center relative bg-gradient-to-br from-white/90 via-blue-100/90 to-purple-100/90 rounded-3xl border border-gray-200 p-8",
          "backdrop-blur-xl shadow-2xl transition-shadow duration-300",
          hovering ? "shadow-3xl" : ""
        )}
        style={{ 
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          transition: "box-shadow 0.3s ease",
          zIndex: 5
        }}
      >
        <div className="relative z-10">
          {/* 头像和介绍部分 */}
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
                Hi there, I'm Kling-zero! 👋
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

              {/* 添加 Technical Skills */}
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

              {/* 添加 GitHub Contributions */}
              <div className="w-full bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">GitHub Contributions</h3>
                <Image
                  src="https://ghchart.rshah.org/Kling-zero"
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
        </div>

        {/* 优化背景装饰效果 */}
        <motion.div 
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl"
          animate={{
            opacity: hovering ? 0.7 : 0
          }}
          transition={{
            duration: 0.3
          }}
        />
      </motion.div>
    </motion.div>
  );
}; 