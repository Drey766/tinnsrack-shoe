"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, MessageCircle, ChevronRight } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/shop/ProductCard";
import SizeGuideModal from "@/components/ui/SizeGuideModal";

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const saved = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addItem(product, selectedSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappHref = `https://wa.me/254768008365?text=${encodeURIComponent(
    `Hi! Ask about this pair: ${product.name} (${product.sku}) — is it available in my size?`
  )}`;

  return (
    <div className="container-site section-padding">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/shop" className="hover:text-brand-gold">Shop</Link>
        <ChevronRight size={12} />
        <span className="text-brand-light">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-mid bg-brand-dark">
            {product.images[activeImage] && (
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            )}
            {product.is_new && <span className="badge-new absolute left-4 top-4">New In</span>}
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-20 w-16 overflow-hidden rounded-lg border transition-colors ${
                    activeImage === i ? "border-brand-gold" : "border-brand-mid"
                  }`}
                >
                  <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold">{product.brand}</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-brand-white sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-brand-muted">
              <Star size={14} className="fill-brand-gold text-brand-gold" />
              {product.rating} ({product.review_count} reviews)
            </div>
            <span className="badge-sameday">🚚 Order before 2PM for same-day delivery</span>
          </div>

          <p className="mt-5 font-display text-3xl font-bold text-brand-gold">{formatPrice(product.price)}</p>

          {product.occasions.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.occasions.map((o) => (
                <span key={o} className="occasion-tag capitalize">{o.replace("-", " ")}</span>
              ))}
            </div>
          )}

          <p className="mt-6 leading-relaxed text-brand-light/90">{product.description}</p>

          <div className="mt-6">
            <p className="text-sm text-brand-light">
              <span className="text-brand-muted">Colour:</span> {product.color}
            </p>
            <p className="mt-1 text-xs text-brand-muted">
              Also available in other colours? WhatsApp us!
            </p>
          </div>

          {/* Size selector */}
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="label">Select Size</h4>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="btn-ghost !text-xs"
              >
                Find Your Fit
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSelectedSize(s);
                    setSizeError(false);
                  }}
                  className="size-chip"
                  data-selected={selectedSize === s}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="mt-2 text-xs text-brand-wine">Please select a size before adding to cart.</p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-7 flex gap-3">
            <button onClick={handleAddToCart} className="btn-primary btn-step flex-1">
              {added ? "Added! 👠" : "Add to Cart 👠"}
            </button>
            <button
              onClick={() => toggleItem(product)}
              className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border border-brand-mid transition-colors hover:border-brand-blush"
              aria-label="Save to wishlist"
            >
              <Heart size={20} className={saved ? "fill-brand-blush text-brand-blush" : "text-brand-light"} />
            </button>
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp btn-step mt-3 w-full"
          >
            <MessageCircle size={16} />
            Ask about this pair
          </a>

          {/* Style details */}
          <div className="mt-8 border-t border-brand-mid pt-6">
            <h4 className="label mb-2">Style Details</h4>
            <p className="text-sm leading-relaxed text-brand-light/85">{product.style_details}</p>
            {product.heel_height && (
              <p className="mt-2 text-sm text-brand-muted">Heel height: {product.heel_height}</p>
            )}
          </div>

          {/* Care */}
          <div className="mt-6 border-t border-brand-mid pt-6">
            <h4 className="label mb-2">Care Instructions</h4>
            <p className="text-sm leading-relaxed text-brand-light/85">
              Store in a cool, dry place. Wipe clean with a soft cloth. Avoid prolonged exposure to water.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-bold">You Might Also Love</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
}
