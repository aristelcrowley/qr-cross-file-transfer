"use client";

import ActionGrid from "@/components/actions/ActionGrid";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";
import { setRole } from "@/hooks/useRole";
import { setSessionState } from "@/services/session.service";

export default function ActionPage() {
  useEffect(() => {
    setRole("controller");
    setSessionState("WAITING");
  }, []);

  return (
    <>
      <section className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient">
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
