"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Phone, MapPin } from "lucide-react";

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
    <footer className="border-t border-brand-mid/60 bg-brand-dark">
      <div className="container-site section-padding !py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-display text-xl font-bold text-brand-white">
              The <span className="text-brand-gold">Tinnsrack</span>
            </Link>
            <p className="mt-3 font-accent italic text-brand-muted">
              Luxury & classy shoes. Nairobi&apos;s favourite step. 👠
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/shoes_by_tinnsrack"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-mid text-brand-light transition-colors hover:border-brand-gold hover:text-brand-gold"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="label mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm text-brand-light/85">
              <li><Link href="/shop" className="hover:text-brand-gold">All Shoes</Link></li>
              <li><Link href="/shop?category=heels" className="hover:text-brand-gold">Heels & Pumps</Link></li>
              <li><Link href="/shop?category=sandals" className="hover:text-brand-gold">Sandals & Wedges</Link></li>
              <li><Link href="/wishlist" className="hover:text-brand-gold">Wishlist</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="label mb-4">Visit Us on Tom Mboya</h4>
            <ul className="space-y-2.5 text-sm text-brand-light/85">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-gold" />
                Shop F17, Beba Beba Trade Center, Tom Mboya Street, Nairobi
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-brand-gold" />
                <a href="tel:0768008365" className="hover:text-brand-gold">0768 008 365</a>
              </li>
              <li>
                <a href="https://www.instagram.com/the_tinnsrack/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold">
                  Sister page: @the_tinnsrack (dresses)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="label mb-4">Stay In The Loop</h4>
            <p className="mb-4 text-sm text-brand-light/85">
              New drops, restocks, and first access to sales. Straight to your inbox.
            </p>
            {submitted ? (
              <p className="text-sm text-brand-gold">You&apos;re on the list — welcome in. 💛</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="input !py-2.5 text-sm"
                />
                <button type="submit" className="btn-outline !px-4 !py-2.5 !text-xs whitespace-nowrap">
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-brand-mid/60 pt-6 text-xs text-brand-muted sm:flex-row">
          <p>&copy; {new Date().getFullYear()} The Tinnsrack. All rights reserved.</p>
          <p>Luxury & classy shoes. Nairobi&apos;s favourite step. 👠</p>
        </div>
      </div>
    </footer>
  );
}
