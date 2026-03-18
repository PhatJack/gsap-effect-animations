import { DirectionalHover } from "./demos/direction-hover";
import { MenuGradientOne } from "./demos/menu-gradient-1";
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
  {
    id: "direction-hover",
    label: "Direction Hover",
    description:
      "Hover chu vao mot div de thay hieu ung GSAP theo huong chu di vao",
    component: DirectionalHover,
  },
  {
    id: "menu-gradient-1",
    label: "Menu Gradient 1",
    description: "Hover chu vao menu de thay hieu ung gradient GSAP",
    component: MenuGradientOne,
  },
];
