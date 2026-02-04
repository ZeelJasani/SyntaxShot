import { usePreferencesStore } from "@/store/use-preferences-store";
import { Switch } from "../ui/switch";

export default function LineNumbersSwitch() {
  const showLineNumbers = usePreferencesStore(
    (state) => state.showLineNumbers
  );
  const setShowLineNumbers = usePreferencesStore(
    (state) => state.setShowLineNumbers
  );

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Line Numbers
      </label>
      <Switch
        checked={showLineNumbers}
        onCheckedChange={(checked) => setShowLineNumbers(checked)}
        className="my-1.5"
      />
    </div>
  );
}
