"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getRole } from "@/hooks/useRole";
import { getSessionStreamUrl } from "@/services/session.service";
import type { SessionState } from "@/types";

export function useViewerNavigation() {
  const router = useRouter();
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (getRole() !== "viewer") return;

    const url = getSessionStreamUrl();
    const es = new EventSource(url);
    esRef.current = es;

    es.onmessage = (e) => {
      const state = e.data.trim() as SessionState;
      switch (state) {
        case "IDLE":
          router.replace("/");
          break;
        case "WAITING":
          router.replace("/waiting");
          break;
        case "SENDING":
          router.replace("/receive");
          break;
        case "RECEIVING":
          router.replace("/send");
          break;
      }
    };

    es.onerror = () => {
    };

    return () => {
      es.close();
      esRef.current = null;
    };
  }, [router]);
}
