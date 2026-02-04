"use client";

import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { usePreferencesStore } from "@/store/use-preferences-store";
import { fonts } from "@/options";
import { themes } from "@/options";
import { cn } from "@/lib/utils";
import CodeEditor from "@/components/CodeEditor";
import ImageCanvas from "@/components/ImageCanvas";
import WidthMeasurement from "@/components/WidthMeasurement";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Resizable } from "re-resizable";
import ThemeSelect from "@/components/controls/ThemeSelect";
import LanguageSelect from "@/components/controls/LanguageSelect";
import { ResetIcon } from "@radix-ui/react-icons";
import FontSelect from "@/components/controls/FontSelect";
import FontSizeInput from "@/components/controls/FontSizeInput";
import PaddingSlider from "@/components/controls/PaddingSlider";
import BackgroundSwitch from "@/components/controls/BackgroundSwitch";
import DarkModeSwitch from "@/components/controls/DarkModeSwitch";
import ExportOptions from "@/components/controls/ExportOptions";
import ImageUploader from "@/components/controls/ImageUploader";
import WindowControlSelect from "@/components/controls/WindowControlSelect";
import ImageObjectFitSelect from "@/components/controls/ImageObjectFitSelect";
import WindowScaleSlider from "@/components/controls/WindowScaleSlider";
import WindowThemeSwitch from "@/components/controls/WindowThemeSwitch";
import FrameWidthSlider from "@/components/controls/FrameWidthSlider";
import BrowserUrlInput from "@/components/controls/BrowserUrlInput";
import ShowFileNameSwitch from "@/components/controls/ShowFileNameSwitch";
import LineNumbersSwitch from "@/components/controls/LineNumbersSwitch";
import HighlightLinesInput from "@/components/controls/HighlightLinesInput";
import BackgroundPatternSelect from "@/components/controls/BackgroundPatternSelect";
import FrameRadiusControls from "@/components/controls/FrameRadiusControls";
import ShadowControls from "@/components/controls/ShadowControls";
import ExportPresetSelect from "@/components/controls/ExportPresetSelect";
import ImageBorderColorPicker from "@/components/controls/ImageBorderColorPicker";

import { ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen, Settings } from "lucide-react";

function App() {
  const [width, setWidth] = useState("auto");
  const [showWidth, setShowWidth] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const theme = usePreferencesStore((state) => state.theme);
  const padding = usePreferencesStore((state) => state.padding);
  const fontStyle = usePreferencesStore((state) => state.fontStyle);
  const showBackground = usePreferencesStore((state) => state.showBackground);
  const backgroundPattern = usePreferencesStore(
    (state) => state.backgroundPattern
  );
  const canvasMode = usePreferencesStore((state) => state.canvasMode);
  const imageUrl = usePreferencesStore((state) => state.imageUrl);

  const editorRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.size === 0) return;
    const state = Object.fromEntries(queryParams);

    usePreferencesStore.setState({
      ...state,
      code: state.code ? atob(state.code) : "",
      autoDetectLanguage: state.autoDetectLanguage === "true",
      darkMode: state.darkMode === "true",
      fontSize: Number(state.fontSize || 18),
      padding: Number(state.padding || 64),
    });
  }, []);

  // Close sidebar on mobile initially
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  return (
    <main className="min-h-screen flex bg-paper text-[#1c1b19] font-sans selection:bg-[#f2dcc5] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-ink" />
      <link
        rel="stylesheet"
        href={themes[theme as keyof typeof themes].theme}
        crossOrigin="anonymous"
      />
      {fonts[fontStyle as keyof typeof fonts].src && (
        <link
          rel="stylesheet"
          href={fonts[fontStyle as keyof typeof fonts].src}
          crossOrigin="anonymous"
        />
      )}

      {/* Center Workspace */}
      <div
        className={cn(
          "flex-1 min-h-screen flex flex-col items-center justify-center px-10 py-16 relative transition-all duration-300 ease-in-out",
          isSidebarOpen ? "lg:pl-[380px]" : "pl-10"
        )}
      >
        <div className="w-full h-full flex justify-center items-center scrollbar-hide">
          <Resizable
            enable={{ left: true, right: true }}
            minWidth={padding * 2 + 300}
            maxWidth="100%"
            size={{ width }}
            onResize={(e, dir, ref) => setWidth(ref.offsetWidth.toString())}
            onResizeStart={() => setShowWidth(true)}
            onResizeStop={() => setShowWidth(false)}
            className="flex flex-col items-center justify-center"
          >
            <div
              className={cn(
                "overflow-hidden mb-3 transition-all ease-out relative rounded-[32px]",
                showBackground
                  ? themes[theme as keyof typeof themes].background
                  : ""
              )}
              style={{ padding }}
              ref={editorRef}
            >
              {showBackground && backgroundPattern !== "none" && (
                <div
                  className={cn(
                    "absolute inset-0 pointer-events-none opacity-40",
                    backgroundPattern === "dots" && "bg-pattern-dots",
                    backgroundPattern === "grid" && "bg-pattern-grid",
                    backgroundPattern === "diagonal" && "bg-pattern-diagonal"
                  )}
                />
              )}
              <div className="relative z-10">
                {!imageUrl ? <CodeEditor /> : <ImageCanvas />}
              </div>
            </div>
            <WidthMeasurement showWidth={showWidth} width={Number(width)} />
            <div
              className={cn(
                "transition-opacity w-fit mx-auto -mt-2",
                showWidth || width === "auto"
                  ? "invisible opacity-0 hidden"
                  : "visible opacity-100"
              )}
            >
              <Button
                size="sm"
                onClick={() => setWidth("auto")}
                variant="ghost"
                className="text-neutral-600 hover:text-neutral-900"
              >
                <ResetIcon className="mr-2" />
                Reset width
              </Button>
            </div>
          </Resizable>
        </div>
      </div>

      {/* Toggle Button (Floating - Only visible when closed) */}
      <div
        className={cn(
          "fixed top-6 left-6 z-30 transition-all duration-300",
          isSidebarOpen
            ? "opacity-0 invisible -translate-x-full"
            : "opacity-100 visible translate-x-0"
        )}
      >
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 border-neutral-200 shadow-md hover:bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <PanelLeftOpen className="h-4 w-4" />
        </Button>
      </div>

      {/* Left Sidebar Controls */}
      <aside
        className={cn(
          "w-[360px] bg-white/85 backdrop-blur-xl border-r border-neutral-200 flex flex-col h-screen fixed top-0 left-0 z-20 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] overflow-hidden transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="px-5 py-6 border-b border-neutral-200 bg-white/90 shrink-0 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <img
                src="/SyntaxShot.png"
                alt="SyntaxShot Logo"
                className="h-8 w-8 rounded-md shadow-sm"
              />
              <div>
                <h1 className="font-semibold text-lg tracking-tight editorial-heading">
                  SyntaxShot
                </h1>
                <p className="text-[11px] text-neutral-500 uppercase editorial-kicker">
                  Studio
                </p>
              </div>
            </div>
            <p className="text-[12px] text-neutral-500">
              Craft polished code visuals.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-neutral-400 hover:text-neutral-900"
            onClick={() => setIsSidebarOpen(false)}
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>

        {/* Controls Content - Scrollable but hidden scrollbar */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-5">
          {/* Content Section */}
          <div className="space-y-3 rounded-2xl border border-neutral-200/70 bg-white/85 p-4 shadow-sm">
            <h3 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
              Content
            </h3>
            <div className="space-y-3">
              <ImageUploader />
              {!imageUrl && <LanguageSelect />}
              {!!imageUrl && <ShowFileNameSwitch />}
            </div>
          </div>

          {/* Style Section */}
          <div className="space-y-3 rounded-2xl border border-neutral-200/70 bg-white/85 p-4 shadow-sm">
            <h3 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
              Style
            </h3>
            <div className="space-y-3">
              <ThemeSelect />
              <BackgroundPatternSelect />
              <div className="grid grid-cols-2 gap-2">
                <BackgroundSwitch />
                <DarkModeSwitch />
              </div>
            </div>
          </div>

          {/* Code Properties Section */}
          {!imageUrl && (
            <div className="space-y-3 rounded-2xl border border-neutral-200/70 bg-white/85 p-4 shadow-sm">
              <h3 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
                Typography
              </h3>
              <div className="space-y-3">
                <FontSelect />
                <FontSizeInput />
                <div className="grid grid-cols-2 gap-2">
                  <LineNumbersSwitch />
                  <HighlightLinesInput />
                </div>
              </div>
            </div>
          )}

          {/* Image Properties Section */}
          {!!imageUrl && (
            <div className="space-y-3 rounded-2xl border border-neutral-200/70 bg-white/85 p-4 shadow-sm">
              <h3 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
                Image
              </h3>
              <ImageObjectFitSelect />
            </div>
          )}

          {/* Window Section */}
          <div className="space-y-3 rounded-2xl border border-neutral-200/70 bg-white/85 p-4 shadow-sm">
            <h3 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
              Window
            </h3>
            <div className="space-y-3">
              <BrowserUrlInput />
              <WindowControlSelect />
              <div className="grid grid-cols-2 gap-2">
                <WindowThemeSwitch />
                <WindowScaleSlider />
              </div>
            </div>
          </div>

          {/* Frame Section */}
          <div className="space-y-3 rounded-2xl border border-neutral-200/70 bg-white/85 p-4 shadow-sm">
            <h3 className="text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
              Frame
            </h3>
            <div className="space-y-3">
              <PaddingSlider />
              <FrameWidthSlider />
              <ImageBorderColorPicker />
              <FrameRadiusControls />
              <ShadowControls />
              <ExportPresetSelect />
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="p-4 border-t border-neutral-200 bg-white/90 shrink-0">
          <ExportOptions
            targetRef={editorRef as unknown as React.RefObject<HTMLDivElement>}
          />
        </div>
      </aside>
    </main>
  );
}

export default App;
