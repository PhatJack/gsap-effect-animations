import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import Shuffle from "~/components/shuffleText";
import GradientText from "~/components/gradientText";
import { useNavigate } from "react-router";
import { effectRegistry } from "~/effects/registry";
const Header = () => {
  const navigate = useNavigate();
  const [selectedEffectId, setSelectedEffectId] = useState("demo");

  const handleValueChange = (value: string) => {
    setSelectedEffectId(value);
    navigate(`/demos/${value}`);
  };

  return (
    <header className="flex items-center justify-between gap-4 p-4 bg-black h-16">
      <div className="">
        <GradientText
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          animationSpeed={8}
          className="font-bold text-xl"
        >
          JACK PHÁT
        </GradientText>
      </div>

      <Select value={selectedEffectId} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select effect" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key="demo" value="demo">
            All Demo
          </SelectItem>
          {effectRegistry.map((effect) => (
            <SelectItem key={effect.id} value={effect.id}>
              {effect.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-4"></div>
    </header>
  );
};

export default Header;
