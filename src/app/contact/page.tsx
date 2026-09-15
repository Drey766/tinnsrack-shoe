"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, Instagram, ChevronDown } from "lucide-react";
import faqs from "@/data/faqs.json";
import { FAQ } from "@/types";

const faqList = faqs as FAQ[];

function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(faqList[0]?.id ?? null);
  return (
    <div className="space-y-3">
      {faqList.map((f) => {
        const open = openId === f.id;
        return (
          <div key={f.id} className="card overflow-hidden">
            <button
              onClick={() => setOpenId(open ? null : f.id)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="font-semibold text-brand-white">{f.q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-brand-gold transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <p className="px-5 pb-4 text-sm leading-relaxed text-brand-light/85">{f.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    setSent(true);
  };

  return (
    <div className="container-site section-padding">
      <div className="mb-12 text-center">
        <span className="section-tag">Come Find Us</span>
        <h1 className="mt-2 text-4xl font-bold">Visit Us on Tom Mboya</h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="card space-y-4 p-6">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="mt-0.5 shrink-0 text-brand-gold" />
              <div>
                <p className="font-semibold text-brand-white">Shop F17, Beba Beba Trade Center</p>
                <p className="text-sm text-brand-muted">Tom Mboya Street, Nairobi</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={20} className="mt-0.5 shrink-0 text-brand-gold" />
              <div>
                <a href="tel:0768008365" className="font-semibold text-brand-white hover:text-brand-gold">0768 008 365</a>
                <p className="text-sm text-brand-muted">Call or WhatsApp</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={20} className="mt-0.5 shrink-0 text-brand-gold" />
              <div>
                <p className="font-semibold text-brand-white">Mon–Sat, 9AM–7PM</p>
                <p className="text-sm text-brand-muted">Order before 2PM for same-day Nairobi delivery</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Instagram size={20} className="mt-0.5 shrink-0 text-brand-gold" />
              <div>
                <a href="https://www.instagram.com/shoes_by_tinnsrack" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-white hover:text-brand-gold">
                  @shoes_by_tinnsrack
                </a>
                <p className="text-sm text-brand-muted">
                  Dresses on our sister page{" "}
                  <a href="https://www.instagram.com/the_tinnsrack/" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">
                    @the_tinnsrack
                  </a>
                </p>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/254768008365"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp btn-step w-full"
          >
            Chat with Us on WhatsApp
          </a>

          {sent ? (
            <div className="card p-6 text-center">
              <p className="text-brand-gold">
                Thanks, {form.name || "friend"} — we&apos;ve got your message and will get back to you soon. 💛
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-4 p-6">
              <h3 className="font-display text-lg font-bold">Send Us a Message</h3>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Your name"
                className="input"
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="Your email (optional)"
                className="input"
              />
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="How can we help?"
                className="input resize-none"
              />
              <button type="submit" className="btn-primary btn-step w-full">
                Send Message
              </button>
            </form>
          )}
        </div>

        <div>
          <h3 className="mb-4 font-display text-xl font-bold">Frequently Asked</h3>
          <FaqAccordion />
        </div>
      </div>
    </div>
  );
}
