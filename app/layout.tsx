import type { Metadata, Viewport } from "next";
import { DM_Sans, Jost, Poppins, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "lenis/dist/lenis.css";
import ModalProvider from "./components/ModalProvider";
import SmoothScroll from "./components/SmoothScroll";

const GTM_ID = "GTM-P4J3HNT2";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

/* Display face used for the section headings, self-hosted from public/Fonts. */
const scaver = localFont({
  src: "../public/Fonts/Scaver-Regular.ttf",
  variable: "--font-scaver",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codenamecrown.synovative.in"),
  title: "Codename Crown — 1, 2 & 3 BHK Flats in Mulund East | Prabhav Construction",
  description:
    "Codename Crown, Mulund East — G+39 storeys, 1, 2 & 3 BHK residences on 90ft Road with four homes per floor, private balconies and 15+ lifestyle amenities. MahaRERA P51900008403.",
  keywords: [
    "Codename Crown",
    "flats in Mulund East",
    "1 2 3 BHK Mulund East",
    "Prabhav Construction",
    "apartments in Mulund East",
    "new project Mumbai",
  ],
  openGraph: {
    title: "Codename Crown — 1, 2 & 3 BHK Flats in Mulund East",
    description:
      "A thoughtfully planned residential address on 90ft Road, Mulund East. G+39 storeys, four homes per floor, 15+ amenities.",
    url: "/",
    siteName: "Codename Crown",
    locale: "en_IN",
    type: "website",
    images: ["/images/Slider-pg-1.jpg.jpeg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#612F15",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${poppins.variable} ${roboto.variable} ${dmSans.variable} ${scaver.variable}`}
    >
      <head>
        {/* Google Tag Manager, verbatim from the container's install snippet,
            first thing in <head> as Google asks. */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga -- the
            suggested component injects into <body> and emits no <noscript>
            fallback, so it would add a dependency and move the tag lower. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>

      <body>
        {/* Google Tag Manager (noscript) — must stay the first thing in <body>. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <SmoothScroll>
          <ModalProvider>{children}</ModalProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
