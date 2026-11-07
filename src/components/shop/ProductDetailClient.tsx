"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/types";
import { formatOccasion, formatPrice, productTitle, whatsappLink } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/shop/ProductCard";
import AccordionIcon from "@/components/ui/AccordionIcon";
import SizeGuideModal from "@/components/ui/SizeGuideModal";

function Detail({ title, children, open = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details className="group accordion border-b border-line" open={open}>
      <summary>
        {title}
        <AccordionIcon size={16} />
      </summary>
      <div className="pb-6 text-sm leading-relaxed text-ink/75">{children}</div>
    </details>
  );
}

export default function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const saved = isInWishlist(product.id);
  const title = productTitle(product);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addItem(product, selectedSize, 1);
  };

  const onRailScroll = () => {
    const el = railRef.current;
    if (!el) return;
    setActiveSlide(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="pb-24 lg:pb-32">
      <div className="lg:container-site lg:grid lg:grid-cols-12 lg:gap-12 lg:pt-10">
        {/* Gallery: swipeable rail on mobile, stacked frames on desktop */}
        <div className="lg:col-span-7">
          <div
            ref={railRef}
            onScroll={onRailScroll}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto lg:block lg:space-y-4 lg:overflow-visible"
          >
            {product.images.map((img, i) => (
              <div key={img} className="product-frame aspect-[3/4] w-full shrink-0 snap-center lg:aspect-[4/5]">
                <Image
                  src={img}
                  alt={i === 0 ? `${product.brand} ${title} in ${product.color.toLowerCase()}` : `${title}, view ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-bottom"
                />
              </div>
            ))}
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex justify-center gap-2 lg:hidden" aria-hidden="true">
              {product.images.map((img, i) => (
                <span
                  key={img}
                  className={`h-[3px] w-6 transition-colors ${activeSlide === i ? "bg-ink" : "bg-line"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="container-site mt-8 lg:col-span-5 lg:mt-0 lg:max-w-none lg:px-0">
          <div className="lg:sticky lg:top-28">
            <nav aria-label="Breadcrumb" className="text-xs text-stone">
              <Link href="/shop" className="hover:text-ink">Shop</Link>
              <span className="mx-2">/</span>
              <Link href={`/shop?brand=${encodeURIComponent(product.brand)}`} className="hover:text-ink">
                {product.brand}
              </Link>
            </nav>

            <h1 className="mt-6 text-[2.5rem] leading-[1.05] sm:text-[3rem]">{title}</h1>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <p className="text-[1.25rem] tabular-nums">{formatPrice(product.price)}</p>
              {product.review_count > 0 && (
                <p className="text-xs text-stone">
                  Rated {product.rating} by {product.review_count} {product.review_count === 1 ? "customer" : "customers"}
                </p>
              )}
            </div>

            <p className="mt-8 text-sm">
              <span className="text-stone">Colour</span>
              <span className="ml-3">{product.color}</span>
            </p>

            <div className="mt-8">
              <div className="mb-3 flex items-baseline justify-between">
                <p className="text-sm">
                  <span className="text-stone">Size (EU)</span>
                  {selectedSize && <span className="ml-3">{selectedSize}</span>}
                </p>
                <button onClick={() => setSizeGuideOpen(true)} className="text-xs text-ink underline underline-offset-4 hover:text-bordeaux">
                  Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select a size">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    role="radio"
                    aria-checked={selectedSize === s}
                    onClick={() => {
                      setSelectedSize(s);
                      setSizeError(false);
                    }}
                    className="size-chip"
                    data-selected={selectedSize === s}
                    disabled={!product.in_stock}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="mt-3 text-xs text-bordeaux" role="alert">
                  Choose a size to add this pair to your bag.
                </p>
              )}
            </div>

            <div className="mt-8 flex gap-3">
              <button onClick={handleAddToCart} className="btn-primary flex-1" disabled={!product.in_stock}>
                {product.in_stock ? `Add to bag — ${formatPrice(product.price)}` : "Sold out"}
              </button>
              <button
                onClick={() => toggleItem(product)}
                className="btn-secondary w-12 !px-0"
                aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
                aria-pressed={saved}
              >
                <Heart size={18} strokeWidth={1.4} className={saved ? "fill-bordeaux text-bordeaux" : ""} />
              </button>
            </div>

            <p className="mt-5 text-sm text-ink/70">
              Need another size or colour?{" "}
              <a
                href={whatsappLink(`Hi! I'm asking about ${product.name} (${product.sku}). Is it available in my size?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-4 hover:text-bordeaux"
              >
                Ask us on WhatsApp
              </a>
            </p>

            <div className="mt-10 border-t border-line">
              <Detail title="Description" open>
                <p>{product.description}</p>
                {product.occasions.length > 0 && (
                  <p className="mt-4">
                    <span className="text-stone">Wear it for: </span>
                    {product.occasions.map((o) => formatOccasion(o).toLowerCase()).join(", ")}.
                  </p>
                )}
              </Detail>
              <Detail title="Materials and fit">
                <p>{product.style_details}</p>
                {product.heel_height && <p className="mt-3">Heel height: {product.heel_height}</p>}
                <p className="mt-3 text-stone">Reference {product.sku}</p>
              </Detail>
              <Detail title="Delivery and payment">
                <p>
                  Order before 2pm for same-day delivery anywhere in Nairobi (KSh 150). Orders outside
                  Nairobi, or placed after 2pm, arrive the next day (KSh 350 outside Nairobi).
                </p>
                <p className="mt-3">Pay with M-Pesa at checkout. You&apos;ll receive a prompt on your phone.</p>
              </Detail>
              <Detail title="Care">
                <p>Store in the box, away from heat and damp. Wipe clean with a soft dry cloth. Keep satin away from water.</p>
              </Detail>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-site mt-24 border-t border-line pt-16 lg:mt-32">
          <h2 className="display-md mb-10">You may also like</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
