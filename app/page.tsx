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

import { ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen, Settings } from "lucide-react";

function App() {
  const [width, setWidth] = useState("auto");
  const [showWidth, setShowWidth] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const theme = usePreferencesStore((state) => state.theme);
  const padding = usePreferencesStore((state) => state.padding);
  const fontStyle = usePreferencesStore((state) => state.fontStyle);
  const showBackground = usePreferencesStore((state) => state.showBackground);
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
    <main className="dark min-h-screen flex bg-neutral-950 text-white font-sans selection:bg-neutral-800 relative overflow-hidden">
      <link
        rel="stylesheet"
        href={themes[theme as keyof typeof themes].theme}
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fonts[fontStyle as keyof typeof fonts].src}
        crossOrigin="anonymous"
      />

      {/* Center Workspace */}
      <div
        className={cn(
          "flex-1 min-h-screen flex flex-col items-center justify-center p-8 relative transition-all duration-300 ease-in-out",
          isSidebarOpen ? "lg:pl-[340px]" : "pl-8" // Push content on desktop
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
                "overflow-hidden mb-2 transition-all ease-out",
                showBackground
                  ? themes[theme as keyof typeof themes].background
                  : ""
              )}
              style={{ padding }}
              ref={editorRef}
            >
              {!imageUrl ? <CodeEditor /> : <ImageCanvas />}
            </div>
            <WidthMeasurement showWidth={showWidth} width={Number(width)} />
            <div
              className={cn(
                "transition-opacity w-fit mx-auto -mt-4",
                showWidth || width === "auto"
                  ? "invisible opacity-0 hidden"
                  : "visible opacity-100"
              )}
            >
              <Button
                size="sm"
                onClick={() => setWidth("auto")}
                variant="ghost"
                className="text-muted-foreground hover:text-white"
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
          "fixed top-4 left-4 z-30 transition-all duration-300",
          isSidebarOpen ? "opacity-0 invisible -translate-x-full" : "opacity-100 visible translate-x-0"
        )}
      >
        <Button
          variant="outline"
          size="icon"
          className="bg-neutral-900 border-neutral-800 shadow-md hover:bg-neutral-800"
          onClick={() => setIsSidebarOpen(true)}
        >
          <PanelLeftOpen className="h-4 w-4" />
        </Button>
      </div>

      {/* Left Sidebar Controls */}
      <aside
        className={cn(
          "w-[320px] bg-neutral-900 border-r border-neutral-800 flex flex-col h-screen fixed top-0 left-0 z-20 shadow-2xl overflow-hidden transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-900 shrink-0 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <img src="/CodeCanvas.png" alt="CodeCanvas Logo" className="h-6 w-6 rounded-sm shadow-sm" />
              <h1 className="font-bold text-base tracking-tight">CodeCanvas</h1>
            </div>
            <p className="text-[10px] text-neutral-500 font-medium">
              Create beautiful snippets
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-neutral-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>

        {/* Controls Content - Scrollable but hidden scrollbar */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-5">
          {/* Content Section */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              Content
            </h3>
            <div className="space-y-3">
              <ImageUploader />
              {!imageUrl && <LanguageSelect />}
            </div>
          </div>

          <div className="h-px bg-neutral-800" />

          {/* Style Section */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              Style
            </h3>
            <div className="space-y-3">
              <ThemeSelect />
              <div className="grid grid-cols-2 gap-2">
                <BackgroundSwitch />
                <DarkModeSwitch />
              </div>
            </div>
          </div>

          <div className="h-px bg-neutral-800" />

          {/* Code Properties Section */}
          {!imageUrl && (
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                Typography
              </h3>
              <div className="space-y-3">
                <FontSelect />
                <FontSizeInput />
              </div>
              <div className="h-px bg-neutral-800 my-3" />
            </div>
          )}

          {/* Image Properties Section */}
          {!!imageUrl && (
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                Image
              </h3>
              <ImageObjectFitSelect />
              <div className="h-px bg-neutral-800 my-3" />
            </div>
          )}

          {/* Window Section */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              Window
            </h3>
            <div className="space-y-3">
              <WindowControlSelect />
              <div className="grid grid-cols-2 gap-2">
                <WindowThemeSwitch />
                <WindowScaleSlider />
              </div>
            </div>
          </div>

          <div className="h-px bg-neutral-800" />

          {/* Frame Section */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
              Frame
            </h3>
            <div className="space-y-3">
              <PaddingSlider />
              <FrameWidthSlider />
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900 shrink-0">
          <ExportOptions
            targetRef={editorRef as unknown as React.RefObject<HTMLDivElement>}
          />
        </div>
      </aside>
    </main>
  );
}

export default App;
