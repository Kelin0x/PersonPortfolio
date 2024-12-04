"use client";
import { motion, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffect = ({ words }: { words: { text: string; className?: string; }[] }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate("span", { opacity: 1 }, { duration: 2, delay: stagger(0.2) });
  }, [animate]);

  return (
    <motion.div ref={scope} className="font-bold">
      <div className="text-4xl leading-snug tracking-tight">
        {words.map((word, idx) => (
          <motion.span initial={{ opacity: 0 }} key={word.text + idx} className={`inline-block ${word.className}`}>
            {word.text}{" "}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};