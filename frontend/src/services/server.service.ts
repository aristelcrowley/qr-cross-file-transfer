import type { ServerInfo } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getServerInfo(): Promise<ServerInfo> {
  const res = await fetch(`${API_BASE}/api/info`);
  if (!res.ok) throw new Error("Failed to fetch server info");
  return res.json();
}

export function getQRCodeUrl(): string {
  return `${API_BASE}/api/qr`;
}
