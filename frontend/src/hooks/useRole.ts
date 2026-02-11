"use client";

import type { Role } from "@/types";

const KEY = "qr-xfer-role";

export function setRole(role: Role): void {
  sessionStorage.setItem(KEY, role);
}

export function getRole(): Role | null {
  if (typeof window === "undefined") return null;
  return (sessionStorage.getItem(KEY) as Role) ?? null;
}

export function isViewer(): boolean {
  return getRole() === "viewer";
}

export function isController(): boolean {
  return getRole() === "controller";
}
