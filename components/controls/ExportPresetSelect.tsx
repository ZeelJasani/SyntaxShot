import { usePreferencesStore } from "@/store/use-preferences-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function ExportPresetSelect() {
  const exportPreset = usePreferencesStore((state) => state.exportPreset);
  const setExportPreset = usePreferencesStore((state) => state.setExportPreset);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Export Preset
      </label>
      <Select
        value={exportPreset}
        onValueChange={(value) =>
          setExportPreset(
            value as
              | "none"
              | "square1080"
              | "social1200x628"
              | "widescreen1600x900"
              | "hd1920x1080"
          )
        }
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Preset" />
        </SelectTrigger>
        <SelectContent className="bg-white/95 text-neutral-900 border-neutral-200 shadow-lg">
          <SelectItem value="none">Off</SelectItem>
          <SelectItem value="square1080">1080 x 1080</SelectItem>
          <SelectItem value="social1200x628">1200 x 628</SelectItem>
          <SelectItem value="widescreen1600x900">1600 x 900</SelectItem>
          <SelectItem value="hd1920x1080">1920 x 1080</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
