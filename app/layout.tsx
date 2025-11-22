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
  metadataBase: new URL('http://bitswipe.xyz'),
  title: "Bitswipe",
  description: "Test your crypto trading skills with past price charts. Predict Bitcoin price movements and master the art of trading!",
  openGraph: {
    title: "Bitswipe - Bitcoin Trading Game",
    description: "Test your crypto trading skills with past price charts. Predict Bitcoin price movements and master the art of trading!",
    url: "https://bitswipe.xyz", // Update with your actual domain
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
    title: "Bitswipe - Bitcoin Trading Game",
    description: "Test your crypto trading skills with past price charts. Predict Bitcoin price movements and master the art of trading!",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3860360352476148"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
