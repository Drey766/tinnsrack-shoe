import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Tinnsrack — Luxury Women's Shoes, Nairobi",
  description:
    "Satin mules, crystal pumps and designer heels, chosen pair by pair at our Tom Mboya Street boutique. Same-day delivery across Nairobi; pay with M-Pesa.",
  keywords: [
    "shoes Nairobi",
    "heels Kenya",
    "luxury shoes Nairobi",
    "The Tinnsrack",
    "same day shoe delivery Nairobi",
  ],
  openGraph: {
    title: "The Tinnsrack — Luxury Women's Shoes, Nairobi",
    description:
      "Satin mules, crystal pumps and designer heels. Same-day delivery across Nairobi.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${jost.variable}`}>
      <body>
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <CartDrawer />
            <main className="min-h-[60vh]">{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
