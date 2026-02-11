import type { SessionState } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function setSessionState(state: SessionState): Promise<void> {
  const res = await fetch(`${API_BASE}/api/session/state`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state }),
  });
  if (!res.ok) throw new Error("Failed to set session state");
}

export async function getSessionState(): Promise<SessionState> {
  const res = await fetch(`${API_BASE}/api/session/state`);
  if (!res.ok) throw new Error("Failed to get session state");
  const data = await res.json();
  return data.state as SessionState;
}

export function getSessionStreamUrl(): string {
  return `${API_BASE}/api/session/stream`;
}
