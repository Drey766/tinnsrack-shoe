"use client";

import { useState } from "react";
import Link from "next/link";
import { SHOP, whatsappLink } from "@/lib/utils";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="mt-auto bg-tissue text-ink">
      <div className="container-site pb-10 pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="display-md max-w-md">First look at new arrivals.</h2>
            <p className="mt-4 max-w-sm text-sm text-ink/70">
              New pairs, restocks and the occasional private sale. A few emails a month.
            </p>
            {submitted ? (
              <p className="mt-8 text-sm text-bordeaux">Thank you. You&apos;re on the list.</p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex max-w-md gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="input"
                />
                <button type="submit" className="btn-primary shrink-0">
                  Sign up
                </button>
              </form>
            )}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            <div>
              <h3 className="mb-5 font-sans text-xs font-medium tracking-normal text-stone">Shop</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/shop" className="hover:text-bordeaux">All shoes</Link></li>
                <li><Link href="/shop?category=heels" className="hover:text-bordeaux">Heels</Link></li>
                <li><Link href="/shop?category=sandals" className="hover:text-bordeaux">Sandals &amp; wedges</Link></li>
                <li><Link href="/wishlist" className="hover:text-bordeaux">Wishlist</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-5 font-sans text-xs font-medium tracking-normal text-stone">Help</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/contact" className="hover:text-bordeaux">Delivery &amp; FAQs</Link></li>
                <li><Link href="/blog" className="hover:text-bordeaux">Style notes</Link></li>
                <li>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-bordeaux">
                    WhatsApp us
                  </a>
                </li>
                <li><a href={SHOP.phoneHref} className="hover:text-bordeaux">{SHOP.phoneDisplay}</a></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="mb-5 font-sans text-xs font-medium tracking-normal text-stone">The boutique</h3>
              <address className="space-y-1 text-sm not-italic">
                <p>{SHOP.addressLine1}</p>
                <p>{SHOP.addressLine2}</p>
                <p className="pt-2 text-ink/70">{SHOP.hours}</p>
              </address>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <a href={SHOP.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-bordeaux">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={SHOP.sisterInstagram} target="_blank" rel="noopener noreferrer" className="hover:text-bordeaux">
                    Dresses at {SHOP.sisterHandle}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 border-t border-ink/10 pt-8">
          <p
            aria-hidden="true"
            className="select-none whitespace-nowrap font-display leading-[0.9] tracking-[-0.035em] text-bordeaux"
            style={{ fontSize: "clamp(2.75rem, 13.6vw, 14.5rem)" }}
          >
            The Tinnsrack
          </p>
          <div className="mt-8 flex flex-col justify-between gap-2 text-xs text-stone sm:flex-row">
            <p>&copy; {new Date().getFullYear()} The Tinnsrack, Nairobi</p>
            <p>Pay securely with M-Pesa</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
