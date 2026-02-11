"use client";

import BackLink from "@/components/layout/BackLink";
import FileList from "@/components/receive/FileList";
import EmptyState from "@/components/receive/EmptyState";
import { useViewerNavigation } from "@/hooks/useViewerNavigation";
import { isController } from "@/hooks/useRole";
import { useFileList } from "@/hooks/useFiles";
import { setSessionState } from "@/services/session.service";

export default function ReceivePage() {
  useViewerNavigation();

  const { files, loading, error, getDownloadUrl } = useFileList();

  const handleBack = async () => {
    await setSessionState("WAITING");
  };

  return (
    <>
      {isController() && <BackLink href="/action" onClick={handleBack} />}

      <section className="clay-card p-6 sm:p-8 max-w-lg w-full mx-auto space-y-5">
        <div className="text-center">
          <span className="text-5xl block mb-3">📥</span>
          <h1 className="text-2xl font-bold text-clay-heading mb-1">
            Receive Files
          </h1>
          <p className="text-sm text-clay-muted">
            Download files shared from the connected device.
          </p>
        </div>

        {loading && files.length === 0 && (
          <p className="text-sm text-clay-muted text-center animate-pulse">
            Loading files…
          </p>
        )}

        {error && (
          <p className="text-sm text-red-400/80 text-center font-medium">
            {error}
          </p>
        )}

        {!loading && files.length === 0 && !error && <EmptyState />}

        <FileList files={files} getDownloadUrl={getDownloadUrl} />
      </section>
    </>
  );
}
