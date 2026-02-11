import BackLink from "@/components/layout/BackLink";

export default function ReceivePage() {
  return (
    <>
      <BackLink href="/action" />
      <section className="clay-card p-8 max-w-lg w-full mx-auto text-center">
        <span className="text-5xl block mb-4">📥</span>
        <h1 className="text-2xl font-bold text-clay-heading mb-2">Receive Files</h1>
        <p className="text-clay-muted">
          Browse and download files shared from the connected device.
        </p>
        <div className="mt-6 py-12 clay-inset rounded-2xl text-clay-muted text-sm">
          Coming soon — file list
        </div>
      </section>
    </>
  );
}
