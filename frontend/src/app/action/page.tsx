import ActionGrid from "@/components/actions/ActionGrid";
import Footer from "@/components/layout/Footer";
import BackLink from "@/components/layout/BackLink";

export default function ActionPage() {
  return (
    <>
      <BackLink href="/" label="Home" />

      <section className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-clay-heading">
          What would you like to do?
        </h1>
        <p className="text-sm text-clay-muted">
          Pick an action to get started.
        </p>
      </section>

      <ActionGrid />
      <Footer />
    </>
  );
}
