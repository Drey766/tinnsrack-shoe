"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }: { product: Product }) {
  const { isInWishlist, toggleItem } = useWishlist();
  const saved = isInWishlist(product.id);

  return (
    <div className="shoe-card group">
      <Link href={`/shop/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-brand-dark2 text-brand-muted">
            No image
          </div>
        )}

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.is_new && <span className="badge-new">New In</span>}
          {!product.in_stock && <span className="badge-soldout">Sold Out</span>}
        </div>
      </Link>

      <button
        onClick={() => toggleItem(product)}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand-black/60 backdrop-blur transition-colors hover:bg-brand-black"
        aria-label="Save to wishlist"
      >
        <Heart size={17} className={saved ? "fill-brand-blush text-brand-blush" : "text-brand-white"} />
      </button>

      <div className="p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
          {product.brand}
        </p>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 font-display text-base font-semibold leading-snug text-brand-white transition-colors group-hover:text-brand-gold">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center justify-between">
          <p className="font-display text-lg font-bold text-brand-gold">
            {formatPrice(product.price)}
          </p>
          <div className="flex items-center gap-1 text-xs text-brand-muted">
            <Star size={12} className="fill-brand-gold text-brand-gold" />
            {product.rating}
          </div>
        </div>

        <p className="mt-1.5 text-xs text-brand-muted">
          {product.color} · Sizes {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}
        </p>

        <span className="badge-sameday mt-3">🚚 Same-Day Delivery</span>
      </div>
    </div>
  );
}
