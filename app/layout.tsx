import Script from "next/script";
import CookiePopup from "./_components/CookiesPopup";
import Footer from "./_components/footer/Footer";
import Header from "./_components/Header/Header";
import CustomCursor from "./_components/StickyCursor";
import { inter_font } from "./fonts";
import './globals.css';

export async function generateMetadata() {


  return {
    title: "Ban Tech",
    meta: [
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
    ],
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XZ1K9YXRSF"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-XZ1K9YXRSF');
					`}
        </Script>
      </head>
      <body
        className={`${inter_font.className} bg-[#f2f2f2]  md:pt-[120px] pt-[90px]`}
      >
        <Header />
        <CustomCursor />
        {children}
        <Footer />
        <CookiePopup />
      </body>
    </html>
  );
}
