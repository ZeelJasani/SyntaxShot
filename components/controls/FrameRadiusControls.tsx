import { usePreferencesStore } from "@/store/use-preferences-store";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const presets = {
  sharp: 0,
  soft: 8,
  card: 16,
  round: 24,
  pill: 999,
} as const;

export default function FrameRadiusControls() {
  const frameRadius = usePreferencesStore((state) => state.frameRadius);
  const frameRadiusPreset = usePreferencesStore(
    (state) => state.frameRadiusPreset
  );
  const setFrameRadius = usePreferencesStore((state) => state.setFrameRadius);
  const setFrameRadiusPreset = usePreferencesStore(
    (state) => state.setFrameRadiusPreset
  );

  const handlePresetChange = (
    preset: "sharp" | "soft" | "card" | "round" | "pill" | "custom"
  ) => {
    setFrameRadiusPreset(preset);
    if (preset !== "custom") {
      setFrameRadius(presets[preset]);
    }
  };

  return (
    <div>
      <Label className="text-xs font-medium mb-2 block">
        Radius: {frameRadius}px
      </Label>
      <Select
        value={frameRadiusPreset}
        onValueChange={(value) =>
          handlePresetChange(
            value as "sharp" | "soft" | "card" | "round" | "pill" | "custom"
          )
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Preset" />
        </SelectTrigger>
        <SelectContent className="bg-white/95 text-neutral-900 border-neutral-200 shadow-lg">
          <SelectItem value="sharp">Sharp</SelectItem>
          <SelectItem value="soft">Soft</SelectItem>
          <SelectItem value="card">Card</SelectItem>
          <SelectItem value="round">Round</SelectItem>
          <SelectItem value="pill">Pill</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
      <Slider
        value={[frameRadius]}
        onValueChange={([value]) => {
          setFrameRadius(value);
          setFrameRadiusPreset("custom");
        }}
        min={0}
        max={64}
        step={1}
        className="w-40 mt-4"
      />
    </div>
  );
}
