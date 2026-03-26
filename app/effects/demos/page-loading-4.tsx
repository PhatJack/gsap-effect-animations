import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

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
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
        },
      });

      const total = images.length;

      // Wrap container (parent of images)
      const container = imageRefs.current[0]?.parentElement;

      if (!container) return;

      // Set initial state
      gsap.set(container, {
        y: "0%",
      });

      // Each image takes full screen height
      gsap.set(imageRefs.current, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
      });

      // Animate like vertical carousel
      tl.to(container, {
        y: `-${(total - 1) * 100}%`,
        duration: total * 1.2,
        ease: "power2.inOut",
      });

      // Fade out loader at end
      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          loaderRef.current!.style.display = "none";
        },
      });

      return () => {
        document.body.style.overflow = "";
        tl.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="relative h-[calc(100vh-4rem)] overflow-hidden bg-[#f0f0f0] text-[#111]"
    >
      {/* Fake Page Content to reveal */}
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="max-w-4xl text-center">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-[0.5em] text-black/40">
            Digital Architecture
          </h2>
          <h1 className="text-6xl font-black uppercase tracking-tighter md:text-9xl">
            <span className="block italic">Premium</span>
            <span className="block">Aesthetics</span>
          </h1>
          <p className="mx-auto mt-8 max-w-lg text-lg text-black/60">
            Crafting immersive digital experiences through motion and precision.
            Our approach blends minimalist design with powerful animations.
          </p>
        </div>
      </div>

      {/* Loader Overlay */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
      >
        <div className="relative h-full w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            {images.map((src, index) => (
              <div
                key={index}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                className="flex items-center justify-center h-full w-full"
                style={{
                  position: "absolute",
                  top: `${index * 100}%`, // stack vertically
                }}
              >
                <div className="w-75 h-100 overflow-hidden rounded-xl shadow-xl">
                  <img src={src} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading Text Bottom */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white/20">
          <p className="text-xs font-light uppercase tracking-[1em]">
            Sequence 04 — Loading
          </p>
        </div>
      </div>
    </div>
  );
};

export { PageLoadingFour };
