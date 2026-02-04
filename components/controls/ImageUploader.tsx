import { usePreferencesStore } from "@/store/use-preferences-store";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

export default function ImageUploader() {
    const imageUrl = usePreferencesStore((state) => state.imageUrl);
    const setImageUrl = usePreferencesStore((state) => state.setImageUrl);
    const imageFileName = usePreferencesStore((state) => state.imageFileName);
    const setImageFileName = usePreferencesStore(
        (state) => state.setImageFileName
    );
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            setImageFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setImageUrl(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleClear = () => {
        setImageUrl("");
        setImageFileName("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div>
            <Label className="text-xs font-medium mb-3 block">Upload Image</Label>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-lg p-4 transition-colors ${isDragging
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-neutral-700 hover:border-neutral-600"
                    }`}
            >
                {imageUrl ? (
                    <div className="flex items-center gap-2">
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 text-xs text-gray-400 truncate">
                            {imageFileName || "Image loaded"}
                        </div>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleClear}
                            className="h-8 w-8 p-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="text-center">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileSelect(file);
                            }}
                            className="hidden"
                        />
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full"
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose or Drop Image
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
