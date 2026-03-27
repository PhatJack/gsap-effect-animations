import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

const images = [
  "/loading/img-1.png",
  "/loading/img-2.png",
  "/loading/img-3.png",
  "/loading/img-4.png",
  "/loading/img-5.png",
];

const PageLoadingFour = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      document.body.style.overflow = "hidden";

      const total = images.length;
      const container = containerRef.current;
      if (!container) return;

      // Center container for rotating as a group
      gsap.set(container, { transformOrigin: "center center" });

      // Phase 1: Jump from any direction (random initial pos)
      gsap.set(imageRefs.current, {
        xPercent: -50,
        yPercent: -50,
        x: () => gsap.utils.random(-window.innerWidth * 1.5, window.innerWidth * 1.5),
        y: () => gsap.utils.random(-window.innerHeight * 1.5, window.innerHeight * 1.5),
        rotation: () => gsap.utils.random(-360, 360),
        scale: 0,
        opacity: 0,
      });

      const tl = gsap.timeline();

      // Gather in the center
      tl.to(imageRefs.current, {
        x: 0,
        y: 0,
        rotation: () => gsap.utils.random(-15, 15),
        scale: 1,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "back.out(1.5)",
      });

      // Phase 2: Move like in a line of a circle
      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.35;

      tl.to(
        imageRefs.current,
        {
          x: (index) => Math.cos((index / total) * Math.PI * 2) * radius,
          y: (index) => Math.sin((index / total) * Math.PI * 2) * radius,
          rotation: (index) => (index / total) * 360 + 90,
          scale: 0.8,
          duration: 1.5,
          stagger: {
            amount: 0.5,
          },
          ease: "expo.inOut",
        },
        "+=0.5"
      );

      // Spin the entire group infinitely
      tl.to(
        container,
        {
          rotation: 360,
          duration: 25,
          ease: "none",
          repeat: -1,
        },
        "<"
      );

      return () => {
        document.body.style.overflow = "";
        tl.kill();
      };
    },
    { scope: rootRef }
  );

  const handleImageClick = contextSafe((index: number) => {
    if (selectedImage !== null) return; // Only allow picking once

    setSelectedImage(index);
    document.body.style.overflow = ""; // restore scrolling

    const container = containerRef.current;
    if (!container) return;

    // Stop current endless rotation
    gsap.killTweensOf(container);

    const currentRot = gsap.getProperty(container, "rotation") as number;

    const tl = gsap.timeline();

    // 1. Move selected to front, others disappear
    imageRefs.current.forEach((el, i) => {
      if (el) el.style.zIndex = i === index ? "50" : "10";

      if (i === index) {
        const isMobile = window.innerWidth < 768;
        const targetX = isMobile ? 0 : -window.innerWidth * 0.2;
        const targetY = isMobile ? -window.innerHeight * 0.2 : 0;

        tl.to(
          el,
          {
            x: targetX,
            y: targetY,
            rotation: -currentRot, // counter the container's rotation so it's upright
            scale: isMobile ? 1.2 : 1.5,
            duration: 1.5,
            ease: "power4.inOut",
          },
          0
        );
      } else {
        tl.to(
          el,
          {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          0
        );
      }
    });

    // 2. Fade out the dark background overlay gently
    tl.to(
      loaderRef.current,
      {
        backgroundColor: "transparent",
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.pointerEvents = "none";
        },
      },
      0
    );

    // Fade out loading text
    tl.to(
      ".loading-text",
      {
        opacity: 0,
        duration: 0.5,
      },
      0
    );

    // 3. Setup and fade in page content
    tl.fromTo(
      ".page-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      },
      0.8
    );
  });

  return (
    <div
      ref={rootRef}
      className="relative h-[calc(100vh-4rem)] overflow-hidden bg-[#e0e0e0] text-[#111]"
    >
      {/* Fake Page Content to reveal */}
      <div className="page-content opacity-0 relative z-10 flex h-full w-full flex-col md:flex-row items-center justify-center md:justify-end p-8 md:pr-32">
        <div className="max-w-xl text-center md:text-left mt-64 md:mt-0">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-[0.5em] text-black/40">
            Selected Work
          </h2>
          <h1 className="text-5xl font-black uppercase tracking-tighter md:text-7xl mb-6">
            <span className="block italic">Interactive</span>
            <span className="block">Showcase</span>
          </h1>
          <p className="mt-8 text-lg text-black/60 leading-relaxed">
            You picked an amazing piece. This flows smoothly from an infinite loader directly into the content state, merging the loading sequence with the core experience.
          </p>
        </div>
      </div>

      {/* Loader Overlay */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
      >
        <div className="relative h-full w-full overflow-hidden" ref={containerRef}>
          {images.map((src, index) => (
            <div
              key={index}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className={`absolute top-1/2 left-1/2 w-48 h-64 sm:w-64 sm:h-80 overflow-hidden rounded-xl shadow-2xl border-4 border-transparent transition-colors duration-300 ${
                selectedImage === null
                  ? "cursor-pointer hover:border-white/80"
                  : selectedImage === index
                  ? "border-white"
                  : ""
              }`}
              onClick={() => handleImageClick(index)}
            >
              <img src={src} className="w-full h-full object-cover pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Loading Text Bottom */}
        <div className="loading-text absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white/40">
          <p className="text-xs font-light uppercase tracking-[0.5em] animate-pulse">
            Select an image
          </p>
        </div>
      </div>
    </div>
  );
};

export { PageLoadingFour };
