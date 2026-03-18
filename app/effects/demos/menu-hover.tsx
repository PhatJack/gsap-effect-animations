import React, { useEffect, useRef } from "react";
import { useAnimate, motion } from "motion/react";

const MenuItem = ({ children }: { children: string }) => {
  const [scope, animate] = useAnimate();
  const outer = useRef<HTMLDivElement>(null);

  const animateIn = async (e: React.MouseEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const direction = e.clientY < bounds.top + bounds.height / 2 ? -1 : 1;

    // Reset the black bar position instantly based on mouse entry
    await animate(outer.current, { y: `${direction * 100}%` }, { duration: 0 });

    // Slide the black bar in
    animate(outer.current, { y: "0%" }, { duration: 0.35 });
  };

  const animateOut = (e: React.MouseEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const direction = e.clientY < bounds.top + bounds.height / 2 ? -1 : 1;

    // Slide the black bar out
    animate(outer.current, { y: `${direction * 100}%` }, { duration: 0.35 });
  }

  return (
    <div
      ref={scope}
      className="relative overflow-hidden border-b border-black cursor-pointer group"
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      {/* 1. STATIC BOTTOM LAYER (Black text) */}
      <div className="p-6 text-6xl uppercase font-bold text-black">
        {children}
      </div>

      {/* 2. SLIDING TOP LAYER (Black background + White scrolling text) */}
      <div
        ref={outer}
        className="absolute inset-0 bg-black z-10 overflow-hidden pointer-events-none"
        style={{ transform: "translateY(100%)" }} // Initial state
      >
        <motion.div
          // ref={inner}
          className="flex items-center h-full whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 10, // Slower is usually smoother for long text
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Wrap the text in a single div and duplicate that div once */}
          <div className="flex gap-4 shrink-0 w-max">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="text-white text-6xl uppercase font-bold inline-flex gap-4"
              >
                <span>{children}</span>
                <span>{"--"}</span>
              </span>
            ))}
          </div>

          {/* The Duplicate: This makes the loop seamless */}
          <div className="flex gap-4 shrink-0 w-max">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="text-white text-6xl uppercase font-bold flex gap-4"
              >
                <span>{children}</span>
                <span>{"--"}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export function MenuHover() {
  return (
    <div className="flex flex-col w-full">
      <MenuItem>Home</MenuItem>
      <MenuItem>About</MenuItem>
      <MenuItem>Services</MenuItem>
      <MenuItem>Contact</MenuItem>
    </div>
  );
}
