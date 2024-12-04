import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kling-zero's portfolio",
  description: "Kling-zero portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* 网站全局背景 */}
        <div className="fixed inset-0 z-[-1]">
          {/* 渐变背景 */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/80 to-purple-50/90" />
          
          {/* 背景图片层 */}
          <div className="absolute inset-0">
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

          {/* 装饰性模糊效果 */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-[128px]" />
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}
