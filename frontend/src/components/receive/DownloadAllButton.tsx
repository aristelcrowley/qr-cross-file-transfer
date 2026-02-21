"use client";

interface DownloadAllButtonProps {
  href: string;
  fileCount: number;
}

export default function DownloadAllButton({
  href,
  fileCount,
}: DownloadAllButtonProps) {
  if (fileCount === 0) return null;

  return (
    <a
      href={href}
      download
      className="group flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-medium text-indigo-300 border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
      >
        <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
        <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
      </svg>
      Download All ({fileCount} file{fileCount !== 1 ? "s" : ""}) as ZIP
    </a>
  );
}
