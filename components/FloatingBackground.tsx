"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const OTHER_EMOJIS = [
  "🍉", // Watermelon
  "🥝", // Kiwi (Golden)
  "🍫", // Dark Chocolate
  "🧣", // Scarves
  "💃", // Dance
  "🍮", // Creme Brulee
  "☕", // Tea (Coffee emoji looks more like black tea)
];

const HEART_EMOJIS = [
  "💜", // Purple Heart
  "💕", // Sparkle Heart
  "🤍", // White Heart
];

interface FloatingItem {
  id: number;
  emoji: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  scale: number;
}

export default function FloatingBackground() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    // Generate random items client-side to avoid hydration mismatch
    const newItems = Array.from({ length: 20 }).map((_, i) => {
      // 15% chance for a heart, 85% chance for other emoji
      const isHeart = Math.random() < 0.15;
      const sourceArray = isHeart ? HEART_EMOJIS : OTHER_EMOJIS;
      const emoji = sourceArray[Math.floor(Math.random() * sourceArray.length)];

      return {
        id: i,
        emoji: emoji,
        x: Math.random() * 100, // vw
        y: Math.random() * 100, // vh
        duration: 15 + Math.random() * 20, // 15-35s float
        delay: Math.random() * -20, // Start at different times
        scale: 0.5 + Math.random() * 0.5, // 0.5 - 1.0 scale
      };
    });
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-4xl"
          initial={{ x: `${item.x}vw`, y: "110vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 1, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
          style={{
            left: 0,
            scale: item.scale,
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}
