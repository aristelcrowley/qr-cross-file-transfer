"use client";

import { useEffect, useState } from "react";
import type { ServerInfo } from "@/types";
import { getServerInfo } from "@/services/server.service";

interface UseServerInfoReturn {
  info: ServerInfo | null;
  loading: boolean;
  error: string | null;
}

export function useServerInfo(): UseServerInfoReturn {
  const [info, setInfo] = useState<ServerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getServerInfo()
      .then(setInfo)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { info, loading, error };
}
