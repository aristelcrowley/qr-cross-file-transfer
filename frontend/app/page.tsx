import Hero from "@/app/components/hero/Hero";
import QRCard from "@/app/components/qr/QRCard";
import ActionGrid from "@/app/components/actions/ActionGrid";
import Footer from "@/app/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <QRCard />
      <ActionGrid />
      <Footer />
    </>
  );
}
