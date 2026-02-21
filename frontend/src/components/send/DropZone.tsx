"use client";

import { useRef, useState, useCallback } from "react";

interface DropZoneProps {
  onFiles: (files: FileList) => void;
}

export default function DropZone({ onFiles }: DropZoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (e.dataTransfer.files.length > 0) {
        onFiles(e.dataTransfer.files);
      }
    },
    [onFiles]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`clay-inset rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 border border-dashed ${
        dragging
          ? "border-indigo-500/50 bg-indigo-500/5 scale-[1.01]"
          : "border-white/10 hover:border-indigo-500/30 hover:bg-white/[0.02]"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) onFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <div className="space-y-2">
        <span className="text-3xl block">{dragging ? "⬇️" : "📁"}</span>
        <p className="text-clay-muted text-sm">
          {dragging
            ? "Drop files here…"
            : "Drag & drop files here, or click to browse"}
        </p>
      </div>
    </div>
  );
}
