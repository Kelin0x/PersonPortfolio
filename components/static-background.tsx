"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const StaticBackground = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 基础背景结构 - 提高颜色饱和度和透明度
  const baseBackground = (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-100 to-sky-200" />
    </div>
  );

  // 如果还没有挂载到客户端，只返回基础背景
  if (!isMounted) {
    return baseBackground;
  }

  // 客户端渲染的完整背景
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-100 to-sky-200" />
      
      {/* 图片透明度调整 */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[800px] h-[600px] -left-40 top-20 rotate-[-8deg] opacity-60">
            <div className="relative w-full h-full">
              <Image
                src="/background.jpg"
                alt="Background"
                fill
                priority
                sizes="800px"
                className="object-cover rounded-3xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-transparent rounded-3xl" />
            </div>
          </div>
          
          <div className="absolute w-[800px] h-[600px] -right-40 bottom-20 rotate-[8deg] opacity-60">
            <div className="relative w-full h-full">
              <Image
                src="/background2.jpg"
                alt="Background"
                fill
                priority
                sizes="800px"
                className="object-cover rounded-3xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white/80 via-transparent to-transparent rounded-3xl" />
            </div>
          </div>
        </div>
      )}

      {/* 增强光效强度 */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/40 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-300/40 rounded-full blur-[128px]" />
        </div>
      )}
    </div>
  );
}; 