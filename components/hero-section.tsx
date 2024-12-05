"use client";
import { Card3D } from "./3d-card";
import { BackgroundBeams } from "./background-beams";
import { NavBar } from "./nav-bar";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

export const HeroSection = () => {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      <NavBar />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 mt-40">
        {/* 标题动画 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
            from-blue-500 via-purple-500 to-pink-500 animate-gradient">
            FULL STACK DEVELOPER
          </h2>
          
          {/* 优化后的打字机效果副标题 */}
          <motion.div 
            className="mt-8 text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <TypeAnimation
              sequence={[
                'Building  ',
                1000,
                'Building the future ',
                1000,
                'Building the future of web',
                1000,
                'Building the future of web, one line at a time',
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="flex flex-wrap justify-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              repeat={Infinity}
              cursor={true}
            />
          </motion.div>
        </motion.div>

        {/* 3D卡片容器添加动画 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Card3D>
            <div className="relative w-full" />
          </Card3D>
        </motion.div>

        {/* 添加滚动提示 */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-2" />
          </div>
        </motion.div>
      </div>

      <BackgroundBeams />
    </div>
  );
};