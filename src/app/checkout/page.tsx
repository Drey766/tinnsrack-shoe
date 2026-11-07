"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import {
  SHOP,
  formatPrice,
  KENYA_COUNTIES,
  getShippingFee,
  isSameDayEligible,
  productTitle,
} from "@/lib/utils";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    county: "Nairobi",
    town: "",
    address: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ name: string; phone: string; sameDay: boolean } | null>(null);

  const shippingFee = getShippingFee(form.county);
  const sameDay = isSameDayEligible(form.county);
  const total = subtotal + shippingFee;

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      setConfirmed({ name: form.name.split(" ")[0], phone: form.phone, sameDay });
      clearCart();
    } catch {
      setError(
        `We couldn't send your order. Check your connection and try again, or WhatsApp us on ${SHOP.phoneDisplay}.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <div className="container-site py-24 lg:py-36">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="display-lg">Thank you{confirmed.name ? `, ${confirmed.name}` : ""}.</h1>
          <p className="mt-6 text-[1.125rem] text-ink/75">
            We&apos;ve sent an M-Pesa payment request to {confirmed.phone}. Enter your PIN on your phone to
            complete the order.
          </p>
          <p className="mt-4 text-ink/75">
            {confirmed.sameDay
              ? "Once payment clears, your pair goes out for delivery this afternoon."
              : "Once payment clears, your pair arrives first thing tomorrow."}
          </p>
          <p className="mt-10 text-sm text-stone">
            Didn&apos;t get the prompt? WhatsApp or call us on{" "}
            <a href={SHOP.phoneHref} className="text-ink underline underline-offset-4">
              {SHOP.phoneDisplay}
            </a>
            .
          </p>
          <Link href="/shop" className="btn-secondary mt-10">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-site py-28 text-center lg:py-40">
        <h1 className="display-lg">Your bag is empty.</h1>
        <p className="mx-auto mt-4 max-w-sm text-ink/70">Add a pair to your bag to check out.</p>
        <Link href="/shop" className="btn-primary mt-10">
          Shop the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container-site pb-24 pt-12 sm:pt-16 lg:pb-32">
      <header className="mb-12 border-b border-line pb-10">
        <h1 className="display-lg">Checkout</h1>
      </header>

      <form onSubmit={handleSubmit} className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-12 lg:col-span-7">
          <fieldset>
            <legend className="font-display text-[1.625rem]">Your details</legend>
            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="co-name" className="field-label">Full name</label>
                <input id="co-name" required autoComplete="name" value={form.name} onChange={handleChange("name")} className="input" />
              </div>
              <div>
                <label htmlFor="co-phone" className="field-label">M-Pesa phone number</label>
                <input
                  id="co-phone"
                  required
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  className="input"
                  placeholder="07XX XXX XXX"
                  aria-describedby="co-phone-hint"
                />
                <p id="co-phone-hint" className="mt-2 text-xs text-stone">
                  We&apos;ll send the payment request to this number.
                </p>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-display text-[1.625rem]">Delivery</legend>
            <div className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="co-county" className="field-label">County</label>
                  <select id="co-county" required value={form.county} onChange={handleChange("county")} className="input">
                    {KENYA_COUNTIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="co-town" className="field-label">Town or estate</label>
                  <input id="co-town" required value={form.town} onChange={handleChange("town")} className="input" placeholder="e.g. Kilimani" />
                </div>
              </div>
              <div>
                <label htmlFor="co-address" className="field-label">Delivery address</label>
                <input
                  id="co-address"
                  required
                  autoComplete="street-address"
                  value={form.address}
                  onChange={handleChange("address")}
                  className="input"
                  placeholder="Building, street and a landmark"
                />
              </div>
              <p className="border-l-2 border-bordeaux py-1 pl-4 text-sm text-ink/80">
                {sameDay
                  ? "Arrives today. Your order qualifies for same-day delivery in Nairobi."
                  : form.county === "Nairobi"
                    ? "Arrives tomorrow morning. Same-day delivery is for orders placed before 2pm."
                    : `Arrives tomorrow. Delivery to ${form.county} is ${formatPrice(shippingFee)}.`}
              </p>
            </div>
          </fieldset>
        </div>

        <aside className="lg:col-span-5">
          <div className="bg-tissue/70 p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 className="display-md">Your order</h2>
            <ul className="mt-6 divide-y divide-ink/10">
              {items.map((i) => (
                <li key={`${i.product.id}-${i.selected_size}`} className="flex gap-4 py-4">
                  <div className="product-frame h-20 w-16 shrink-0 bg-tissue-deep">
                    {i.product.images[0] && (
                      <Image src={i.product.images[0]} alt="" fill sizes="64px" className="object-cover object-bottom" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="leading-snug">{productTitle(i.product)}</p>
                    <p className="mt-1 text-xs text-stone">
                      Size {i.selected_size}
                      {i.quantity > 1 && `, ${i.quantity} pairs`}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm tabular-nums">{formatPrice(i.product.price * i.quantity)}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-3 border-t border-ink/15 pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink/70">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/70">Delivery{sameDay ? " (same day)" : ""}</dt>
                <dd className="tabular-nums">{formatPrice(shippingFee)}</dd>
              </div>
            </dl>
            <div className="mt-6 flex items-baseline justify-between border-t border-ink/15 pt-6">
              <span>Total</span>
              <span className="text-[1.5rem] tabular-nums">{formatPrice(total)}</span>
            </div>

            {error && (
              <p className="mt-6 text-sm text-bordeaux" role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={submitting} className="btn-primary mt-8 w-full">
              {submitting ? "Sending payment request…" : `Pay ${formatPrice(total)} with M-Pesa`}
            </button>
            <p className="mt-4 text-center text-xs text-stone">
              You&apos;ll get a prompt on your phone to enter your M-Pesa PIN.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
