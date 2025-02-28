import type { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import { Metadata, Viewport } from "next";

const faviconPath = "pocket-operator-favicons";

export const metadata: Metadata = {
  title: "PO-12 | uln.industries",
  description: "Use the pocket operator PO-12 in the browser.",
  authors: [
    {
      name: "uln.industries",
      url: "https://uln.industries",
    },
  ],

  // Icons are generated by https://realfavicongenerator.net/,
  // referencing https://www.davegray.codes/posts/nextjs-favicon-svg-icon-apple-chrome
  icons: [
    {
      rel: "favicon",
      url: `/${faviconPath}/favicon.ico`,
      type: "image/x-icon",
      sizes: "48x48",
    },
    {
      rel: "icon",
      url: `/${faviconPath}/po-favicon.svg`,
      type: "image/svg+xml",
      sizes: "any",
    },
    {
      rel: "icon",
      sizes: "32x32",
      url: `/${faviconPath}/favicon-32x32.png`,
      type: "image/png",
    },
    {
      rel: "icon",
      sizes: "192x192",
      url: `/${faviconPath}/po-favicon-192.png`,
      type: "image/png",
    },
    {
      rel: "icon",
      sizes: "16x16",
      url: `/${faviconPath}/favicon-16x16.png`,
      type: "image/png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: `/${faviconPath}/apple-touch-icon.png`,
    },
    {
      rel: "manifest",
      url: `/${faviconPath}/site.webmanifest`,
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#262625",
};

const openSans = Open_Sans({
  weight: "500",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={openSans.className}
        style={{
          margin: 0,
          padding: 0,
          overflow: "hidden",
          backgroundColor: "#262625",
          height: "100vh",
          width: "100vw",
        }}
      >
        {children}
      </body>
    </html>
  );
}
