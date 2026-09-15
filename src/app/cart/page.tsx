"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-site section-padding text-center">
        <p className="mx-auto max-w-md text-lg text-brand-light">
          Your cart&apos;s feeling a little bare — and so are your feet without these. 👠
        </p>
        <Link href="/shop" className="btn-primary btn-step mt-6">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container-site section-padding">
      <h1 className="mb-8 text-3xl font-bold sm:text-4xl">Your Cart</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <ul className="space-y-6">
          {items.map((item) => (
            <li
              key={`${item.product.id}-${item.selected_size}`}
              className="card flex gap-4 p-4"
            >
              <Link href={`/shop/${item.product.slug}`} className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-brand-dark2">
                {item.product.images[0] && (
                  <Image src={item.product.images[0]} alt={item.product.name} fill sizes="96px" className="object-cover" />
                )}
              </Link>
              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-wide text-brand-muted">{item.product.brand}</p>
                <Link href={`/shop/${item.product.slug}`} className="font-display text-base font-semibold text-brand-white hover:text-brand-gold">
                  {item.product.name}
                </Link>
                <p className="mt-1 text-sm text-brand-muted">
                  {item.product.color} · Size {item.selected_size}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-full border border-brand-mid px-2 py-1.5">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selected_size, item.quantity - 1)}
                      className="text-brand-muted hover:text-brand-gold"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-5 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selected_size, item.quantity + 1)}
                      className="text-brand-muted hover:text-brand-gold"
                      aria-label="Increase quantity"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <p className="font-display text-lg font-bold text-brand-gold">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.product.id, item.selected_size)}
                className="self-start text-brand-muted hover:text-brand-wine"
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>

        <div className="card h-fit p-6">
          <h3 className="mb-4 font-display text-lg font-bold">Order Summary</h3>
          <div className="flex justify-between text-sm text-brand-light/85">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-1 text-xs text-brand-muted">Delivery fee calculated at checkout.</p>
          <div className="mt-4 flex justify-between border-t border-brand-mid pt-4">
            <span className="font-semibold text-brand-white">Total</span>
            <span className="font-display text-xl font-bold text-brand-gold">{formatPrice(subtotal)}</span>
          </div>
          <Link href="/checkout" className="btn-primary btn-step mt-6 w-full">
            Proceed to Checkout
          </Link>
          <Link href="/shop" className="btn-ghost mt-4 justify-center">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
