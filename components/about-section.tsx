"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SkillGraph } from "./skill-graph";
import { useRef, useState, useEffect } from "react";
import { SiReact, SiWeb3Dotjs, SiBlockchaindotcom } from 'react-icons/si';

// 定义交互粒子系统
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  velocity: { x: number; y: number };
  color: string;
}

// 添加卡片尺寸常量
const CARD_WIDTH = 280;  // 卡片宽度
const CARD_HEIGHT = 200; // 卡片高度
const GRID_GAP = 20;    // 卡片间距
const CONTAINER_WIDTH = 900; // 容器宽度
const CONTAINER_HEIGHT = 660; // 容器高度

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // 创建弹性动画
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]), springConfig);

  // 处理鼠标移动和粒子系统
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    
    // 创建新粒子
    const newParticle: Particle = {
      id: Date.now(),
      x,
      y,
      size: Math.random() * 4 + 2,
      velocity: {
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4
      },
      color: `hsla(${Math.random() * 60 + 200}, 100%, 70%, 0.8)`
    };
    
    setParticles(prev => [...prev.slice(-20), newParticle]);
  };

  // 更新粒子位置
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.velocity.x,
          y: particle.y + particle.velocity.y,
          size: particle.size * 0.95,
          velocity: {
            x: particle.velocity.x * 0.98,
            y: particle.velocity.y * 0.98
          }
        }))
        .filter(particle => particle.size > 0.5)
      );
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <SiReact className="text-blue-500" />,
      title: "Frontend Architecture",
      description: "Crafting responsive and intuitive user interfaces with React ecosystem",
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      icon: <SiWeb3Dotjs className="text-purple-500" />,
      title: "Web3 Development",
      description: "Building decentralized applications with blockchain integration",
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      icon: <SiBlockchaindotcom className="text-indigo-500" />,
      title: "Smart Contracts",
      description: "Developing secure and efficient blockchain smart contracts",
      color: "from-indigo-500/20 to-indigo-600/20"
    },
    {
      icon: <SiReact className="text-emerald-500" />,
      title: "Backend Systems",
      description: "Designing scalable and robust server-side architectures",
      color: "from-emerald-500/20 to-emerald-600/20"
    },
    {
      icon: <SiWeb3Dotjs className="text-amber-500" />,
      title: "API Integration",
      description: "Seamlessly connecting services with RESTful and GraphQL APIs",
      color: "from-amber-500/20 to-amber-600/20"
    },
    {
      icon: <SiBlockchaindotcom className="text-rose-500" />,
      title: "DevOps Practices",
      description: "Implementing CI/CD pipelines and cloud infrastructure",
      color: "from-rose-500/20 to-rose-600/20"
    }
  ];

  // 重新设计布局计算函数
  const getInitialPosition = () => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 0.9
  });

  const getFinalPosition = (index: number) => {
    const column = index % 3;
    const row = Math.floor(index / 3);
    return {
      // 水平布局：左(-360px) 中(0) 右(360px)，确保间距一致
      x: (column - 1) * 360,
      // 垂直布局：第一行在中心偏上(-120px)，第二行在中心偏下(120px)
      y: row === 0 ? -120 : 120,
      rotate: 0,
      scale: 1
    };
  };

  // 添加自动移动相关的状态和函数
  const [positions, setPositions] = useState<{ x: number; y: number }[]>(
    features.map((_, index) => ({
      x: (index % 3) * (CARD_WIDTH + GRID_GAP) + GRID_GAP,
      y: Math.floor(index / 3) * (CARD_HEIGHT + GRID_GAP) + GRID_GAP
    }))
  );

  // 生成随机目标位置
  const getRandomPosition = (index: number) => {
    const maxX = 900 - CARD_WIDTH - GRID_GAP * 2;
    const maxY = 660 - CARD_HEIGHT - GRID_GAP * 2;
    return {
      x: Math.random() * maxX,
      y: Math.random() * maxY
    };
  };

  // 添加自动移动效果
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prevPositions => 
        prevPositions.map((_, index) => getRandomPosition(index))
      );
    }, 3000); // 每5秒更新一次位置

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen py-32 overflow-hidden" // 增加垂直内边距
      style={{ opacity }}
    >
      {/* 交互粒子效果 */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            x: particle.x,
            y: particle.y,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, ease: "linear" }}
        />
      ))}

      {/* 主要内容容器 */}
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ y, scale }}
      >
        {/* 标题部分 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent 
            bg-gradient-to-r from-blue-500 to-violet-500">
            About Me
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Focused on modern Web technology stacks, creating high-performance digital experiences
          </p>
        </motion.div>

        {/* 顶部拖拽示意图 */}
        <div className="absolute top-4 right-4 flex items-center gap-3 text-gray-600 bg-white/50 
          backdrop-blur-sm px-4 py-2.5 rounded-full border-2 border-blue-200/50 shadow-lg
          animate-bounce hover:bg-white/70 transition-all duration-300">
          <svg 
            className="w-6 h-6 text-blue-500" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 5V19M12 5L8 9M12 5L16 9M12 19L8 15M12 19L16 15" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-bold text-gray-700">DRAG CARDS</span>
        </div>

        {/* 底部说明文字 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 text-gray-600 bg-white/50 backdrop-blur-sm 
            px-5 py-3 rounded-xl border-2 border-purple-200/50 shadow-lg">
            <svg 
              className="w-5 h-5 text-purple-500" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M9 4.5V19.5M15 4.5V19.5M4.5 9H19.5M4.5 15H19.5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm font-medium">
              Try dragging the cards to explore my skills in different areas
            </span>
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-purple-400 opacity-75"></span>
          </div>
        </div>

        {/* 卡片网格布局 */}
        <div className="relative w-full max-w-[900px] h-[660px] mx-auto mb-16 border border-gray-200 rounded-2xl 
          bg-transparent backdrop-blur-sm">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: positions[index]?.x ?? 0,
                y: positions[index]?.y ?? 0,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1
              }}
              drag
              dragConstraints={{
                top: 0,
                left: 0,
                right: CONTAINER_WIDTH - CARD_WIDTH - GRID_GAP * 2,
                bottom: CONTAINER_HEIGHT - CARD_HEIGHT - GRID_GAP * 2
              }}
              dragElastic={0.1}
              whileDrag={{ scale: 1.05, zIndex: 50 }}
            >
              <div className={`
                w-[${CARD_WIDTH}px] h-[${CARD_HEIGHT}px]
                p-6 rounded-xl
                bg-white
                border border-gray-200
                shadow-lg hover:shadow-xl
                transition-all duration-300
                group
              `}>
                <div className={`
                  h-full flex flex-col
                  bg-gradient-to-br ${feature.color}
                  rounded-lg p-4
                `}>
                  <motion.div 
                    className="text-3xl mb-4 transform-gpu"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.6, type: "spring" }
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-gray-800 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                  
                  <div className="mt-4 h-1.5 w-full bg-gray-200/30 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        feature.color.includes('blue') ? 'bg-blue-500' :
                        feature.color.includes('purple') ? 'bg-purple-500' :
                        feature.color.includes('indigo') ? 'bg-indigo-500' :
                        feature.color.includes('emerald') ? 'bg-emerald-500' :
                        feature.color.includes('amber') ? 'bg-amber-500' :
                        'bg-rose-500'
                      }`}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 技能图谱 */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="aspect-square rounded-2xl overflow-hidden relative group">
            {/* 添加炫酷的渐变背景 */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 
              group-hover:from-blue-600/30 group-hover:via-purple-600/30 group-hover:to-pink-600/30
              transition-all duration-500 backdrop-blur-md"></div>
            
            {/* 添加动态光效 */}
            <div className="absolute inset-0 bg-gradient-conic from-transparent via-white/10 to-transparent 
              animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* SkillGraph 组件 */}
            <div className="relative z-10">
              <SkillGraph />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};