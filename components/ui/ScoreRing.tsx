"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface ScoreRingProps {
  score: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  className,
}: ScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  useEffect(() => {
    let start = 0;
    const end = score;
    if (start === end) return;
    
    let timer: NodeJS.Timeout;
    const animateValue = () => {
      start += 1;
      setAnimatedScore(start);
      if (start < end) {
        timer = setTimeout(animateValue, 15);
      }
    };
    animateValue();
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (s: number) => {
    if (s >= 70) return "text-green shadow-green";
    if (s >= 40) return "text-yellow shadow-yellow";
    return "text-red shadow-red";
  };

  const colorClass = getColor(score);

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-surface fill-none"
          strokeWidth={strokeWidth}
        />
        {/* Animated progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={cn("fill-none drop-shadow-[0_0_10px_currentColor] transition-colors duration-500", colorClass)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          stroke="currentColor"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-display text-4xl font-bold transition-colors duration-500", colorClass.replace("shadow", "text"))}>
          {animatedScore}
        </span>
      </div>
    </div>
  );
}
