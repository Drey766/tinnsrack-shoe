"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/shop/ProductCard";

export default function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container-site section-padding text-center">
        <p className="mx-auto max-w-md text-lg text-brand-light">
          No favourites saved yet? Go on, fall in love with a pair. 💛
        </p>
        <Link href="/shop" className="btn-primary btn-step mt-6">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container-site section-padding">
      <h1 className="mb-8 text-3xl font-bold sm:text-4xl">Your Wishlist</h1>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <ProductCard key={item.product.id} product={item.product} />
        ))}
      </div>
    </div>
  );
}
