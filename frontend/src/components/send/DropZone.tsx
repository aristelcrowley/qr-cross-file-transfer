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
      className={`clay-inset rounded-2xl p-8 text-center cursor-pointer transition-all ${
        dragging
          ? "ring-2 ring-clay-heading/30 scale-[1.01]"
          : "hover:scale-[1.01]"
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
      <p className="text-clay-muted text-sm">
        {dragging
          ? "Drop files here…"
          : "Drag & drop files here, or click to browse"}
      </p>
    </div>
  );
}
