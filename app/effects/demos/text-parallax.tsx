import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARALLAX_ROWS = [
  "MOTION GRAPHIC MOTION GRAPHIC",
  "SCROLL BASED SCROLL BASED",
  "GSAP PARALLAX GSAP PARALLAX",
  "CREATIVE INTERFACE CREATIVE INTERFACE",
  "ANIMATE EVERYTHING ANIMATE EVERYTHING",
];

export function TextParallaxEffect() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".parallax-item");

      rows.forEach((row, index) => {
        const direction = index % 2 === 0 ? -1 : 1;

        gsap.fromTo(
          row,
          { xPercent: 20 * direction },
          {
            xPercent: -20 * direction,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              scroller,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, scroller);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden">
      <div
        ref={scrollerRef}
        className="h-full overflow-y-auto bg-zinc-100 w-full"
      >
        <section className="grid h-[95svh] place-items-center px-4 text-center text-xl text-zinc-800">
          <p>Scroll for a text parallax demo</p>
        </section>

        <section
          aria-label="Text parallax lines"
          className="grid min-h-[130svh] content-center overflow-hidden bg-zinc-100 py-20"
        >
          {PARALLAX_ROWS.map((rowText, index) => (
            <div
              key={`${rowText}-${index}`}
              className="parallax-item overflow-hidden border-y border-zinc-300/80"
            >
              <p
                data-parallax-row
                className="whitespace-nowrap py-3 text-[clamp(1.75rem,5vw,4rem)] font-semibold tracking-tight text-zinc-900"
              >
                {rowText}
              </p>
            </div>
          ))}
        </section>

        <section className="h-[95svh] px-4"></section>
      </div>
    </div>
  );
}
