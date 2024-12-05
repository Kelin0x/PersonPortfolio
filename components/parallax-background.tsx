"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ParallaxBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* 最底层背景 */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-purple-50/50"
        style={{ y: y1 }}
      />
      
      {/* 装饰几何图形层 */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: y2 }}
      >
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full 
          bg-blue-200/20 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full 
          bg-purple-200/20 blur-3xl" />
      </motion.div>

      {/* 粒子效果层 */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: y3 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}; 