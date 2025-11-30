
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageIcon, FileIcon, X } from "lucide-react";

export default function FileUpload({
  id,
  label,
  accept,
  helperText,
  onFileChange,
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const isImage = (f) =>
    f && f.type && f.type.startsWith("image/");

  const handleChange = (e) => {
    const selected = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFile(selected);
    onFileChange && onFileChange(selected);

    if (selected && isImage(selected)) {
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    onFileChange && onFileChange(null);
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label
          htmlFor={id}
          className="text-base font-medium text-foreground"
        >
          {label}
        </Label>
      )}

      {file ? (
        <div className="relative border rounded-xl p-3 flex items-center gap-3 mt-2">
          {isImage(file) && previewUrl ? (
            <img
              src={previewUrl}
              alt="preview"
              className="w-1/2 h-36 object-contain rounded-lg border"
            />
          ) : (
            <div className="w-12 h-12 rounded-full border flex items-center justify-center">
              <FileIcon className="w-5 h-5 text-gray-600" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <Button
            type="button"
            size="icon"
            variant="outline"
            className="shrink-0"
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <label
          htmlFor={id}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors mt-2"
        >
          <div className="w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-gray-600" />
          </div>
          <div className="text-center">
            <p className="text-sm font-normal text-foreground mb-1">
              Click to choose file
            </p>
            {helperText && (
              <p className="text-xs text-muted-foreground">
                {helperText}
              </p>
            )}
          </div>
        </label>
      )}

      <input
        id={id}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
