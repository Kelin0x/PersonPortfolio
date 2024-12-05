"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const beamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    if (!beamsRef.current) return;

    const moveBeams = (e: MouseEvent) => {
      if (!beamsRef.current) return;
      
      const { clientX, clientY } = e;
      const x = clientX - beamsRef.current.offsetLeft;
      const y = clientY - beamsRef.current.offsetTop;
      
      const keyframes = {
        transform: `translate(${x}px, ${y}px)`,
      };
      
      beamsRef.current.animate(keyframes, {
        duration: 2000,
        fill: "forwards",
        easing: "ease",
      });
    };

    window.addEventListener("mousemove", moveBeams);
    return () => window.removeEventListener("mousemove", moveBeams);
  }, []);

  // 在客户端挂载前不渲染内容
  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={beamsRef}
      className={cn(
        "pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-2xl mix-blend-overlay opacity-30" />
    </div>
  );
}; 