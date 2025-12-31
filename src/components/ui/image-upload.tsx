import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (file: File | null, preview: string | null) => void;
  className?: string;
  disabled?: boolean;
}

export const ImageUpload = ({
  value,
  onChange,
  className,
  disabled = false,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setPreview(null);
      onChange(null, null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange(file, result);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("relative", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        className="hidden"
        disabled={disabled}
      />

      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative aspect-square w-full rounded-lg border-2 border-dashed transition-all",
          "flex items-center justify-center cursor-pointer",
          "hover:border-primary hover:bg-primary/5",
          isDragging && "border-primary bg-primary/10",
          disabled && "opacity-50 cursor-not-allowed hover:border-gray-300",
          preview ? "border-solid border-gray-300" : "border-gray-300",
          className
        )}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            {!disabled && (
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
            <div
              className={cn(
                "p-4 rounded-full transition-colors",
                isDragging
                  ? "bg-primary/20"
                  : "bg-gray-100 group-hover:bg-gray-200"
              )}
            >
              <Upload
                className={cn(
                  "w-8 h-8 transition-colors",
                  isDragging ? "text-primary" : "text-gray-500"
                )}
              />
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-primary">Click to upload</span>
              <span className="text-gray-500"> or drag and drop</span>
            </div>
            <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
};