"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SizeGuideModal from "@/components/ui/SizeGuideModal";
import { SHOP } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Style notes" },
  { href: "/contact", label: "Visit us" },
];

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display leading-none tracking-[-0.01em] ${className}`}>
      The Tinnsrack
    </span>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { itemCount, openDrawer } = useCart();
  const { items: wishlistItems } = useWishlist();
  const pathname = usePathname();

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <div className="bg-bordeaux text-porcelain">
        <p className="container-site py-2.5 text-center text-xs tracking-[0.02em]">
          <span className="sm:hidden">Same-day Nairobi delivery before 2pm</span>
          <span className="hidden sm:inline">Same-day delivery across Nairobi on orders placed before 2pm</span>
        </p>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-porcelain/95 backdrop-blur-md">
        <div className="container-site grid h-16 grid-cols-[1fr_auto_1fr] items-center sm:h-[4.5rem]">
          {/* Left: nav (desktop) / menu (mobile) */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors hover:text-bordeaux ${
                  isActive(link.href) ? "text-bordeaux" : "text-ink"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            className="-ml-2 flex h-10 w-10 items-center justify-center text-ink md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.4} />
          </button>

          {/* Centre: wordmark */}
          <Link href="/" aria-label="The Tinnsrack, home" className="text-ink">
            <Wordmark className="text-[1.375rem] sm:text-[1.875rem]" />
          </Link>

          {/* Right: utilities */}
          <div className="flex items-center justify-end gap-1 sm:gap-6">
            <button
              onClick={() => setSizeGuideOpen(true)}
              className="hidden text-sm text-ink transition-colors hover:text-bordeaux lg:block"
            >
              Size guide
            </button>
            <Link
              href="/wishlist"
              className="relative hidden h-10 items-center justify-center text-ink transition-colors hover:text-bordeaux sm:flex"
              aria-label={`Wishlist${wishlistItems.length ? `, ${wishlistItems.length} saved` : ""}`}
            >
              <Heart size={20} strokeWidth={1.4} />
              {wishlistItems.length > 0 && (
                <span className="absolute -right-1 top-1.5 h-1.5 w-1.5 rounded-full bg-bordeaux" />
              )}
            </Link>
            <button
              onClick={openDrawer}
              className="flex h-10 items-center text-sm text-ink transition-colors hover:text-bordeaux"
              aria-label={`Open bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
            >
              Bag
              <span className="ml-1.5 tabular-nums text-stone">({itemCount})</span>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 animate-fade-in bg-ink/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm animate-fade-in flex-col bg-porcelain">
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <Wordmark className="text-[1.375rem]" />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="-mr-2 flex h-10 w-10 items-center justify-center"
              >
                <X size={22} strokeWidth={1.4} />
              </button>
            </div>
            <nav className="flex flex-col px-5 pt-6" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-line py-4 font-display text-[1.75rem] text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/wishlist" className="border-b border-line py-4 font-display text-[1.75rem] text-ink">
                Wishlist
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setSizeGuideOpen(true);
                }}
                className="border-b border-line py-4 text-left font-display text-[1.75rem] text-ink"
              >
                Size guide
              </button>
            </nav>
            <div className="mt-auto space-y-1 px-5 pb-8 text-sm text-stone">
              <p>{SHOP.addressLine1}</p>
              <p>{SHOP.addressLine2}</p>
              <a href={SHOP.phoneHref} className="block pt-2 text-ink">
                {SHOP.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </>
  );
}
