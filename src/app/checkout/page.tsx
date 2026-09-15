"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice, KENYA_COUNTIES, getShippingFee, isSameDayEligible } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    county: "Nairobi",
    town: "",
    address: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const shippingFee = getShippingFee(form.county);
  const sameDay = isSameDayEligible(form.county);
  const total = subtotal + shippingFee;

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            color: i.product.color,
            size: i.selected_size,
            quantity: i.quantity,
            price: i.product.price,
          })),
          subtotal,
          shippingFee,
          total,
          sameDay,
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      setConfirmed(true);
      clearCart();
    } catch {
      setError("Something went wrong sending your order. Please try again or WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <div className="container-site section-padding text-center">
        <div className="mx-auto max-w-md">
          <p className="text-5xl">🚚✨</p>
          <h1 className="mt-4 font-display text-2xl font-bold">
            Order confirmed! Your new favourites are on their way.
          </h1>
          <p className="mt-2 text-brand-light/85">
            {sameDay ? "Same-day delivery, just like we promised." : "We'll have them with you first thing tomorrow."}
          </p>
          <p className="mt-4 text-sm text-brand-muted">
            Complete the M-Pesa prompt on your phone to finalise payment. Questions? WhatsApp
            us at 0768 008 365.
          </p>
          <Link href="/shop" className="btn-primary btn-step mt-6">
            Keep Browsing
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-site section-padding text-center">
        <p className="text-lg text-brand-light">Your cart is empty — add a pair before checking out.</p>
        <Link href="/shop" className="btn-primary btn-step mt-6">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="container-site section-padding">
      <h1 className="mb-8 text-3xl font-bold sm:text-4xl">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <div>
            <label className="label mb-1.5 block">Full Name</label>
            <input required value={form.name} onChange={handleChange("name")} className="input" placeholder="Your name" />
          </div>
          <div>
            <label className="label mb-1.5 block">Phone Number (M-Pesa)</label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={handleChange("phone")}
              className="input"
              placeholder="07XX XXX XXX"
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label mb-1.5 block">County</label>
              <select required value={form.county} onChange={handleChange("county")} className="input">
                {KENYA_COUNTIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label mb-1.5 block">Town</label>
              <input required value={form.town} onChange={handleChange("town")} className="input" placeholder="e.g. Kilimani" />
            </div>
          </div>
          <div>
            <label className="label mb-1.5 block">Delivery Address</label>
            <input
              required
              value={form.address}
              onChange={handleChange("address")}
              className="input"
              placeholder="Building, street, landmark"
            />
          </div>

          <div className="card border-brand-gold/40 p-4">
            {sameDay ? (
              <p className="text-sm text-brand-gold">
                🚚 Order before 2PM for same-day delivery in Nairobi — you&apos;re on track!
              </p>
            ) : (
              <p className="text-sm text-brand-muted">
                🚚 Orders after 2PM (or outside Nairobi) arrive first thing the next day.
              </p>
            )}
          </div>

          {error && <p className="text-sm text-brand-wine">{error}</p>}
        </div>

        <div className="card h-fit p-6">
          <h3 className="mb-4 font-display text-lg font-bold">Order Summary</h3>
          <ul className="mb-4 space-y-2 text-sm text-brand-light/85">
            {items.map((i) => (
              <li key={`${i.product.id}-${i.selected_size}`} className="flex justify-between gap-2">
                <span className="line-clamp-1">
                  {i.product.name} · {i.selected_size} × {i.quantity}
                </span>
                <span className="shrink-0">{formatPrice(i.product.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-1.5 border-t border-brand-mid pt-3 text-sm text-brand-light/85">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{formatPrice(shippingFee)}</span>
            </div>
          </div>
          <div className="mt-3 flex justify-between border-t border-brand-mid pt-3">
            <span className="font-semibold text-brand-white">Total</span>
            <span className="font-display text-xl font-bold text-brand-gold">{formatPrice(total)}</span>
          </div>
          <button type="submit" disabled={submitting} className="btn-primary btn-step mt-6 w-full disabled:opacity-60">
            {submitting ? "Lacing up your order..." : "Pay with M-Pesa"}
          </button>
          <p className="mt-3 text-center text-xs text-brand-muted">
            You&apos;ll get an M-Pesa prompt on your phone to complete payment.
          </p>
        </div>
      </form>
    </div>
  );
}
