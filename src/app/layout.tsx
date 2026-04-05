import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GeistPixelSquare } from "geist/font/pixel";
import "@/styles/globals.css";
import { defaultWebsiteMetadata } from "@/config/metadata";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = defaultWebsiteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${GeistPixelSquare.variable} antialiased selection:bg-foreground selection:text-primary-foreground`}
      >
        <Providers>
          <div className="container mx-auto md:max-w-161">{children}</div>
        </Providers>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({
            token: process.env.NEXT_PUBLIC_CF_BEACON_TOKEN,
          })}
        ></script>
        <script
          src="https://page-views-api.ratneshc.com/script"
          data-site="ratneshc.com"
          data-path="/"
          defer
        ></script>
      </body>
    </html>
  );
}
