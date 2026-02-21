"use client";

interface FilePreviewProps {
  fileName: string;
}

const IMAGE_EXTS = new Set([
  "jpg", "jpeg", "png", "webp", "gif", "svg", "bmp", "ico", "avif", "tiff",
]);

type FileCategory =
  | "image"
  | "pdf"
  | "archive"
  | "document"
  | "spreadsheet"
  | "presentation"
  | "audio"
  | "video"
  | "code"
  | "text"
  | "unknown";

interface CategoryStyle {
  icon: string;
  label: string;
  bg: string;
  border: string;
  text: string;
}

const CATEGORY_STYLES: Record<FileCategory, CategoryStyle> = {
  image:        { icon: "🖼️", label: "IMG",  bg: "bg-violet-500/10",  border: "border-violet-500/20", text: "text-violet-400"  },
  pdf:          { icon: "📄", label: "PDF",  bg: "bg-red-500/10",     border: "border-red-500/20",    text: "text-red-400"     },
  archive:      { icon: "📦", label: "ZIP",  bg: "bg-amber-500/10",   border: "border-amber-500/20",  text: "text-amber-400"   },
  document:     { icon: "📝", label: "DOC",  bg: "bg-blue-500/10",    border: "border-blue-500/20",   text: "text-blue-400"    },
  spreadsheet:  { icon: "📊", label: "XLS",  bg: "bg-emerald-500/10", border: "border-emerald-500/20",text: "text-emerald-400" },
  presentation: { icon: "📽️", label: "PPT",  bg: "bg-orange-500/10",  border: "border-orange-500/20", text: "text-orange-400"  },
  audio:        { icon: "🎵", label: "AUD",  bg: "bg-pink-500/10",    border: "border-pink-500/20",   text: "text-pink-400"    },
  video:        { icon: "🎬", label: "VID",  bg: "bg-cyan-500/10",    border: "border-cyan-500/20",   text: "text-cyan-400"    },
  code:         { icon: "💻", label: "CODE", bg: "bg-teal-500/10",    border: "border-teal-500/20",   text: "text-teal-400"    },
  text:         { icon: "📃", label: "TXT",  bg: "bg-slate-500/10",   border: "border-slate-500/20",  text: "text-slate-400"   },
  unknown:      { icon: "📎", label: "FILE", bg: "bg-slate-500/10",   border: "border-slate-500/20",  text: "text-slate-400"   },
};

const EXT_MAP: Record<string, FileCategory> = {
  zip: "archive", rar: "archive", "7z": "archive", tar: "archive",
  gz: "archive", bz2: "archive", xz: "archive", zst: "archive",
  pdf: "pdf",
  doc: "document", docx: "document", odt: "document", rtf: "document",
  xls: "spreadsheet", xlsx: "spreadsheet", csv: "spreadsheet", ods: "spreadsheet",
  ppt: "presentation", pptx: "presentation", odp: "presentation",
  mp3: "audio", wav: "audio", flac: "audio", aac: "audio",
  ogg: "audio", m4a: "audio", wma: "audio",
  mp4: "video", mkv: "video", avi: "video", mov: "video",
  webm: "video", flv: "video", wmv: "video",
  js: "code", ts: "code", jsx: "code", tsx: "code",
  py: "code", go: "code", rs: "code", java: "code",
  c: "code", cpp: "code", h: "code", cs: "code",
  html: "code", css: "code", scss: "code", json: "code",
  xml: "code", yaml: "code", yml: "code", toml: "code",
  sh: "code", bat: "code", ps1: "code", sql: "code",
  txt: "text", md: "text", log: "text", ini: "text", cfg: "text",
};

function getExtension(filename: string): string {
  const dot = filename.lastIndexOf(".");
  if (dot === -1 || dot === filename.length - 1) return "";
  return filename.slice(dot + 1).toLowerCase();
}

function getCategory(filename: string): FileCategory {
  const ext = getExtension(filename);
  if (!ext) return "unknown";
  if (IMAGE_EXTS.has(ext)) return "image";
  return EXT_MAP[ext] ?? "unknown";
}

export default function FilePreview({ fileName }: FilePreviewProps) {
  const category = getCategory(fileName);
  const ext = getExtension(fileName);
  const style = CATEGORY_STYLES[category];

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-xl border shrink-0 ${style.bg} ${style.border}`}
    >
      <span className="text-base leading-none">{style.icon}</span>
      <span className={`text-[8px] font-bold uppercase tracking-wider mt-0.5 ${style.text}`}>
        {ext ? ext.slice(0, 4) : style.label}
      </span>
    </div>
  );
}

export { getExtension, getCategory, IMAGE_EXTS };
