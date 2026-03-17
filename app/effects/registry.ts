import { MenuHover } from "./demos/menu-hover";
import { TextParallaxEffect } from "./demos/text-parallax";
import type { EffectDefinition } from "./types";

export const effectRegistry: EffectDefinition[] = [
  {
    id: "text-parallax",
    label: "Text Parallax",
    description: "Parallax chu theo cuon trang voi GSAP ScrollTrigger",
    component: TextParallaxEffect,
  },
  {
    id: "menu-hover",
    label: "Menu Hover",
    description: "Hover chu vao menu de thay hieu ung GSAP",
    component: MenuHover,
  },
];
