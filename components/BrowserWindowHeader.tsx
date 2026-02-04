import React from "react";
import {
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    Lock,
    Share,
    Plus,
    Copy,
    Sidebar,
    ShieldAlert
} from "lucide-react";
import { usePreferencesStore } from "@/store/use-preferences-store";
import { cn } from "@/lib/utils"; // Assuming cn utility is available here

interface BrowserWindowHeaderProps {
    width: number;
}

const BrowserWindowHeader: React.FC<BrowserWindowHeaderProps> = ({ width }) => {
    const browserUrl = usePreferencesStore((state) => state.browserUrl);
    const setBrowserUrl = usePreferencesStore((state) => state.setBrowserUrl);
    const windowScale = usePreferencesStore((state) => state.windowScale);
    const windowTheme = usePreferencesStore((state) => state.windowTheme);

    // Base size for icons, scaled by windowScale
    const iconSize = 14 * windowScale;
    const inputFontSize = 12 * windowScale;
    const paddingY = 12 * windowScale;
    const paddingX = 16 * windowScale;
    const gap = 16 * windowScale;

    // Theme derived values
    const isDark = windowTheme === 'dark';

    return (
        <div
            className={cn(
                "w-full flex items-center border-b relative transition-colors duration-200",
                isDark ? "bg-[#1E1E1E] border-neutral-700" : "bg-white border-[#D1D1D1]"
            )}
            style={{
                paddingLeft: paddingX,
                paddingRight: paddingX,
                paddingTop: paddingY,
                paddingBottom: paddingY,
                borderTopLeftRadius: "inherit",
                borderTopRightRadius: "inherit"
            }}
        >
            {/* Left Controls: Traffic Lights + Nav */}
            <div className="flex items-center absolute left-0 h-full" style={{ paddingLeft: paddingX + 6, gap: gap }}>
                {/* Traffic Lights */}
                <div className="flex items-center gap-2">
                    <div
                        className="rounded-full bg-[#FF5F56] border border-[#E0443E]/50"
                        style={{ width: 12 * windowScale, height: 12 * windowScale }}
                    />
                    <div
                        className="rounded-full bg-[#FFBD2E] border border-[#DEA123]/50"
                        style={{ width: 12 * windowScale, height: 12 * windowScale }}
                    />
                    <div
                        className="rounded-full bg-[#27C93F] border border-[#1AAB29]/50"
                        style={{ width: 12 * windowScale, height: 12 * windowScale }}
                    />
                </div>

                {/* Sidebar & Nav Icons */}
                <div className={cn("flex items-center gap-5", isDark ? "text-neutral-500" : "text-neutral-400")} style={{ marginLeft: gap }}>
                    <Sidebar size={iconSize} strokeWidth={2} />
                    <div className="flex items-center gap-4">
                        <ChevronLeft size={iconSize} strokeWidth={2.5} />
                        <ChevronRight size={iconSize} strokeWidth={2.5} />
                    </div>
                </div>
            </div>

            {/* Center: Address Bar */}
            <div className="flex-1 flex justify-center items-center w-full px-4" style={{ marginLeft: 180 * windowScale, marginRight: 120 * windowScale }}>
                {/* Shield Icon styling - outside the bar */}
                <div className={cn("mr-3", isDark ? "text-neutral-500" : "text-neutral-400")}>
                    <ShieldAlert size={iconSize} strokeWidth={2} fill="currentColor" className="opacity-50" />
                </div>

                <div className={cn(
                    "w-full max-w-[500px] rounded-md flex items-center relative transition-colors duration-200",
                    isDark ? "bg-[#333333]" : "bg-[#F1F1F1] border border-[#D1D1D1]/50 shadow-sm"
                )}
                    style={{ height: 28 * windowScale }}
                >
                    {/* Centered Content Container */}
                    <div className="w-full flex items-center justify-center relative px-8">
                        {/* Lock icon removed */}

                        {/* Input */}
                        <input
                            value={browserUrl}
                            onChange={(e) => setBrowserUrl(e.target.value)}
                            className={cn(
                                "bg-transparent border-none outline-none text-center font-normal placeholder:text-neutral-400 min-w-[20px]",
                                isDark ? "text-neutral-300" : "text-neutral-600"
                            )}
                            style={{ fontSize: inputFontSize }}
                            placeholder="syntaxshot.vercel.app"
                        />
                    </div>

                    {/* Refresh */}
                    <div className={cn(
                        "absolute right-2 cursor-pointer transition-colors",
                        isDark ? "text-neutral-400 hover:text-neutral-200" : "text-neutral-400 hover:text-neutral-600"
                    )}>
                        <RotateCcw size={10 * windowScale} strokeWidth={2.5} />
                    </div>
                </div>
            </div>

            {/* Right Controls: Share, +, Tabs */}
            <div className={cn("flex items-center absolute right-0 h-full gap-5", isDark ? "text-neutral-500" : "text-neutral-400")} style={{ paddingRight: paddingX }}>
                <Share size={iconSize} strokeWidth={2} />
                <Plus size={iconSize} strokeWidth={2} />
                <Copy size={iconSize} strokeWidth={2} />
            </div>
        </div>
    );
};

export default BrowserWindowHeader;
