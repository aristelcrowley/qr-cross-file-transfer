"use client";

import { getQRCodeUrl } from "@/services/server.service";
import { useServerInfo } from "@/hooks/useServerInfo";

export default function QRCard() {
  const { info, loading, error } = useServerInfo();

  return (
    <div className="clay-card w-full max-w-xs sm:max-w-sm p-8 flex flex-col items-center gap-5 mx-auto">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-clay-muted">
        Scan to connect
      </h2>

      <div className="clay-inset rounded-2xl p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getQRCodeUrl()}
          alt="QR code for network URL"
          width={180}
          height={180}
          className="rounded-xl"
        />
      </div>

      {loading && (
        <span className="text-sm text-clay-muted animate-pulse">
          Detecting network…
        </span>
      )}

      {error && (
        <span className="text-sm text-red-400/80 font-medium">
          Could not reach server
        </span>
      )}

      {info && (
        <code className="text-xs text-clay-muted bg-white/40 px-3 py-1.5 rounded-lg break-all font-mono">
          {info.networkUrl}
        </code>
      )}
    </div>
  );
}
