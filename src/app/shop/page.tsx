import { Suspense } from "react";
import type { Metadata } from "next";
import products from "@/data/products.json";
import { Product } from "@/types";
import ShopContent from "@/components/shop/ShopContent";

export const metadata: Metadata = {
  title: "Shop the collection | The Tinnsrack",
  description: "Heels, mules and sandals from Nine West, Julz, Stylish Sisters and more. Same-day delivery in Nairobi.",
};

function ShopSkeleton() {
  return (
    <div className="container-site pb-24 pt-12 sm:pt-16">
      <div className="mb-12 h-16 w-72 animate-pulse bg-tissue" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse bg-tissue" />
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopContent allProducts={products as Product[]} />
    </Suspense>
  );
}
