import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Tempo Friend - Conversas de companhia",
    template: "%s | Tempo Friend",
  },
  description: "Plataforma para agendar conversas informais de companhia gratuitas, com duração de 15 minutos.",
  keywords: ["conversa", "companhia", "agendamento", "chat", "bem-estar"],
  authors: [{ name: "Tempo Friend" }],
  creator: "Tempo Friend",
  publisher: "Tempo Friend",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Tempo Friend",
    title: "Tempo Friend - Conversas de companhia",
    description: "Agende conversas informais de companhia gratuitas de 15 minutos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tempo Friend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tempo Friend",
    description: "Conversas informais de companhia, gratuitas e agendadas.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}