"use client";

import Footer from "@/components/layout/Footer";
import { useViewerNavigation } from "@/hooks/useViewerNavigation";

export default function WaitingPage() {
  useViewerNavigation();

  return (
    <>
      <section className="text-center space-y-5">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl clay-badge text-3xl">
          📱
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-clay-heading">
          Phone connected!
        </h1>
        <p className="text-sm text-clay-muted max-w-xs mx-auto leading-relaxed">
          Waiting for the phone to choose an action…
        </p>
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="w-2 h-2 rounded-full bg-clay-muted/50 animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 rounded-full bg-clay-muted/50 animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-clay-muted/50 animate-bounce [animation-delay:300ms]" />
        </div>
      </section>
      <Footer />
    </>
  );
}
