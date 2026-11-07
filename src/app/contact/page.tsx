"use client";

import { useState } from "react";
import AccordionIcon from "@/components/ui/AccordionIcon";
import faqs from "@/data/faqs.json";
import { FAQ } from "@/types";
import { SHOP, whatsappLink } from "@/lib/utils";

const faqList = faqs as FAQ[];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    setSent(true);
  };

  return (
    <div>
      <section className="container-site grid gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-12 lg:pb-28">
        <div className="lg:col-span-6">
          <h1 className="display-xl !text-[clamp(3rem,7vw,6.5rem)]">Visit the boutique.</h1>
          <p className="lede mt-8">
            Come and try on as many pairs as you like at our shop in Beba Beba Trade Center. Or
            message us and we&apos;ll help you choose from wherever you are.
          </p>
        </div>

        <dl className="grid gap-x-10 gap-y-10 self-end sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
          <div className="border-t border-ink pt-5">
            <dt className="text-xs text-stone">Address</dt>
            <dd className="mt-3 font-display text-[1.375rem] leading-snug">
              {SHOP.addressLine1}
              <br />
              {SHOP.addressLine2}
            </dd>
            <a href={SHOP.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-link mt-4 !text-sm">
              Get directions
            </a>
          </div>
          <div className="border-t border-ink pt-5">
            <dt className="text-xs text-stone">Opening hours</dt>
            <dd className="mt-3 font-display text-[1.375rem] leading-snug">
              Monday to Saturday
              <br />
              9am – 7pm
            </dd>
          </div>
          <div className="border-t border-ink pt-5">
            <dt className="text-xs text-stone">Phone and WhatsApp</dt>
            <dd className="mt-3 font-display text-[1.375rem]">
              <a href={SHOP.phoneHref} className="hover:text-bordeaux">
                {SHOP.phoneDisplay}
              </a>
            </dd>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-link mt-4 !text-sm">
              Message us on WhatsApp
            </a>
          </div>
          <div className="border-t border-ink pt-5">
            <dt className="text-xs text-stone">Instagram</dt>
            <dd className="mt-3 space-y-1 text-[0.9375rem]">
              <a href={SHOP.instagram} target="_blank" rel="noopener noreferrer" className="block hover:text-bordeaux">
                {SHOP.instagramHandle}
              </a>
              <a href={SHOP.sisterInstagram} target="_blank" rel="noopener noreferrer" className="block text-ink/70 hover:text-bordeaux">
                {SHOP.sisterHandle} for dresses
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <section className="bg-tissue/60">
        <div className="container-site grid gap-16 py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
          <div className="lg:col-span-6">
            <h2 className="display-lg">Questions, answered.</h2>
            <div className="mt-10 border-t border-ink/15">
              {faqList.map((f, i) => (
                <details key={f.id} className="group accordion border-b border-ink/15" open={i === 0}>
                  <summary className="!py-6 !text-base">
                    <span className="pr-6">{f.q}</span>
                    <AccordionIcon size={18} />
                  </summary>
                  <p className="max-w-xl pb-6 text-[0.9375rem] leading-relaxed text-ink/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="display-md">Write to us</h2>
            <p className="mt-3 text-sm text-ink/70">We reply within a day. For anything urgent, WhatsApp is quickest.</p>
            {sent ? (
              <div className="mt-10 border-l-2 border-bordeaux py-2 pl-5">
                <p className="font-display text-[1.375rem]">Thank you, {form.name.split(" ")[0]}.</p>
                <p className="mt-2 text-sm text-ink/70">Your message is with us. We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                <div>
                  <label htmlFor="ct-name" className="field-label">Name</label>
                  <input
                    id="ct-name"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="ct-email" className="field-label">Email (optional)</label>
                  <input
                    id="ct-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="ct-message" className="field-label">Message</label>
                  <textarea
                    id="ct-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="input resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
