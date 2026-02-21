"use client";

import { getQRCodeUrl } from "@/services/server.service";
import { useServerInfo } from "@/hooks/useServerInfo";

export default function QRCard() {
  const { info, loading, error } = useServerInfo();

  return (
    <div className="clay-card w-full max-w-sm p-8 flex flex-col items-center gap-6 mx-auto">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-muted">
        Scan to connect
      </h2>
      <div className="relative">
        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-transparent to-violet-500/20 blur-xl animate-pulse" />
        <div className="relative clay-inset rounded-2xl p-6 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getQRCodeUrl()}
            alt="QR code for network URL"
            width={240}
            height={240}
            className="rounded-lg"
          />
        </div>
      </div>

      {loading && (
        <span className="text-sm text-clay-muted animate-pulse">
          Detecting network…
        </span>
      )}

      {error && (
        <span className="text-sm text-red-400 font-medium">
          Could not reach server
        </span>
      )}

      {info && (
        <div className="flex flex-col items-center gap-2 w-full">
          <code className="text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-lg break-all font-mono">
            {info.networkUrl}
          </code>
          <p className="text-[10px] text-slate-500">No cloud — everything stays on your Wi-Fi</p>
        </div>
      )}
    </div>
  );
}
