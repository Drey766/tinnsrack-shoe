"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, productTitle } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({
  product,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: {
  product: Product;
  sizes?: string;
}) {
  const { isInWishlist, toggleItem } = useWishlist();
  const saved = isInWishlist(product.id);
  const title = productTitle(product);
  const [primary, secondary] = product.images;

  return (
    <article className="group relative">
      <Link href={`/shop/${product.slug}`} className="product-frame block aspect-[3/4]" tabIndex={-1} aria-hidden="true">
        {primary ? (
          <>
            <Image
              src={primary}
              alt=""
              fill
              sizes={sizes}
              className="object-cover object-bottom transition-opacity duration-700 ease-out group-hover:opacity-0"
            />
            {secondary && (
              <Image
                src={secondary}
                alt=""
                fill
                sizes={sizes}
                className="object-cover object-bottom opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-stone">Photo coming soon</div>
        )}

        {(product.is_new || !product.in_stock) && (
          <span className="absolute left-3 top-3 bg-porcelain px-2.5 py-1 text-[0.75rem] text-ink">
            {!product.in_stock ? "Sold out" : "New"}
          </span>
        )}
      </Link>

      <button
        onClick={() => toggleItem(product)}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-porcelain/85 text-ink backdrop-blur-sm transition-colors hover:text-bordeaux"
        aria-label={saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
        aria-pressed={saved}
      >
        <Heart size={18} strokeWidth={1.4} className={saved ? "fill-bordeaux text-bordeaux" : ""} />
      </button>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="text-xs text-stone">{product.brand}</p>
          <h3 className="mt-1 font-sans text-sm font-normal leading-snug tracking-normal text-ink sm:text-[0.9375rem]">
            <Link href={`/shop/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {title}
            </Link>
          </h3>
          <p className="mt-1 hidden text-xs text-stone sm:block">{product.color}</p>
        </div>
        <p className="shrink-0 text-sm tabular-nums text-ink sm:text-[0.9375rem]">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
