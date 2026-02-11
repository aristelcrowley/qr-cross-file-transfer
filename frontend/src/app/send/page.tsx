import BackLink from "@/components/layout/BackLink";

export default function SendPage() {
  return (
    <>
      <BackLink href="/action" />
      <section className="clay-card p-8 max-w-lg w-full mx-auto text-center">
        <span className="text-5xl block mb-4">📤</span>
        <h1 className="text-2xl font-bold text-clay-heading mb-2">Send Files</h1>
        <p className="text-clay-muted">
          Choose files from this device to share with a connected phone or PC.
        </p>
        <div className="mt-6 py-12 clay-inset rounded-2xl text-clay-muted text-sm">
          Coming soon — drag &amp; drop zone
        </div>
      </section>
    </>
  );
}
