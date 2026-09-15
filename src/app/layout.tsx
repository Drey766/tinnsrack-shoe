import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic", "normal"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Tinnsrack — Luxury & Classy Shoes | Nairobi",
  description:
    "Heels, sandals & boots for the woman who means business — in every sense of the word. Same-day delivery across Nairobi. Shop F17, Beba Beba Trade Center, Tom Mboya Street.",
  keywords: [
    "shoes Nairobi",
    "heels Kenya",
    "luxury shoes Nairobi",
    "The Tinnsrack",
    "same day shoe delivery Nairobi",
  ],
  openGraph: {
    title: "The Tinnsrack — Luxury & Classy Shoes",
    description:
      "Heels, sandals & boots for the woman who means business. Same-day delivery across Nairobi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <CartDrawer />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
