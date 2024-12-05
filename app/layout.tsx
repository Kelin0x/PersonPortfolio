import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StaticBackground } from "@/components";

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
        <StaticBackground />
        {children}
      </body>
    </html>
  );
}
