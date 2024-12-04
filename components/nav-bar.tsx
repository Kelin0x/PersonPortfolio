"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const NavBar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="relative px-8 py-4 bg-white/80 backdrop-blur-md rounded-full 
          shadow-lg shadow-black/[0.03] border border-gray-200/30
          hover:shadow-xl hover:bg-white/90 transition-all duration-300"
      >
        <nav className="flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              className="relative"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setActiveIndex(index)}
            >
              {/* 背景光效 */}
              {hoveredIndex === index && (
                <motion.div
                  layoutId="hoverBackground"
                  className="absolute inset-0 -z-10 rounded-full 
                    bg-gradient-to-r from-blue-100 to-purple-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              {/* 活跃指示器 */}
              {activeIndex === index && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 -z-10 rounded-full 
                    bg-gradient-to-r from-blue-200 to-purple-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              <a
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300
                  ${activeIndex === index 
                    ? 'text-blue-700' 
                    : hoveredIndex === index 
                      ? 'text-blue-600' 
                      : 'text-gray-700'
                  }`}
              >
                {/* 文字光效 */}
                <span className="relative z-10">
                  {item.name}
                  
                  {/* 下划线动画 */}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 
                      bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: hoveredIndex === index || activeIndex === index ? 1 : 0 
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </span>

                {/* 悬浮粒子效果 */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute -z-10 inset-0"
                    initial="initial"
                    animate="animate"
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-blue-400/30"
                        initial={{ 
                          opacity: 0,
                          y: 0,
                          x: Math.random() * 20 - 10 
                        }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          y: -20,
                          transition: {
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                          }
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </a>
            </motion.div>
          ))}
        </nav>

        {/* 装饰性光晕 */}
        <div className="absolute -z-10 inset-0 rounded-full 
          bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 
          blur-xl opacity-50 group-hover:opacity-75 transition-opacity" 
        />
      </motion.div>
    </div>
  );
}; 