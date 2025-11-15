import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://bet-clones.vercel.app"),
  title: {
    default: "Gerenciador de Clones | Gerencie Casas de Apostas e Clones",
    template: "%s | Gerenciador de Clones",
  },
  description:
    "Sistema completo para gerenciar casas de apostas e seus clones. Organize, monitore status, adicione URLs e notas para cada casa e clone de forma eficiente.",
  keywords: [
    "gerenciador de clones",
    "casas de apostas",
    "gestão de apostas",
    "clones de casas",
    "bet manager",
    "sistema de apostas",
    "organização de bets",
  ],
  authors: [{ name: "Gerenciador de Clones" }],
  creator: "Gerenciador de Clones",
  publisher: "Gerenciador de Clones",
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
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://bet-clones.vercel.app",
    title: "Gerenciador de Clones | Gerencie Casas de Apostas e Clones",
    description:
      "Sistema completo para gerenciar casas de apostas e seus clones. Organize, monitore status, adicione URLs e notas para cada casa e clone de forma eficiente.",
    siteName: "Gerenciador de Clones",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gerenciador de Clones - Sistema de Gestão",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerenciador de Clones | Gerencie Casas de Apostas e Clones",
    description:
      "Sistema completo para gerenciar casas de apostas e seus clones. Organize, monitore status, adicione URLs e notas para cada casa e clone de forma eficiente.",
    images: ["/og-image.png"],
    creator: "@gerenciadorclones",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  verification: {
    google: "seu-codigo-google-search-console",
    // yandex: "seu-codigo-yandex",
    // yahoo: "seu-codigo-yahoo",
  },
  alternates: {
    canonical: "https://bet-clones.vercel.app",
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-background">
              <div className="container mx-auto p-8">{children}</div>
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
