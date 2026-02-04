import { usePreferencesStore } from "@/store/use-preferences-store";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export default function ShadowControls() {
  const shadowEnabled = usePreferencesStore((state) => state.shadowEnabled);
  const shadowX = usePreferencesStore((state) => state.shadowX);
  const shadowY = usePreferencesStore((state) => state.shadowY);
  const shadowBlur = usePreferencesStore((state) => state.shadowBlur);
  const shadowSpread = usePreferencesStore((state) => state.shadowSpread);
  const shadowOpacity = usePreferencesStore((state) => state.shadowOpacity);
  const shadowColor = usePreferencesStore((state) => state.shadowColor);

  const setShadowEnabled = usePreferencesStore(
    (state) => state.setShadowEnabled
  );
  const setShadowX = usePreferencesStore((state) => state.setShadowX);
  const setShadowY = usePreferencesStore((state) => state.setShadowY);
  const setShadowBlur = usePreferencesStore((state) => state.setShadowBlur);
  const setShadowSpread = usePreferencesStore(
    (state) => state.setShadowSpread
  );
  const setShadowOpacity = usePreferencesStore(
    (state) => state.setShadowOpacity
  );
  const setShadowColor = usePreferencesStore(
    (state) => state.setShadowColor
  );

  return (
    <div>
      <Label className="text-xs font-medium mb-2 block">Shadow</Label>
      <div className="flex items-center gap-3 mb-3">
        <Switch
          checked={shadowEnabled}
          onCheckedChange={(checked) => setShadowEnabled(checked)}
        />
        <span className="text-xs text-neutral-400">
          {shadowEnabled ? "Enabled" : "Disabled"}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <Label className="text-[10px] font-medium mb-1 block">
            X Offset: {shadowX}px
          </Label>
          <Slider
            value={[shadowX]}
            onValueChange={([value]) => setShadowX(value)}
            min={-40}
            max={40}
            step={1}
            className="w-44"
          />
        </div>

        <div>
          <Label className="text-[10px] font-medium mb-1 block">
            Y Offset: {shadowY}px
          </Label>
          <Slider
            value={[shadowY]}
            onValueChange={([value]) => setShadowY(value)}
            min={-40}
            max={40}
            step={1}
            className="w-44"
          />
        </div>

        <div>
          <Label className="text-[10px] font-medium mb-1 block">
            Blur: {shadowBlur}px
          </Label>
          <Slider
            value={[shadowBlur]}
            onValueChange={([value]) => setShadowBlur(value)}
            min={0}
            max={80}
            step={1}
            className="w-44"
          />
        </div>

        <div>
          <Label className="text-[10px] font-medium mb-1 block">
            Spread: {shadowSpread}px
          </Label>
          <Slider
            value={[shadowSpread]}
            onValueChange={([value]) => setShadowSpread(value)}
            min={-20}
            max={40}
            step={1}
            className="w-44"
          />
        </div>

        <div>
          <Label className="text-[10px] font-medium mb-1 block">
            Opacity: {shadowOpacity}%
          </Label>
          <Slider
            value={[shadowOpacity]}
            onValueChange={([value]) => setShadowOpacity(value)}
            min={0}
            max={100}
            step={5}
            className="w-44"
          />
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="color"
            value={shadowColor}
            onChange={(event) => setShadowColor(event.target.value)}
            className="w-12 h-8 p-1 bg-transparent border-neutral-700 cursor-pointer"
          />
          <Input
            type="text"
            value={shadowColor}
            onChange={(event) => setShadowColor(event.target.value)}
            className="w-24 h-8 text-xs bg-transparent border-neutral-700"
            placeholder="#000000"
          />
        </div>
      </div>
    </div>
  );
}
