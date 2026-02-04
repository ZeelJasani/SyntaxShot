import { usePreferencesStore } from "@/store/use-preferences-store";
import { Switch } from "../ui/switch";

export default function ShowFileNameSwitch() {
  const showImageFileName = usePreferencesStore(
    (state) => state.showImageFileName
  );
  const setShowImageFileName = usePreferencesStore(
    (state) => state.setShowImageFileName
  );

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Show File Name
      </label>
      <Switch
        checked={showImageFileName}
        onCheckedChange={(checked) => setShowImageFileName(checked)}
        className="my-1.5"
      />
    </div>
  );
}
