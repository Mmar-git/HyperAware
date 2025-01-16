import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
      <body>
        <Navbar className="navbar-slide" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
