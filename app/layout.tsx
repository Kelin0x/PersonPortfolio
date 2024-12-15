import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StaticBackground } from "@/components/static-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kelin0x's portfolio",
  description: "Kling-zero portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StaticBackground />
        {children}
      </body>
    </html>
  );
}
