import { DirectionalHover } from "./demos/direction-hover";
import { MenuGradientOne } from "./demos/menu-gradient-1";
import { MenuHover } from "./demos/menu-hover";
import { PageLoadingOne } from "./demos/page-loading-1";
import { PageLoadingTwo } from "./demos/page-loading-2";
import { PageLoadingThree } from "./demos/page-loading-3";
import { PageLoadingFour } from "./demos/page-loading-4";
import PageLoadingFive from "./demos/page-loading-5";
import { PageLoadingSix } from "./demos/page-loading-6";
import { ParallaxFooter } from "./demos/parallax-footer";
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
  {
    id: "parallax-footer",
    label: "Parallax Footer",
    description: "Parallax chu theo cuon trang voi GSAP ScrollTrigger",
    component: ParallaxFooter,
  },
  {
    id: "page-loading-1",
    label: "Page Loading 1",
    description: "Loading animation for the page",
    component: PageLoadingOne,
  },
  {
    id: "page-loading-2",
    label: "Page Loading 2",
    description: "Awwwards inspired cinematic page loading sequence",
    component: PageLoadingTwo,
  },
  {
    id: "page-loading-3",
    label: "Page Loading 3",
    description: "Circular Iris & Infinite Typography Portal",
    component: PageLoadingThree,
  },
  {
    id: "page-loading-4",
    label: "Page Loading 4",
    description: "Sequential Image Stack & Immersive Full-Screen Zoom",
    component: PageLoadingFour,
  },
  {
    id: "page-loading-5",
    label: "Page Loading 5",
    description: "Aesthetic Image Carousel Loader",
    component: PageLoadingFive,
  },
  {
    id: "page-loading-6",
    label: "Page Loading 6",
    description: "Dragon breath flame loader",
    component: PageLoadingSix,
  },
];
