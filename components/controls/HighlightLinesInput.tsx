import { usePreferencesStore } from "@/store/use-preferences-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HighlightLinesInput() {
  const highlightLines = usePreferencesStore((state) => state.highlightLines);
  const setHighlightLines = usePreferencesStore(
    (state) => state.setHighlightLines
  );

  return (
    <div>
      <Label className="text-xs font-medium mb-2 block">Highlight Lines</Label>
      <Input
        value={highlightLines}
        onChange={(event) => setHighlightLines(event.target.value)}
        placeholder="e.g. 2,4-6,10"
        className="w-40 h-8 text-xs bg-transparent border-neutral-700"
      />
    </div>
  );
}
