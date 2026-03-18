import { useAnimate } from "motion/react";
import { useRef, type MouseEvent } from "react";

const DirectionalHoverFix = () => {
  const [scope, animate] = useAnimate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getDirection = (
    e: MouseEvent<HTMLDivElement>,
    element: HTMLElement,
  ): number => {
    const bounds = element.getBoundingClientRect();
    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;

    // Corrected: atan2(y, x) + proper offset for Top=0, Right=1, Bottom=2, Left=3
		const angle = Math.atan2(y, x) * (2 / Math.PI);
    return Math.round((angle + 4)) % 4;
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const direction = getDirection(e, e.currentTarget);
    console.log("Enter direction:", direction); // 0=top, 1=right, 2=bottom, 3=left

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Define start offset based on direction
    let startX = 0;
    let startY = 0;

    switch (direction) {
      case 0: // from top
        startY = -100;
        break;
      case 1: // from right
        startX = 100;
        break;
      case 2: // from bottom
        startY = 100;
        break;
      case 3: // from left
        startX = -100;
        break;
    }

    // Instant jump to start position (off-screen)
    animate(
      overlay,
      { x: `-${startX}%`, y: `-${startY}%` },
      { duration: 0 }
    );

    // Animate in to center
    animate(
      overlay,
      { x: "0%", y: "0%" },
      { duration: 0.4, ease: "easeOut" }
    );
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const direction = getDirection(e, e.currentTarget);
    console.log("Leave direction:", direction);

    const overlay = overlayRef.current;
    if (!overlay) return;

    let endX = 0;
    let endY = 0;

    switch (direction) {
      case 0: // exit to top
        endY = -100;
        break;
      case 1: // exit to right
        endX = 100;
        break;
      case 2: // exit to bottom
        endY = 100;
        break;
      case 3: // exit to left
        endX = -100;
        break;
    }

    animate(
      overlay,
      { x: `${endX}%`, y: `${endY}%` },
      { duration: 0.4, ease: "easeIn" }
    );
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden w-80 h-80 rounded-xl bg-gray-200 mx-auto cursor-pointer"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=800')`,
        backgroundSize: "cover",
      }}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 flex items-center justify-center p-6 text-white text-center pointer-events-none"
        style={{ transformOrigin: "center" }} // optional, helps with transforms
      >
        {/* Your overlay content here */}
        <h3 className="text-xl font-bold">NỘI DUNG MỚI</h3>
      </div>
    </div>
  );
};

export function DirectionalHover() {
  return (
    <div className="h-[calc(100vh-4rem)] flex items-center justify-center ">
      <DirectionalHoverFix />
    </div>
  );
}