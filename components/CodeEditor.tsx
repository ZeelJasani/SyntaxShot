import { cn, hexToRgba } from "@/lib/utils";
import flourite from "flourite";
import { codeSnippets, fonts } from "@/options";
import hljs from "highlight.js";
import { useEffect, useMemo } from "react";
import Editor from "react-simple-code-editor";
import { usePreferencesStore } from "@/store/use-preferences-store";
import WindowControls from "@/components/WindowControls";

const parseHighlightLines = (input: string) => {
  const set = new Set<number>();
  if (!input.trim()) return set;
  const parts = input.split(",");
  for (const part of parts) {
    const value = part.trim();
    if (!value) continue;
    if (value.includes("-")) {
      const [rawStart, rawEnd] = value.split("-");
      const start = Number.parseInt(rawStart, 10);
      const end = Number.parseInt(rawEnd, 10);
      if (!Number.isNaN(start) && !Number.isNaN(end)) {
        const min = Math.min(start, end);
        const max = Math.max(start, end);
        for (let i = min; i <= max; i += 1) {
          set.add(i);
        }
      }
    } else {
      const line = Number.parseInt(value, 10);
      if (!Number.isNaN(line)) {
        set.add(line);
      }
    }
  }
  return set;
};

export default function CodeEditor() {
  const store = usePreferencesStore();
  const highlightedLines = useMemo(
    () => parseHighlightLines(store.highlightLines),
    [store.highlightLines]
  );

  // Add random code snippets on mount
  useEffect(() => {
    const randomSnippet =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    usePreferencesStore.setState(randomSnippet);
  }, []);

  // Auto Detect Language
  useEffect(() => {
    if (store.autoDetectLanguage) {
      // use flourite to detect language and provide highlighting
      const { language } = flourite(store.code, { noUnknown: true });
      usePreferencesStore.setState({
        language: language.toLowerCase() || "plaintext",
      });
    }
  }, [store.autoDetectLanguage, store.code]);

  const boxShadow = store.shadowEnabled
    ? `${store.shadowX}px ${store.shadowY}px ${store.shadowBlur}px ${store.shadowSpread}px ${hexToRgba(
        store.shadowColor,
        store.shadowOpacity / 100
      )}`
    : "none";

  return (
    <div
      className={cn(
        "overflow-hidden transition-all",
        store.darkMode
          ? "bg-black/75 border-gray-600/40"
          : "bg-white/75 border-gray-200/20"
      )}
      style={{
        borderWidth: `${store.imageBorderWidth}px`,
        borderStyle: "solid",
        borderColor: store.imageBorderColor,
        borderRadius: `${store.frameRadius}px`,
        boxShadow,
      }}
    >
      <header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
        <WindowControls
          style={store.windowControlStyle}
          size={store.windowScale}
        />
        <div className="col-span-4 flex justify-center">
          <input
            type="text"
            value={store.title}
            onChange={(e) =>
              usePreferencesStore.setState({ title: e.target.value })
            }
            spellCheck={false}
            onClick={(e) => {
              if (e.target instanceof HTMLInputElement) {
                e.target.select();
              }
            }}
            className="bg-transparent text-center text-gray-400 text-sm font-medium focus:outline-none"
          />
        </div>
      </header>
      <div
        className={cn(
          "px-4 pb-4",
          store.darkMode
            ? "brightness-110"
            : "text-gray-800 brightness-50 saturate-200 contrast-200"
        )}
      >
        <Editor
          value={store.code}
          onValueChange={(code) => usePreferencesStore.setState({ code })}
          highlight={(code) => {
            const highlighted = hljs.highlight(code, {
              language: store.language || "plaintext",
            }).value;
            if (!store.showLineNumbers && highlightedLines.size === 0) {
              return highlighted;
            }
            const lines = highlighted.split("\n");
            return lines
              .map((line, index) => {
                const lineNumber = index + 1;
                const isHighlighted = highlightedLines.has(lineNumber);
                const lineClass = isHighlighted
                  ? "editor-line editor-line--highlight"
                  : "editor-line";
                const numberMarkup = store.showLineNumbers
                  ? `<span class="line-number">${lineNumber}</span>`
                  : "";
                const content = line || " ";
                return `<span class="${lineClass}">${numberMarkup}<span class="line-content">${content}</span></span>`;
              })
              .join("\n");
          }}
          style={{
            fontFamily: fonts[store.fontStyle as keyof typeof fonts].name,
            fontSize: store.fontSize,
          }}
          textareaClassName="focus:outline-none"
          preClassName="code-editor"
          onClick={(e) => {
            if (e.target instanceof HTMLTextAreaElement) {
              e.target.select();
            }
          }}
        />
      </div>
    </div>
  );
}
