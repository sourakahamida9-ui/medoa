import type { Metadata, Viewport } from "next";
import { Playfair_Display, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Ticker } from "@/components/layout/Ticker";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsroomStatus } from "@/components/layout/NewsroomStatus";
import { BreakingBanner } from "@/components/layout/BreakingBanner";
import { siteConfig } from "@/config/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Média numérique international premium`,
    template: `${siteConfig.name} - %s`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Média numérique international premium`,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
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
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "fr-FR": "/",
      "en-US": "/en",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F1EE" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1B2A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${sourceSans.variable} ${sourceSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: siteConfig.name,
              url: siteConfig.url,
              logo: `${siteConfig.url}/logo.png`,
              description: siteConfig.description,
              sameAs: [
                "https://twitter.com/lignerouge",
                "https://facebook.com/lignerouge",
              ],
              ethicsPolicy: `${siteConfig.url}/ethics`,
              correctionsPolicy: `${siteConfig.url}/ethics#corrections`,
              verificationFactCheckingPolicy: `${siteConfig.url}/ethics#fact-checking`,
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F2F1EE] dark:bg-[#0f0f1a] text-[#1A1A1A] dark:text-[#E8E4DC] font-sans">
        <a href="#main-content" className="skip-to-content">
          Aller au contenu principal
        </a>
        <ThemeProvider>
          <NewsroomStatus />
          <BreakingBanner />
          <Ticker />
          <Header />
          <main className="flex-1" id="main-content">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
