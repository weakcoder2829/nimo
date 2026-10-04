import type { Metadata } from "next";
import { Figtree, Lora } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";
import ThemeSync from "@/components/ThemeSync";

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

// Immediate blocking script to prevent flash of wrong theme (FOUC)
const themeInitScript = `
(function() {
  try {
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    if (media.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${figtree.variable} ${lora.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased font-body selection:bg-primary/20 selection:text-primary transition-colors duration-200">
        <ThemeSync />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
