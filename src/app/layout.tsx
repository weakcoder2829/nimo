import type { Metadata } from "next";
import { Figtree, Lora } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "nimo. — The Anonymous Campus Social Pulse",
  description: "Unfiltered campus banter, anonymous confessions, and local college radar within 5 miles.",
};

import { AuthProvider } from "@/lib/authContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased font-body selection:bg-primary/20 selection:text-primary">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
