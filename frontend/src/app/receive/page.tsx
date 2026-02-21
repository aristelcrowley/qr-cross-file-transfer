"use client";

import BackLink from "@/components/layout/BackLink";
import FileList from "@/components/receive/FileList";
import EmptyState from "@/components/receive/EmptyState";
import DownloadAllButton from "@/components/receive/DownloadAllButton";
import ClearUploadsButton from "@/components/shared/ClearUploadsButton";
import { useViewerNavigation } from "@/hooks/useViewerNavigation";
import { isController } from "@/hooks/useRole";
import { useFileList } from "@/hooks/useFiles";
import { setSessionState } from "@/services/session.service";
import { clearPCUploads } from "@/services/file.service";

export default function ReceivePage() {
  useViewerNavigation();

  const { files, loading, error, getDownloadUrl, refresh, downloadAllUrl } = useFileList();

  const handleBack = async () => {
    await setSessionState("WAITING");
  };

  return (
    <>
      {isController() && <BackLink href="/action" onClick={handleBack} />}

      <section className="clay-card p-6 sm:p-8 max-w-lg w-full mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl clay-badge text-2xl">
            📥
          </div>
          <h1 className="text-2xl font-bold text-clay-heading">
            Receive Files
          </h1>
          <p className="text-sm text-clay-muted">
            Download files shared from the connected device.
          </p>
        </div>

        {loading && files.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-8">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" />
            </div>
            <p className="text-sm text-clay-muted">Loading files…</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center gap-2 py-2">
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            <p className="text-sm text-red-400 font-medium">{error}</p>
          </div>
        )}

        {!loading && files.length === 0 && !error && <EmptyState />}

        <FileList files={files} getDownloadUrl={getDownloadUrl} />

        <DownloadAllButton href={downloadAllUrl} fileCount={files.length} />

        {isController() && (
          <ClearUploadsButton
            source="from-pc"
            clearFn={clearPCUploads}
            onCleared={refresh}
          />
        )}
      </section>
    </>
  );
}
