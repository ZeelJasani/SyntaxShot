import { usePreferencesStore } from "@/store/use-preferences-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function BackgroundPatternSelect() {
  const backgroundPattern = usePreferencesStore(
    (state) => state.backgroundPattern
  );
  const setBackgroundPattern = usePreferencesStore(
    (state) => state.setBackgroundPattern
  );

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Pattern
      </label>
      <Select
        value={backgroundPattern}
        onValueChange={(value) =>
          setBackgroundPattern(
            value as "none" | "dots" | "grid" | "diagonal"
          )
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Pattern" />
        </SelectTrigger>
        <SelectContent className="bg-white/95 text-neutral-900 border-neutral-200 shadow-lg">
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="dots">Dots</SelectItem>
          <SelectItem value="grid">Grid</SelectItem>
          <SelectItem value="diagonal">Diagonal</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
