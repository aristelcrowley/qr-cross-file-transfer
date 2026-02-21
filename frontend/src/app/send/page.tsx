"use client";

import BackLink from "@/components/layout/BackLink";
import DropZone from "@/components/send/DropZone";
import SelectedFilesList from "@/components/send/SelectedFilesList";
import UploadProgress from "@/components/send/UploadProgress";
import SendButton from "@/components/send/SendButton";
import StatusMessage from "@/components/send/StatusMessage";
import { useViewerNavigation } from "@/hooks/useViewerNavigation";
import { isController } from "@/hooks/useRole";
import { useUpload } from "@/hooks/useFiles";
import { setSessionState } from "@/services/session.service";

export default function SendPage() {
  useViewerNavigation();

  const {
    selected,
    addFiles,
    removeFile,
    upload,
    uploading,
    progress,
    done,
    error,
  } = useUpload();

  const handleBack = async () => {
    await setSessionState("WAITING");
  };

  return (
    <>
      {isController() && <BackLink href="/action" onClick={handleBack} />}

      <section className="clay-card p-6 sm:p-8 max-w-lg w-full mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl clay-badge text-2xl">
            📤
          </div>
          <h1 className="text-2xl font-bold text-clay-heading">
            Send Files
          </h1>
          <p className="text-sm text-clay-muted">
            Choose or drag files to share with the connected device.
          </p>
        </div>

        <DropZone onFiles={addFiles} />
        <SelectedFilesList files={selected} onRemove={removeFile} />
        {uploading && <UploadProgress progress={progress} />}
        <StatusMessage error={error} done={done} />
        <SendButton
          fileCount={selected.length}
          uploading={uploading}
          progress={progress}
          onClick={upload}
        />
      </section>
    </>
  );
}
