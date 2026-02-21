"use client";

import Hero from "@/components/hero/Hero";
import QRCard from "@/components/qr/QRCard";
import { useEffect } from "react";
import { setRole } from "@/hooks/useRole";
import { useViewerNavigation } from "@/hooks/useViewerNavigation";

export default function Home() {
  useEffect(() => setRole("viewer"), []);
  useViewerNavigation();
  return (
    <>
      <Hero />
      <QRCard />
    </>
  );
}
