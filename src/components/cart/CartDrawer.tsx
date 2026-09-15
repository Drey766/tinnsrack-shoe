"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, subtotal } = useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={closeDrawer} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-brand-dark shadow-2xl">
        <div className="flex items-center justify-between border-b border-brand-mid px-5 py-4">
          <h3 className="font-display text-lg font-bold">Your Cart</h3>
          <button onClick={closeDrawer} aria-label="Close cart" className="text-brand-muted hover:text-brand-gold">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-brand-light">
                Your cart&apos;s feeling a little bare — and so are your feet without these. 👠
              </p>
              <Link href="/shop" onClick={closeDrawer} className="btn-primary btn-step mt-5">
                Shop Now
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.selected_size}`} className="flex gap-3">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-dark2">
                    {item.product.images[0] && (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] uppercase tracking-wide text-brand-muted">{item.product.brand}</p>
                    <p className="line-clamp-2 text-sm font-semibold text-brand-white">{item.product.name}</p>
                    <p className="mt-1 text-xs text-brand-muted">
                      {item.product.color} · Size {item.selected_size}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-brand-mid px-1.5 py-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selected_size, item.quantity - 1)}
                          className="text-brand-muted hover:text-brand-gold"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-4 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selected_size, item.quantity + 1)}
                          className="text-brand-muted hover:text-brand-gold"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-semibold text-brand-gold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.selected_size)}
                    className="self-start text-brand-muted hover:text-brand-wine"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-brand-mid px-5 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-brand-light">Subtotal</span>
              <span className="font-display text-lg font-bold text-brand-gold">
                {formatPrice(subtotal)}
              </span>
            </div>
            <Link href="/cart" onClick={closeDrawer} className="btn-outline btn-step w-full">
              View Cart
            </Link>
            <Link href="/checkout" onClick={closeDrawer} className="btn-primary btn-step mt-3 w-full">
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
