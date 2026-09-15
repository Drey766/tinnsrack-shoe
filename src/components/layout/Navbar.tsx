"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Heart, Menu, X, Ruler } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SizeGuideModal from "@/components/ui/SizeGuideModal";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Style Notes" },
  { href: "/contact", label: "Visit Us" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { itemCount, openDrawer } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <header className="sticky top-0 z-40 border-b border-brand-mid/60 bg-brand-black/90 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="font-display text-xl font-bold tracking-wide text-brand-white sm:text-2xl">
          The <span className="text-brand-gold">Tinnsrack</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-light/90 transition-colors hover:text-brand-gold"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => setSizeGuideOpen(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-brand-light/90 transition-colors hover:text-brand-gold"
          >
            <Ruler size={15} />
            Find Your Fit
          </button>
        </nav>

        <div className="flex items-center gap-4 sm:gap-5">
          <Link href="/wishlist" className="relative text-brand-light transition-colors hover:text-brand-gold" aria-label="Wishlist">
            <Heart size={22} />
            {wishlistItems.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brand-blush px-1 text-[10px] font-bold text-brand-black">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <button
            onClick={openDrawer}
            className="relative text-brand-light transition-colors hover:text-brand-gold"
            aria-label="Cart"
          >
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brand-gold px-1 text-[10px] font-bold text-brand-black">
                {itemCount}
              </span>
            )}
          </button>
          <button
            className="text-brand-light md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-brand-mid/60 bg-brand-black px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-light"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setSizeGuideOpen(true);
                setMobileOpen(false);
              }}
              className="flex items-center gap-1.5 text-left text-sm font-medium text-brand-light"
            >
              <Ruler size={15} />
              Find Your Fit
            </button>
          </div>
        </nav>
      )}

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </header>
  );
}
