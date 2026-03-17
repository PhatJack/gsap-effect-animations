import React, { useRef } from "react";
import { useAnimate } from "motion/react";

const MenuItem = ({ children }: { children: React.ReactNode }) => {
  const [scope, animate] = useAnimate();
  const outer = useRef<HTMLDivElement>(null);

  const animateIn = async (e: React.MouseEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect();

    const direction = e.clientY < bounds.top + bounds.height / 2 ? -1 : 1;

    await animate(
      outer.current,
      { top: `${direction * 100}%` },
      { duration: 0 },
    );
    animate(".menu-item", { color: "#ffffff" }, { duration: 0.25 });
    animate(outer.current, { top: "0%" }, { duration: 0.35 });
  };

  const animateOut = (e: React.MouseEvent) => {
    const bounds = e.currentTarget.getBoundingClientRect();

    const direction = e.clientY < bounds.top + bounds.height / 2 ? -1 : 1;
    animate(".menu-item", { color: "inherit" }, { duration: 0.25 });
    animate(outer.current, { top: `${direction * 100}%` }, { duration: 0.35 });
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden border-b"
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      <div className="menu-item p-6 text-6xl uppercase relative z-10">
        {children}
      </div>

      <div ref={outer} className="absolute size-full bg-black" />
    </div>
  );
};

export function MenuHover() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col justify-center">
      <MenuItem>Home</MenuItem>
      <MenuItem>About</MenuItem>
      <MenuItem>Services</MenuItem>
      <MenuItem>Contact</MenuItem>
    </div>
  );
}
