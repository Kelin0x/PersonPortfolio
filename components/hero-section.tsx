"use client";
import { Card3D } from "./3d-card";
import { BackgroundBeams } from "./background-beams";
import { OrbitingCircles } from "./orbiting-circles";
import { NavBar } from "./nav-bar";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-blue-50 to-purple-50">
      {/* 导航栏 */}
      <NavBar />

      {/* 背景图片层 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[800px] h-[600px] -left-40 top-20 rotate-[-8deg] opacity-40">
          <Image
            src="/background.jpg"
            alt="Background"
            fill
            className="object-cover rounded-3xl shadow-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-transparent rounded-3xl" />
        </div>
        
        <div className="absolute w-[800px] h-[600px] -right-40 bottom-20 rotate-[8deg] opacity-40">
          <Image
            src="/background2.jpg"
            alt="Background"
            fill
            className="object-cover rounded-3xl shadow-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-white/80 via-transparent to-transparent rounded-3xl" />
        </div>
      </div>

      {/* 背景装饰效果 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <BackgroundBeams />
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 mt-40">
        {/* 顶部装饰文字 */}
        <div className="text-center mb-12">
          <h2 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            FULL STACK DEVELOPER
          </h2>
        </div>

        {/* 3D卡片 */}
        <Card3D>
          <div className="relative w-full">
            <OrbitingCircles />
          </div>
        </Card3D>
      </div>
    </div>
  );
};