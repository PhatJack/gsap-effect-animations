import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const PageLoadingOne = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const numberWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sequence = [0, 25, 50, 75, 100];
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });

    // Animate through each number by sliding the wrapper up
    // Each number div is 1 unit tall (h-[1em] or set via JS)
    // Moving y by -i * (100 / sequence.length)% won't work here;
    // we need pixel/em offsets based on actual rendered height.
    // Best approach: animate to each child's negative offsetTop.

    const wrapper = numberWrapperRef.current;
    if (!wrapper) return;

    const children = wrapper.querySelectorAll<HTMLElement>(".num-item");

    children.forEach((child, i) => {
      if (i === 0) return; // first item starts visible, no need to animate to it initially

      tl.to(
        wrapper,
        {
          y: -child.offsetTop,
          duration: 0.5,
          ease: "power3.inOut",
        },
        i * 0.55,
      );
    });

    // Happy face runs in parallel across the whole loading duration
    tl.to(
      "#happy-face",
      {
        x: "110vw",
        rotate: 360,
        duration: sequence.length * 0.75,
        ease: "power2.inOut",
      },
      0,
    );

    // Loader slides away after a short pause
    tl.to(
      loaderRef.current,
      {
        scaleY: 0,
        borderRadius: 16,
        transformOrigin: "top",
        duration: 0.9,
        ease: "power4.inOut",
      },
      "+=0.2",
    );

    return () => {
      tl.kill();
    };
  }, []);

  const sequence = [0, 25, 50, 75, 100];

  return (
    <>
      <div className="h-[300vh] w-full flex items-center justify-center">
        <p className="text-7xl font-bold uppercase">Hello world</p>
      </div>

      <div
        ref={loaderRef}
        className="fixed inset-0 z-50 overflow-hidden bg-yellow-400"
      >
        <img
          src="/happy-face.png"
          id="happy-face"
          className="absolute -left-44 top-1/2 size-44 -translate-y-1/2"
        />

        <div className="absolute bottom-6 left-6 text-black">
          <p className="text-sm uppercase tracking-widest">Loading</p>
          <div className="flex items-end">
            {/* 
              The wrapper clips to one number height.
              All numbers are stacked vertically inside.
              GSAP slides the wrapper up to reveal each number.
            */}
            <div className="overflow-hidden h-30" style={{ lineHeight: 1 }}>
              <div
                ref={numberWrapperRef}
                className="flex flex-col"
                style={{ willChange: "transform" }}
              >
                {sequence.map((num) => (
                  <span
                    key={num}
                    className="num-item text-9xl font-bold leading-none text-right"
                    style={{ lineHeight: 1 }}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
            <span
              className="text-8xl font-bold leading-none"
              style={{ lineHeight: 1 }}
            >
              %
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export { PageLoadingOne };
