import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const CARDS = [
  {
    id: 1,
    title: "Mountain",
    color: "bg-emerald-600",
    emoji: "🏔️",
    description:
      "Majestic peaks rising above the clouds, a testament to nature's raw power.",
  },
  {
    id: 2,
    title: "Ocean",
    color: "bg-blue-600",
    emoji: "🌊",
    description:
      "Endless waves crashing against the shore, carrying stories from distant lands.",
  },
  {
    id: 3,
    title: "Forest",
    color: "bg-green-700",
    emoji: "🌲",
    description:
      "Ancient trees standing tall, their whispers echoing through the canopy.",
  },
  {
    id: 4,
    title: "Desert",
    color: "bg-amber-600",
    emoji: "🏜️",
    description:
      "Golden dunes stretching to the horizon, sculpted by the wind.",
  },
  {
    id: 5,
    title: "Aurora",
    color: "bg-violet-600",
    emoji: "🌌",
    description:
      "Nature's light show dancing across the polar sky in vivid colors.",
  },
  {
    id: 6,
    title: "Volcano",
    color: "bg-red-600",
    emoji: "🌋",
    description:
      "Earth's fiery heart breaking through the surface with unstoppable force.",
  },
];

export function FlipEffect() {
  const [selected, setSelected] = useState<number | null>(null);
  const [layout, setLayout] = useState<"grid" | "row">("grid");

  const flipState = useRef<Flip.FlipState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate after React updates the DOM
  useLayoutEffect(() => {
    if (!flipState.current) return;

    Flip.from(flipState.current, {
      duration: 0.7,
      ease: "power2.inOut",
      absolute: true,
      nested: true,
      scale: true,
      prune: true,
    });

    // Fade in selected content
    if (selected) {
      const detail = containerRef.current?.querySelector(
        `[data-id="${selected}"] .card-detail`
      );

      if (detail) {
        gsap.fromTo(
          detail,
          {
            opacity: 0,
            y: 16,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            delay: 0.15,
            ease: "power2.out",
          }
        );
      }
    }

    flipState.current = null;
  }, [selected, layout]);

  const handleSelect = (id: number) => {
    flipState.current = Flip.getState(".flip-card");

    setSelected((prev) => (prev === id ? null : id));
  };

  const handleLayoutToggle = () => {
    flipState.current = Flip.getState(".flip-card");

    setLayout((prev) => (prev === "grid" ? "row" : "grid"));
  };

  return (
    <div className="min-h-screen bg-neutral-950 p-8 flex flex-col items-center gap-8">
      <h2 className="text-3xl font-bold text-white">
        GSAP Flip Demo
      </h2>

      <button
        onClick={handleLayoutToggle}
        className="rounded-full bg-white px-6 py-3 font-semibold text-black cursor-pointer"
      >
        Toggle {layout === "grid" ? "Row" : "Grid"}
      </button>

      <div
        ref={containerRef}
        className={`w-full max-w-5xl ${
          layout === "grid"
            ? "grid grid-cols-3 gap-5"
            : "flex flex-col gap-5"
        }`}
      >
        {CARDS.map((card) => {
          const isSelected = selected === card.id;

          return (
            <div
              key={card.id}
              data-id={card.id}
              onClick={() => handleSelect(card.id)}
              className={`flip-card ${card.color}
                rounded-2xl
                overflow-hidden
                cursor-pointer
                shadow-lg`}
            >
              <div className="p-6 text-white">
                <div className="text-5xl">{card.emoji}</div>

                <h3 className="mt-3 text-xl font-bold">
                  {card.title}
                </h3>

                <div
                  className="card-detail overflow-hidden"
                  style={{
                    maxHeight: isSelected ? 120 : 0,
                    opacity: isSelected ? 1 : 0,
                  }}
                >
                  <p className="mt-3 text-sm leading-6">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-neutral-500">
        Click card to expand • Toggle layout to see Flip
      </p>
    </div>
  );
}