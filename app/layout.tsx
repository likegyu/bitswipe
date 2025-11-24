import type { Metadata } from "next";
import Script from "next/script";
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
  metadataBase: new URL('https://bitswipe.xyz'),
  title: {
    default: "Bitswipe | Free Bitcoin Trading Simulator & Practice Game",
    template: "%s | Bitswipe"
  },
  description: "Master Bitcoin trading risk-free with Bitswipe. Practice reading candlestick charts, predict price movements, and improve your technical analysis skills in this addictive crypto trading simulation game.",
  keywords: ["Bitcoin Trading Simulator", "Crypto Trading Game", "Practice Trading", "Technical Analysis", "Candlestick Charts", "Crypto Game", "Bitcoin Price Prediction"],
  authors: [{ name: "Bitswipe" }],
  creator: "Bitswipe",
  publisher: "Bitswipe",
  openGraph: {
    title: "Bitswipe | Free Bitcoin Trading Simulator",
    description: "Master Bitcoin trading risk-free. Practice reading charts and predicting price movements in this addictive simulation game.",
    url: "https://bitswipe.xyz",
    siteName: "Bitswipe",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bitswipe - Bitcoin Trading Game",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitswipe | Free Bitcoin Trading Simulator",
    description: "Master Bitcoin trading risk-free. Practice reading charts and predicting price movements in this addictive simulation game.",
    images: ["/og-image.png"],
    creator: "@bitswipe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5G89PM8B');`}
        </Script>
        {/* End Google Tag Manager */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3860360352476148"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5G89PM8B"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
