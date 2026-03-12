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
      const rows = gsap.utils.toArray<HTMLElement>("[data-parallax-row]");

      rows.forEach((row, index) => {
        const direction = index % 2 === 0 ? -1 : 1;

        gsap.fromTo(
          row,
          { xPercent: 10 * direction },
          {
            xPercent: -10 * direction,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              scroller,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, scroller);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={scrollerRef} className="effect-scroll-area">
      <section className="effect-intro">
        <p>Scroll for a text parallax demo</p>
      </section>

      <section className="parallax-track" aria-label="Text parallax lines">
        {PARALLAX_ROWS.map((rowText, index) => (
          <div key={`${rowText}-${index}`} className="parallax-row-shell">
            <p data-parallax-row className="parallax-row-text">
              {rowText}
            </p>
          </div>
        ))}
      </section>

      <section className="effect-outro">
        <p>Thay doi effect o phan select de xem demo khac.</p>
      </section>
    </div>
  );
}
