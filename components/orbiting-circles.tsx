"use client";
import { motion } from "framer-motion";

export const OrbitingCircles = () => {
  // 调整轨道配置
  const orbits = [
    {
      size: 600,  // 增大轨道尺寸
      duration: 25,
      color: "from-blue-400/10 to-blue-600/10",  // 降低不透明度
      rotate: 0,
      particles: 4,
      particleSize: 4,  // 减小粒子尺寸
    },
    {
      size: 800,
      duration: 35,
      color: "from-purple-400/10 to-purple-600/10",
      rotate: 30,
      particles: 5,
      particleSize: 5,
    },
    {
      size: 1000,
      duration: 45,
      color: "from-pink-400/10 to-pink-600/10",
      rotate: -45,
      particles: 6,
      particleSize: 6,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {/* 轨道系统 */}
      {orbits.map((orbit, orbitIndex) => (
        <motion.div
          key={orbitIndex}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: orbit.size,
            height: orbit.size,
            rotate: orbit.rotate,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: orbitIndex * 0.2 }}
        >
          {/* 轨道上的粒子 */}
          {Array.from({ length: orbit.particles }).map((_, particleIndex) => {
            const angle = (360 / orbit.particles) * particleIndex;
            return (
              <motion.div
                key={particleIndex}
                className="absolute"
                style={{
                  width: '100%',
                  height: '100%',
                }}
                animate={{
                  rotate: [angle, angle + 360],
                }}
                transition={{
                  duration: orbit.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  className={`absolute top-0 left-1/2 -translate-x-1/2
                    bg-gradient-to-br ${orbit.color} rounded-full shadow-lg group
                    cursor-pointer`}
                  style={{
                    width: orbit.particleSize,
                    height: orbit.particleSize,
                  }}
                  whileHover={{ scale: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* 粒子光晕 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${orbit.color} 
                    rounded-full blur-md opacity-50 group-hover:opacity-75
                    group-hover:blur-lg transition-all duration-300`} />
                  
                  {/* 粒子尾迹 */}
                  <motion.div
                    className={`absolute top-1/2 left-1/2 w-12 h-0.5
                      bg-gradient-to-r ${orbit.color} rounded-full opacity-30
                      origin-left`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      ))}

      {/* 中心装饰 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-16 h-16"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* 中心光环 */}
          <div className="absolute inset-0 rounded-full 
            bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 
            blur-xl animate-spin-slow" />
          
          {/* 内部光点 */}
          <div className="absolute inset-3 rounded-full 
            bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 
            opacity-70 blur-sm animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}; 