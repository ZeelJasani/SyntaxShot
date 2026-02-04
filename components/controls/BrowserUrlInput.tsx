import { usePreferencesStore } from "@/store/use-preferences-store";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function BrowserUrlInput() {
    const browserUrl = usePreferencesStore((state) => state.browserUrl);
    const setBrowserUrl = usePreferencesStore((state) => state.setBrowserUrl);
    const windowControlStyle = usePreferencesStore(
        (state) => state.windowControlStyle
    );

    // Only show if macOS style is selected (browser style)
    if (windowControlStyle !== "macos") {
        return null;
    }

    return (
        <div>
            <Label className="block mb-2 text-xs font-medium text-neutral-400">
                Browser URL
            </Label>
            <Input
                value={browserUrl}
                onChange={(e) => setBrowserUrl(e.target.value)}
                className="h-8 bg-neutral-800 border-neutral-700 text-xs"
                placeholder="syntaxshot.vercel.app"
            />
        </div>
    );
}
