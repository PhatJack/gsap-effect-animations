import type { Route } from "./+types/home";
import { useMemo, useState } from "react";
import { effectRegistry } from "~/effects/registry";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import Shuffle from "~/components/shuffleText";
import GradientText from "~/components/gradientText";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GSAP Effect Gallery" },
    { name: "description", content: "Collection of GSAP effect demos" },
  ];
}

export default function Home() {
  const [selectedEffectId, setSelectedEffectId] = useState(
    effectRegistry[0].id,
  );

  const selectedEffect = useMemo(
    () =>
      effectRegistry.find((effect) => effect.id === selectedEffectId) ??
      effectRegistry[0],
    [selectedEffectId],
  );

  const SelectedEffectComponent = selectedEffect.component;

  return (
    <main className="h-screen w-full overflow-hidden bg-zinc-200 text-zinc-100">
      <header className="flex items-center justify-between gap-4 bg-zinc-900 p-4 py-4 sm:px-6">
        <div className="">
          <GradientText
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            animationSpeed={8}
            className="font-bold text-xl"
          >
            JACK PHÁT
          </GradientText>
        </div>

        <Select value={selectedEffectId} onValueChange={setSelectedEffectId}>
          <SelectTrigger>
            <SelectValue placeholder="Select effect" />
          </SelectTrigger>
          <SelectContent>
            {effectRegistry.map((effect) => (
              <SelectItem key={effect.id} value={effect.id}>
                {effect.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className=""></div>
      </header>

      <section className="h-[calc(100vh-3rem)] w-full overflow-hidden bg-zinc-100 text-zinc-900">
        <SelectedEffectComponent />
      </section>
    </main>
  );
}
