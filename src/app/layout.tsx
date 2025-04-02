import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hyperaware",
  description:
    "Hyperaware is your trusted partner for SEO, social media marketing, branding, and web development. Drive measurable business growth with our expert strategies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Facebook Pixel Script */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !(function(f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function() {
                  n.callMethod
                    ? n.callMethod.apply(n, arguments)
                    : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = "2.0";
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
              })(window, document, "script",
              "https://connect.facebook.net/en_US/fbevents.js");

              fbq("init", "1407982033896878");
              fbq("track", "PageView");
            `,
          }}
        />
      </head>
      <body>
        {/* NoScript for Facebook Pixel */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1407982033896878&ev=PageView&noscript=1"
            alt="fb-pixel"
          />
        </noscript>

        <Navbar className="navbar-slide" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
