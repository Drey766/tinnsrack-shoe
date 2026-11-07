"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, productTitle } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-site py-28 text-center lg:py-40">
        <h1 className="display-lg">Your bag is empty.</h1>
        <p className="mx-auto mt-4 max-w-sm text-ink/70">Find a pair you love and it will wait for you here.</p>
        <Link href="/shop" className="btn-primary mt-10">
          Shop the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container-site pb-24 pt-12 sm:pt-16 lg:pb-32">
      <header className="mb-12 border-b border-line pb-10">
        <h1 className="display-lg">Your bag</h1>
        <p className="mt-3 text-sm text-stone">
          {itemCount} {itemCount === 1 ? "pair" : "pairs"}
        </p>
      </header>

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <ul className="divide-y divide-line border-b border-line lg:col-span-8">
          {items.map((item) => (
            <li key={`${item.product.id}-${item.selected_size}`} className="flex gap-5 py-8 first:pt-0 sm:gap-8">
              <Link href={`/shop/${item.product.slug}`} className="product-frame h-40 w-[7.5rem] shrink-0 sm:h-52 sm:w-40">
                {item.product.images[0] && (
                  <Image src={item.product.images[0]} alt="" fill sizes="160px" className="object-cover object-bottom" />
                )}
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-6">
                  <div className="min-w-0">
                    <p className="text-xs text-stone">{item.product.brand}</p>
                    <Link href={`/shop/${item.product.slug}`} className="mt-1 block font-display text-[1.375rem] leading-tight hover:text-bordeaux sm:text-[1.625rem]">
                      {productTitle(item.product)}
                    </Link>
                    <p className="mt-2 text-sm text-stone">
                      {item.product.color}, size {item.selected_size}
                    </p>
                  </div>
                  <p className="shrink-0 tabular-nums sm:text-[1.125rem]">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
                <div className="mt-auto flex items-center gap-6 pt-5">
                  <div className="flex items-center border border-line bg-white">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selected_size, item.quantity - 1)}
                      className="flex h-10 w-10 items-center justify-center hover:text-bordeaux disabled:text-line"
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} strokeWidth={1.5} />
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selected_size, item.quantity + 1)}
                      className="flex h-10 w-10 items-center justify-center hover:text-bordeaux"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.selected_size)}
                    className="text-sm text-stone underline underline-offset-4 hover:text-ink"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="lg:col-span-4">
          <div className="bg-tissue/70 p-8 lg:sticky lg:top-28">
            <h2 className="display-md">Summary</h2>
            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink/70">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/70">Delivery</dt>
                <dd className="text-ink/70">Added at checkout</dd>
              </div>
            </dl>
            <div className="mt-6 flex items-baseline justify-between border-t border-ink/15 pt-6">
              <span>Total</span>
              <span className="text-[1.375rem] tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <Link href="/checkout" className="btn-primary mt-8 w-full">
              Checkout
            </Link>
            <Link href="/shop" className="mt-4 block text-center text-sm underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              Continue shopping
            </Link>
            <p className="mt-8 text-xs leading-relaxed text-stone">
              Same-day delivery in Nairobi on orders before 2pm. Pay with M-Pesa.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
