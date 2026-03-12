import { TextParallaxEffect } from "./demos/text-parallax";
import type { EffectDefinition } from "./types";

export const effectRegistry: EffectDefinition[] = [
  {
    id: "text-parallax",
    label: "Text Parallax",
    description: "Parallax chu theo cuon trang voi GSAP ScrollTrigger",
    component: TextParallaxEffect,
  },
];
