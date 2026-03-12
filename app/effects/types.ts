import type { ComponentType } from "react";

export type EffectDefinition = {
  id: string;
  label: string;
  description: string;
  component: ComponentType;
};
