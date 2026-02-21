import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR Cross File Transfer",
  description: "Zero-install, bi-directional file sharing over local Wi-Fi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-clay min-h-screen flex flex-col text-slate-200 selection:bg-indigo-500/30`}
      >
        <main className="flex-1 flex flex-col items-center justify-center px-5 py-12 md:py-20 gap-10 max-w-3xl mx-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
