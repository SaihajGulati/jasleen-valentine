"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Function to move the 'No' button
  const moveNoButton = () => {
    const x = Math.random() * 200 - 100; // -100 to 100
    const y = Math.random() * 200 - 100; // -100 to 100
    setNoBtnPosition({ x, y });
    setIsHovered(true);
  };

  const handleYesClick = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#6B3FA0", "#ffffff"], // Royal Purple & White
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#6B3FA0", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    setTimeout(() => {
      router.push("/schedule");
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="max-w-xl w-full text-center space-y-8 relative overflow-hidden">
        <div className="space-y-4 flex flex-col items-center">
          <div className="w-32 h-32 relative mb-4">
            <Image
              src="/cute_pineapple_transparent.png"
              alt="Cute Pineapple"
              fill
              className="object-contain mix-blend-multiply"
              priority
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-black lowercase drop-shadow-sm">
            jasleen will you be my valentine?
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center h-24 relative">
          <Button
            size="lg"
            onClick={handleYesClick}
            className="px-12 py-6 text-2xl font-bold bg-[#6B3FA0] hover:bg-[#553280] shadow-[#6B3FA0]/30 z-10 transform hover:scale-110 transition-all text-white"
          >
            YES
          </Button>

          <motion.div
            animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onHoverStart={moveNoButton}
            onClick={moveNoButton}
            className="absolute md:static z-20"
          >
            <Button
              variant="secondary"
              size="sm"
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 border-gray-300 border"
            >
              No
            </Button>
          </motion.div>
        </div>
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-xs text-gray-400">try to press on the no i dare you</p>
        </div>
      </Card>
    </div>
  );
}
