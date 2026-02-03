import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingBackground from "@/components/FloatingBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Question for Jasleen",
  description: "Something special...",
};

import { ValentineProvider } from "@/context/ValentineContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <FloatingBackground />
        <ValentineProvider>
          <main className="flex-1 flex flex-col relative z-10">
            {children}
          </main>
        </ValentineProvider>
      </body>
    </html>
  );
}
