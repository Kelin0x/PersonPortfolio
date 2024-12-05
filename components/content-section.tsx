"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { SiGithub, SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiNodedotjs } from "react-icons/si";

export const ContentSection = () => {
    return (
        <div className="py-20 px-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-4xl mx-auto space-y-24" // 增加卡片之间的间距
            >
                {/* 关于我 */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="relative flex flex-col md:flex-row items-center gap-8"
                >
                    <div className="w-full md:w-2/3 bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
                        <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
                            About Me
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            New to Web3, but dreaming big! 🚀 Developer 🧑‍💻 with a product mindset. 
                            Obsessed with turning ideas into reality and making waves in the Web3 ocean. 🌊💻⚡
                        </p>
                    </div>
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg" />
                </motion.div>

                {/* 技术栈 */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="relative flex flex-col md:flex-row-reverse items-center gap-8"
                >
                    <div className="w-full md:w-2/3 bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
                        <h3 className="text-3xl font-bold text-gray-800 mb-6">Tech Stack</h3>
                        <div className="grid grid-cols-3 gap-6">
                            {[SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiNodedotjs].map((Icon, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    className="flex flex-col items-center gap-2 p-4 bg-white/70 rounded-xl"
                                >
                                    <Icon className="w-8 h-8 text-blue-500" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="relative w-48 h-48">
                        <div className="absolute inset-0 bg-blue-200/30 rounded-3xl rotate-6" />
                        <div className="absolute inset-0 bg-purple-200/30 rounded-3xl -rotate-6" />
                    </div>
                </motion.div>

                {/* 项目展示 */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
                        <h3 className="text-3xl font-bold text-gray-800 mb-6">Featured Project</h3>
                        <div className="relative h-64 rounded-2xl overflow-hidden">
                            <Image
                                src="/image.png"
                                alt="Featured Project"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                                <div className="absolute bottom-4 left-4">
                                    <a
                                        href="https://github.com/kling-zero/LiteraSea"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors"
                                    >
                                        <SiGithub className="w-6 h-6" />
                                        <span>View on GitHub</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* GitHub 统计 */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="relative flex flex-col md:flex-row items-center gap-8"
                >
                    <div className="w-full bg-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
                        <h3 className="text-3xl font-bold text-gray-800 mb-6">GitHub Stats</h3>
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { label: "Stars", value: "1.2k" },
                                { label: "Commits", value: "2.5k" },
                                { label: "Repos", value: "45+" }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center p-4 bg-white/70 rounded-xl"
                                >
                                    <div className="text-2xl font-bold text-blue-500">{stat.value}</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}; 