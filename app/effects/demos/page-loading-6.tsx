import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const PageLoadingSix = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const burnHolePathRef = useRef<SVGPathElement>(null);
  const burnEdgePathRef = useRef<SVGPathElement>(null);
  const jitterPhasesRef = useRef<number[]>([]);

  useGSAP(
    () => {
      const overlayEl = overlayRef.current;
      const holePathEl = burnHolePathRef.current;
      const edgePathEl = burnEdgePathRef.current;

      if (!overlayEl || !holePathEl || !edgePathEl) return;

      document.body.style.overflow = "hidden";

      const VIEW_W = 100;
      const VIEW_H = 100;
      const CX = VIEW_W / 2;
      const CY = VIEW_H / 2;
      const POINTS = 90;

      if (jitterPhasesRef.current.length !== POINTS) {
        jitterPhasesRef.current = Array.from({ length: POINTS }, () =>
          Math.random() * Math.PI * 2
        );
      }

      const startRadius = 6;
      const endRadius = 72;

      const makeBurnPath = (
        progress: number,
        t: number,
        edge = false,
      ) => {
        const base = startRadius + (endRadius - startRadius) * progress;
        const rx = base * (1.03 + 0.06 * Math.sin(t * 0.9));
        const ry = base * (0.98 + 0.08 * Math.cos(t * 0.7));

        const jitterAmp = (edge ? 0.55 : 0.35) * (0.12 + progress * 0.88);
        const crackBoost = edge ? 0.08 : 0.04;

        let d = "";
        for (let i = 0; i <= POINTS; i += 1) {
          const idx = i === POINTS ? 0 : i;
          const a = (idx / POINTS) * Math.PI * 2;
          const phase = jitterPhasesRef.current[idx] ?? 0;

          const noise =
            Math.sin(a * 7 + phase + t * 5) +
            Math.cos(a * 11 - phase - t * 3);
          const noiseNorm = noise / 2; // approx [-1, 1]

          const crack = Math.max(
            0,
            Math.sin(a * 13 + phase + t * 9),
          );

          const extra = crackBoost * crack * (1 - progress * 0.35);
          const r = (edge ? base * (1.02 + extra) : base) * (1 + jitterAmp * noiseNorm);

          const x = CX + Math.cos(a) * r * (rx / base);
          const y = CY + Math.sin(a) * r * (ry / base);
          d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
        }
        return d + " Z";
      };

      gsap.set(edgePathEl, { opacity: 0 });
      holePathEl.setAttribute("d", makeBurnPath(0, 0, false));
      edgePathEl.setAttribute("d", makeBurnPath(0, 0, true));

      const burn = { progress: 0 };
      const startMs = performance.now();

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          overlayEl.style.pointerEvents = "none";
        },
      });

      tl.to(burn, {
        progress: 1,
        duration: 1.25,
        ease: "expo.inOut",
        onUpdate: () => {
          const t = (performance.now() - startMs) / 1000;
          const p = burn.progress;

          holePathEl.setAttribute("d", makeBurnPath(p, t, false));
          edgePathEl.setAttribute("d", makeBurnPath(p, t, true));

          // Fade edge sparkles as the burn finishes.
          const edgeOpacity = Math.max(
            0,
            Math.min(1, (p < 0.85 ? 1 : 0) * (p / 0.35)),
          );
          edgePathEl.style.opacity = String(edgeOpacity);
        },
      });

      tl.fromTo(
        ".pl6-content",
        { opacity: 1, y: 24, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
        },
        0,
      );

      tl.to(
        ".pl6-hint",
        { opacity: 0, y: -10, duration: 0.35, ease: "power2.out" },
        0.55,
      );

      tl.to(
        overlayEl,
        { opacity: 0, duration: 0.25, ease: "power2.out" },
        1.0,
      );

      return () => {
        tl.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="relative h-[calc(100vh-4rem)] overflow-hidden bg-[#f8f4ed] text-[#10100e]"
    >
      {/* Fake Page Content to reveal */}
      <div className="pl6-content relative z-10 flex h-full w-full items-center justify-center p-10 opacity-100">
        <div className="max-w-2xl text-center">
          <div className="text-xs font-medium uppercase tracking-[0.4em] text-[#2f2f2b]/60">
            Page Loading 6
          </div>
          <h1 className="mt-4 text-5xl font-black uppercase tracking-tighter md:text-7xl">
            Burning Paper
          </h1>
          <p className="mt-6 text-lg text-[#2f2f2b]/70 leading-relaxed">
            A burn-away transition that reveals the content behind using SVG masking
            driven by GSAP.
          </p>
        </div>
      </div>

      {/* Loader Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center text-white"
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "rotate(-0.4deg) scale(1.02)", filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.45))" }}
        >
          <defs>
            <linearGradient id="paperGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f7f1e3" />
              <stop offset="60%" stopColor="#efe6d3" />
              <stop offset="100%" stopColor="#d8c7a5" />
            </linearGradient>

            <filter id="paperTexture" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="3"
                seed="4"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="1.8"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            <linearGradient id="charStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffd36b" />
              <stop offset="45%" stopColor="#ff6a2b" />
              <stop offset="100%" stopColor="#140500" />
            </linearGradient>

            <filter id="edgeGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <mask id="burnMask" maskUnits="userSpaceOnUse">
              <rect x="0" y="0" width="100" height="100" fill="white" />
              <path ref={burnHolePathRef} d="M 50 50 Z" fill="black" />
            </mask>
          </defs>

          {/* Paper overlay, with the animated hole cut out */}
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="url(#paperGradient)"
            filter="url(#paperTexture)"
            mask="url(#burnMask)"
          />

          {/* Burning edge ring */}
          <path
            ref={burnEdgePathRef}
            d="M 50 50 Z"
            fill="none"
            stroke="url(#charStroke)"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0"
            filter="url(#edgeGlow)"
          />
        </svg>

        <div className="pl6-hint absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-xs font-medium uppercase tracking-[0.35em] text-white/60">
          Burning paper...
        </div>
      </div>
    </div>
  );
};

export { PageLoadingSix };

