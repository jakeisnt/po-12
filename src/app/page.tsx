import { Metadata, Viewport } from "next";
import PocketOperatorPage from "./pocket-operator/PocketOperatorPage";

import { Open_Sans } from "next/font/google";

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

// Plan for implementing the product tour:
// 1.  Clean up the code a little bit. The abstraction boundaries are a bit broken right now.
//     The files are a bit too big as-is - they can be broken up into smaller parts.
//     We also need to 'harden' the types a bit to make sure we catch bugs and regressions.

// the guy's body shouldn't ever be shown when switching patterns. only the head should show.

// 2. Add a first-time piece of paper that asks whether the user is familiar with the pocket operator.
//   If they are, they can skip the tutorial. If they aren't, they can go through the tutorial.

//  Start by highlighting the kick. 'Press a button to play a sound.' the screen darkens around everything but the sticky note thing,
// the screen, and the kick button (1).
// then flip the note to the other side. 'Now play the snare.' Focus on button 4, the snare button, I think.
// Then to the next stage. Hit the play button for 1 bar and pause.

// onboarding ui idea: we use this sticky notes metaphor. on desktop, we can pile the sticky notes on top of one another.'

// no, we need a flipbook animation. the next instruction shows after the previous one and the page 'turns over' (3979 egrees) to reveal it.
// we then move the notes to a particular part of the screen.

const openSans = Open_Sans({
  weight: "500",
  display: "swap",
  subsets: ["latin"],
});

const NextPOPage = () => {
  return (
    <main className={openSans.className}>
      <PocketOperatorPage />
    </main>
  );
};

export default NextPOPage;
