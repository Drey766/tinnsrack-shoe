"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/shop/ProductCard";

export default function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container-site py-28 text-center lg:py-40">
        <h1 className="display-lg">Nothing saved yet.</h1>
        <p className="mx-auto mt-4 max-w-sm text-ink/70">
          Tap the heart on any pair to keep it here while you decide.
        </p>
        <Link href="/shop" className="btn-primary mt-10">
          Shop the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container-site pb-24 pt-12 sm:pt-16 lg:pb-32">
      <header className="mb-12 border-b border-line pb-10">
        <h1 className="display-lg">Wishlist</h1>
        <p className="mt-3 text-sm text-stone">
          {items.length} saved {items.length === 1 ? "pair" : "pairs"}
        </p>
      </header>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-16">
        {items.map((item) => (
          <li key={item.product.id}>
            <ProductCard product={item.product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
