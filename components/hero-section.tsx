"use client";
import { Card3D } from "./3d-card";
import { BackgroundBeams } from "./background-beams";
import { NavBar } from "./nav-bar";

export const HeroSection = () => {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* 导航栏 */}
      <NavBar />

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
          </div>
        </Card3D>


      </div>

      {/* 背景光束效果 */}
      <BackgroundBeams />
    </div>
  );
};