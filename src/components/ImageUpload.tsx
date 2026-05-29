"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className = "" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      setError("");
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Erreur lors de l'upload");
        }

        onChange(data.url);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erreur inconnue";
        setError(msg);
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleRemove = () => {
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        className="hidden"
      />

      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-[#DEDBD4] dark:border-[#3a3a4e]">
          <img
            src={value}
            alt="Image de l'article"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-white text-[#0D1B2A] text-xs font-semibold px-3 py-2 rounded-lg hover:bg-[#F2F1EE] transition-colors"
            >
              Changer
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="bg-[#C01D35] text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-[#A01728] transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
            ${dragOver
              ? "border-[#C01D35] bg-[#C01D35]/5"
              : "border-[#DEDBD4] dark:border-[#3a3a4e] hover:border-[#C01D35] hover:bg-[#C01D35]/5"
            }
            ${uploading ? "pointer-events-none opacity-60" : ""}
          `}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-[#C01D35] animate-spin" />
              <p className="text-sm text-[#7A7A7A]">Upload en cours...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#F2F1EE] dark:bg-[#2a2a3e] flex items-center justify-center">
                {dragOver ? (
                  <Upload className="w-6 h-6 text-[#C01D35]" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-[#7A7A7A]" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A] dark:text-white">
                  Glissez une image ici
                </p>
                <p className="text-xs text-[#7A7A7A] mt-1">
                  ou cliquez pour sélectionner (JPEG, PNG, WebP, GIF — max 10 Mo)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 mt-2">{error}</p>
      )}
    </div>
  );
}
