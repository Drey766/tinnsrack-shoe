"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, productTitle } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="bag-title">
      <div className="absolute inset-0 animate-fade-in bg-ink/40" onClick={closeDrawer} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-[28rem] animate-slide-in flex-col bg-porcelain">
        <div className="flex h-16 items-center justify-between border-b border-line px-6 sm:h-[4.5rem]">
          <h2 id="bag-title" className="font-display text-[1.5rem]">
            Your bag <span className="font-sans text-sm text-stone">({itemCount})</span>
          </h2>
          <button
            onClick={closeDrawer}
            aria-label="Close bag"
            autoFocus
            className="-mr-2 flex h-10 w-10 items-center justify-center text-ink hover:text-bordeaux"
          >
            <X size={20} strokeWidth={1.4} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="display-md">Your bag is empty.</p>
            <p className="mt-3 text-sm text-ink/70">Pairs you add will wait for you here.</p>
            <Link href="/shop" onClick={closeDrawer} className="btn-primary mt-8">
              Shop the collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.selected_size}`} className="flex gap-4 py-6">
                  <Link
                    href={`/shop/${item.product.slug}`}
                    onClick={closeDrawer}
                    className="product-frame h-32 w-24 shrink-0"
                  >
                    {item.product.images[0] && (
                      <Image src={item.product.images[0]} alt="" fill sizes="96px" className="object-cover object-bottom" />
                    )}
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs text-stone">{item.product.brand}</p>
                        <Link
                          href={`/shop/${item.product.slug}`}
                          onClick={closeDrawer}
                          className="mt-0.5 block text-sm leading-snug hover:text-bordeaux"
                        >
                          {productTitle(item.product)}
                        </Link>
                        <p className="mt-1 text-xs text-stone">
                          {item.product.color}, size {item.selected_size}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm tabular-nums">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-line">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selected_size, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-ink hover:text-bordeaux disabled:text-line"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} strokeWidth={1.5} />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selected_size, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-ink hover:text-bordeaux"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selected_size)}
                        className="text-xs text-stone underline underline-offset-4 hover:text-ink"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line bg-white/60 px-6 pb-6 pt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm">Subtotal</span>
                <span className="text-[1.125rem] tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-stone">Delivery is added at checkout. Same day in Nairobi before 2pm.</p>
              <Link href="/checkout" onClick={closeDrawer} className="btn-primary mt-5 w-full">
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="mt-3 block text-center text-sm text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                View bag
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
