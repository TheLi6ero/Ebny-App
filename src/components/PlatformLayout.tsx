import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PlatformLayoutProps {
  children: React.ReactNode;
  themeColor?: string; // لون التطبيق (مثلاً فيروزي للمنصة، أخضر لابني)
}

export const PlatformLayout: React.FC<PlatformLayoutProps> = ({ children, themeColor = '#38bdf8' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-[#0B1120] font-sans" 
      dir="rtl"
      style={{ '--theme-glow': themeColor } as React.CSSProperties}
    >
      {/* 1. الشبكة الخلفية (Grid) */}
      <div 
        className="fixed inset-0 pointer-events-none -z-20 opacity-20 dark:opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 2. دائرة التوهج اللي بتتبع الماوس (Glow Follower) */}
      <motion.div
        className="fixed pointer-events-none -z-10 w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-20"
        animate={{
          x: mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth * 0.2 : 0),
          y: mousePosition.y - (typeof window !== 'undefined' ? window.innerWidth * 0.2 : 0),
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
        style={{ backgroundColor: themeColor }}
      />

      {/* 3. المحتوى الأساسي */}
      <main className="relative z-10 min-h-screen">
        {children}
      </main>
    </div>
  );
};