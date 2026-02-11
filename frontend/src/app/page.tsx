import Hero from "@/components/hero/Hero";
import QRCard from "@/components/qr/QRCard";
import FeatureList from "@/components/hero/FeatureList";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <QRCard />
      <FeatureList />
      <Footer />
    </>
  );
}
