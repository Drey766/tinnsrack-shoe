import { Suspense } from "react";
import products from "@/data/products.json";
import { Product } from "@/types";
import ShopContent from "@/components/shop/ShopContent";

function ShopSkeleton() {
  return (
    <div className="container-site section-padding">
      <div className="mb-8 h-10 w-48 animate-pulse rounded bg-brand-dark2" />
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-brand-dark2" />
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
