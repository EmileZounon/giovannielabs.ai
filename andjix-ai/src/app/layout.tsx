import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andjix — Votre assistant administratif et fiscal à Ottawa",
  description:
    "Andjix répond à vos questions sur les démarches administratives, fiscales et professionnelles à Ottawa. Bilingue, disponible 24/7. Pour les nouveaux arrivants, travailleurs autonomes et PME.",
  icons: { icon: "/logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#1E88E5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
