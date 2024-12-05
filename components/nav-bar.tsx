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

  // 预先计算固定的偏移值，替代随机值
  const particleOffsets = [5, -5, 0];

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="relative px-10 py-5 bg-white/70 backdrop-blur-lg rounded-2xl 
          shadow-lg shadow-black/[0.05] border border-gray-200/50
          hover:shadow-xl hover:bg-white/80 transition-all duration-300"
      >
        <nav className="flex items-center gap-10">
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
                  className="absolute inset-0 -z-10 rounded-xl 
                    bg-gradient-to-r from-blue-50 to-purple-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              {/* 活跃指示器 */}
              {activeIndex === index && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 -z-10 rounded-xl 
                    bg-gradient-to-r from-blue-100/80 to-purple-100/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              <a
                href={item.href}
                className={`relative px-5 py-2.5 text-[15px] font-medium tracking-wide transition-colors duration-300
                  ${activeIndex === index 
                    ? 'text-blue-800' 
                    : hoveredIndex === index 
                      ? 'text-blue-700' 
                      : 'text-gray-800'
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
                          x: particleOffsets[i] // 使用预定义的偏移值
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
        <div className="absolute -z-10 inset-0 rounded-2xl 
          bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 
          blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" 
        />
      </motion.div>
    </div>
  );
}; 