import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import GradientText from "~/components/gradientText";
import { useNavigate } from "react-router";
import { effectRegistry } from "~/effects/registry";
import { Separator } from "./ui/separator";
const Header = () => {
  const navigate = useNavigate();
  const [selectedEffectId, setSelectedEffectId] = useState("demo");

  const handleValueChange = (value: string) => {
    setSelectedEffectId(value);
    navigate(`/demos/${value}`);
  };

  return (
    <header className="flex items-center justify-between bg-background h-16 relative">
      <div className="flex items-center justify-between flex-1 p-4">
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
      </div>
      <Separator className="absolute bottom-0" />
    </header>
  );
};

export default Header;
