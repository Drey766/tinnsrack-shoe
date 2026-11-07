import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice, productTitle, whatsappLink } from "@/lib/utils";

const HEADLINE = ["Heels worth", "dressing", "up for."];

export default function HeroSection({ product }: { product: Product }) {
  return (
    <section className="container-site pb-20 pt-8 sm:pt-12 lg:pb-24 lg:pt-12">
      <div className="grid items-end gap-y-10 lg:grid-cols-12 lg:gap-x-8">
        {/* Headline + intro — the headline deliberately runs over the photograph on desktop */}
        <div className="pointer-events-none relative z-10 lg:col-span-12 lg:col-start-1 lg:row-start-1 lg:pb-4 [&_a]:pointer-events-auto">
          <h1 className="display-xl text-ink">
            {HEADLINE.map((line, i) => (
              <span
                key={line}
                className={`block animate-rise ${i === 1 ? "pl-[0.9em] italic" : ""}`}
                style={{ animationDelay: `${150 + i * 120}ms` }}
              >
                {line}
              </span>
            ))}
          </h1>

          <div className="mt-10 animate-rise sm:ml-[0.4em] lg:mt-14" style={{ animationDelay: "600ms" }}>
            <p className="lede">
              Satin mules, crystal pumps and Nine West classics, chosen pair by pair at our
              Tom Mboya Street boutique — and at your door in Nairobi the same day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/shop" className="btn-primary">
                Shop the collection
              </Link>
              <a
                href={whatsappLink("Hi The Tinnsrack, I'd love some help finding a pair.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Ask us on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Feature image */}
        <figure className="lg:col-span-5 lg:col-start-8 lg:row-start-1 xl:col-span-6 xl:col-start-7">
          <Link
            href={`/shop/${product.slug}`}
            className="product-frame block aspect-[3/4] animate-unveil lg:aspect-auto lg:h-[min(76vh,46rem)]"
          >
            <Image
              src={product.images[0]}
              alt={`${product.brand} ${productTitle(product)} in ${product.color.toLowerCase()}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-bottom"
            />
          </Link>
          <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-xs text-stone">
            <span>
              On the cover: {productTitle(product)}, {product.color.toLowerCase()}
            </span>
            <span className="tabular-nums text-ink">{formatPrice(product.price)}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
