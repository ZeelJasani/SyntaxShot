import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// export const usePreferencesStore = create(
//   persist(
//     () => ({
//       code: "",
//       title: "Untitled",
//       theme: "hyper",
//       darkMode: true,
//       showBackground: true,
//       language: "plaintext",
//       autoDetectLanguage: false,
//       fontSize: 16,
//       fontStyle: "jetBrainsMono",
//       padding: 64,
//     }),
//     {
//       name: "user-preferences",
//     }
//   )
// );

// Persistent: Saves data to localStorage under the key user-preferences, so the state is retained after refreshing/restarting the app.

interface PreferencesState {
  code: string;
  title: string;
  theme: string;
  darkMode: boolean;
  showBackground: boolean;
  language: string;
  autoDetectLanguage: boolean;
  fontSize: number;
  fontStyle: string;
  padding: number;

  // Canvas mode
  canvasMode: "code" | "image";

  // Image properties
  imageUrl: string;
  imageObjectFit: "cover" | "contain" | "fill" | "none";
  imageFileName: string;
  showImageFileName: boolean;

  // Window controls
  windowControlStyle: "macos" | "windows" | "none";
  windowScale: number;

  // Code view helpers
  showLineNumbers: boolean;
  highlightLines: string;

  // Frame styling
  frameRadius: number;
  frameRadiusPreset: "sharp" | "soft" | "card" | "round" | "pill" | "custom";
  shadowEnabled: boolean;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  shadowSpread: number;
  shadowOpacity: number;
  shadowColor: string;

  // Background pattern
  backgroundPattern: "none" | "dots" | "grid" | "diagonal";

  // Export presets
  exportPreset:
    | "none"
    | "square1080"
    | "social1200x628"
    | "widescreen1600x900"
    | "hd1920x1080";

  // Image border customization
  // Image border customization
  imageBorderColor: string;
  imageBorderWidth: number;
  imageBackgroundColor: string;
  browserUrl: string;
  windowTheme: "light" | "dark"; // Separate toggle for window theme


  // Setters
  setCode: (code: string) => void;
  setTitle: (title: string) => void;
  setTheme: (theme: string) => void;
  toggleDarkMode: () => void;
  toggleBackground: () => void;
  setLanguage: (language: string) => void;
  setAutoDetectLanguage: (enabled: boolean) => void;
  setFontSize: (size: number) => void;
  setFontStyle: (style: string) => void;
  setPadding: (padding: number) => void;
  setCanvasMode: (mode: "code" | "image") => void;
  setImageUrl: (url: string) => void;
  setImageObjectFit: (fit: "cover" | "contain" | "fill" | "none") => void;
  setImageFileName: (name: string) => void;
  setShowImageFileName: (show: boolean) => void;
  setWindowControlStyle: (style: "macos" | "windows" | "none") => void;
  setWindowScale: (scale: number) => void;
  setImageBorderColor: (color: string) => void;
  setImageBorderWidth: (width: number) => void;
  setImageBackgroundColor: (color: string) => void;
  setBrowserUrl: (url: string) => void;
  setWindowTheme: (theme: "light" | "dark") => void;
  setShowLineNumbers: (enabled: boolean) => void;
  setHighlightLines: (value: string) => void;
  setFrameRadius: (radius: number) => void;
  setFrameRadiusPreset: (
    preset: "sharp" | "soft" | "card" | "round" | "pill" | "custom"
  ) => void;
  setShadowEnabled: (enabled: boolean) => void;
  setShadowX: (value: number) => void;
  setShadowY: (value: number) => void;
  setShadowBlur: (value: number) => void;
  setShadowSpread: (value: number) => void;
  setShadowOpacity: (value: number) => void;
  setShadowColor: (value: string) => void;
  setBackgroundPattern: (
    pattern: "none" | "dots" | "grid" | "diagonal"
  ) => void;
  setExportPreset: (
    preset:
      | "none"
      | "square1080"
      | "social1200x628"
      | "widescreen1600x900"
      | "hd1920x1080"
  ) => void;
}

// Create a persistent Zustand store with type safety and update methods
export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      code: "",
      title: "Untitled",
      theme: "hyper",
      darkMode: true,
      showBackground: true,
      language: "plaintext",
      autoDetectLanguage: false,
      fontSize: 16,
      fontStyle: "jetBrainsMono",
      padding: 64,

      // Canvas mode defaults
      canvasMode: "code",

      // Image defaults
      imageUrl: "",
      imageObjectFit: "contain",
      imageFileName: "",
      showImageFileName: true,

      // Window controls default
      windowControlStyle: "macos",
      windowScale: 1,

      // Code view helpers
      showLineNumbers: false,
      highlightLines: "",

      // Frame styling defaults
      frameRadius: 16,
      frameRadiusPreset: "card",
      shadowEnabled: true,
      shadowX: 0,
      shadowY: 16,
      shadowBlur: 40,
      shadowSpread: 0,
      shadowOpacity: 25,
      shadowColor: "#000000",

      // Background pattern
      backgroundPattern: "none",

      // Export presets
      exportPreset: "none",

      // Image border customization defaults
      imageBorderColor: "#4b5563", // gray-600
      imageBorderWidth: 2,
      imageBackgroundColor: "#1f2937", // gray-800
      browserUrl: "syntaxshot.vercel.app",
      windowTheme: "light", // Default to light like the reference

      // Setters
      setCode: (code) => set({ code }),
      setTitle: (title) => set({ title }),
      setTheme: (theme) => set({ theme }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      toggleBackground: () =>
        set((state) => ({ showBackground: !state.showBackground })),
      setLanguage: (language) => set({ language }),
      setAutoDetectLanguage: (enabled) => set({ autoDetectLanguage: enabled }),
      setFontSize: (size) => set({ fontSize: size }),
      setFontStyle: (style) => set({ fontStyle: style }),
      setPadding: (padding) => set({ padding }),
      setCanvasMode: (mode) => set({ canvasMode: mode }),
      setImageUrl: (url) => set({ imageUrl: url }),
      setImageObjectFit: (fit) => set({ imageObjectFit: fit }),
      setImageFileName: (name) => set({ imageFileName: name }),
      setShowImageFileName: (show) => set({ showImageFileName: show }),
      setWindowControlStyle: (style) => set({ windowControlStyle: style }),
      setWindowScale: (scale: number) => set({ windowScale: scale }),
      setImageBorderColor: (color) => set({ imageBorderColor: color }),
      setImageBorderWidth: (width) => set({ imageBorderWidth: width }),
      setImageBackgroundColor: (color) => set({ imageBackgroundColor: color }),
      setBrowserUrl: (url) => set({ browserUrl: url }),
      setWindowTheme: (theme) => set({ windowTheme: theme }),
      setShowLineNumbers: (enabled) => set({ showLineNumbers: enabled }),
      setHighlightLines: (value) => set({ highlightLines: value }),
      setFrameRadius: (radius) => set({ frameRadius: radius }),
      setFrameRadiusPreset: (preset) => set({ frameRadiusPreset: preset }),
      setShadowEnabled: (enabled) => set({ shadowEnabled: enabled }),
      setShadowX: (value) => set({ shadowX: value }),
      setShadowY: (value) => set({ shadowY: value }),
      setShadowBlur: (value) => set({ shadowBlur: value }),
      setShadowSpread: (value) => set({ shadowSpread: value }),
      setShadowOpacity: (value) => set({ shadowOpacity: value }),
      setShadowColor: (value) => set({ shadowColor: value }),
      setBackgroundPattern: (pattern) => set({ backgroundPattern: pattern }),
      setExportPreset: (preset) => set({ exportPreset: preset }),
    }),
    {
      name: "user-preferences", // Key used in localStorage
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
