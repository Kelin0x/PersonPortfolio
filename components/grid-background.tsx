"use client";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

export const GridBackground = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  const gridItems = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    duration: 15 + (i % 5) * 2,
    scale: 0.8 + (i % 3) * 0.2,
    opacity: 0.3 + (i % 4) * 0.1,
    rotation: (i * 30) % 360,
  })), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-12">
        {gridItems.map((item) => (
          <motion.div
            key={item.id}
            className="relative cursor-pointer"
            initial={false}
            animate={{
              opacity: hoveredId === item.id ? 0.8 : item.opacity,
              scale: hoveredId === item.id ? 1.2 : item.scale,
              rotate: item.rotation,
            }}
            whileHover={{ scale: 1.2 }}
            onHoverStart={() => setHoveredId(item.id)}
            onHoverEnd={() => setHoveredId(null)}
            style={{ pointerEvents: "auto" }}
          >
            <svg
              className="w-40 h-40"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 螺旋路径 */}
              <motion.path
                d={`
                  M 50 50
                  m -20 0
                  a 20 20 0 1 0 40 0
                  a 20 20 0 1 0 -40 0
                  M 50 50
                  m -15 0
                  a 15 15 0 1 0 30 0
                  a 15 15 0 1 0 -30 0
                  M 50 50
                  m -10 0
                  a 10 10 0 1 0 20 0
                  a 10 10 0 1 0 -20 0
                `}
                stroke={`url(#gradient1-${item.id})`}
                strokeWidth="0.5"
                initial={false}
                animate={{ 
                  rotate: 360,
                  scale: hoveredId === item.id ? 1.2 : 1,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* 动态星形 */}
              <motion.path
                d="M50,20 L55,40 L75,40 L60,55 L65,75 L50,65 L35,75 L40,55 L25,40 L45,40 Z"
                stroke={`url(#gradient2-${item.id})`}
                strokeWidth="0.5"
                fill="none"
                initial={false}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                  opacity: hoveredId === item.id ? 0.8 : 0.3,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* 脉冲环 */}
              <motion.circle
                cx="50"
                cy="50"
                r="30"
                stroke={`url(#gradient3-${item.id})`}
                strokeWidth="0.5"
                fill="none"
                initial={false}
                animate={{ 
                  r: [30, 35, 30],
                  opacity: hoveredId === item.id ? [0.6, 0.2, 0.6] : [0.2, 0.1, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* 渐变定义 */}
              <defs>
                <linearGradient id={`gradient1-${item.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#C084FC" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id={`gradient2-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818CF8" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id={`gradient3-${item.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#34D399" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* 渐变遮罩 */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            rgba(255,255,255,0.1) 0%, 
            rgba(255,255,255,0.4) 50%, 
            rgba(255,255,255,0.7) 100%
          )`
        }}
      />
    </div>
  );
};