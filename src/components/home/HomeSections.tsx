import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Product, BlogPost, Testimonial } from "@/types";
import ProductCard from "@/components/shop/ProductCard";

const MARQUEE_TEXT =
  "Luxury & Classy Shoes · Same-Day Delivery Nairobi · Beba Beba Trade Center Shop F17 · Heels · Sandals · Boots · M-Pesa Accepted";

const OCCASIONS = [
  { label: "Wedding Guest", emoji: "💍", value: "wedding-guest" },
  { label: "Date Night", emoji: "🌹", value: "date-night" },
  { label: "Office Ready", emoji: "💼", value: "formal" },
  { label: "Everyday Casual", emoji: "☀️", value: "everyday" },
  { label: "Party Season", emoji: "🎉", value: "party" },
];

const CATEGORIES = [
  {
    slug: "heels",
    label: "Heels & Pumps",
    image: "https://images.pexels.com/photos/17739666/pexels-photo-17739666.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "sandals",
    label: "Sandals & Wedges",
    image: "https://images.pexels.com/photos/31450737/pexels-photo-31450737.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "boots",
    label: "Boots",
    image: "https://images.pexels.com/photos/26794820/pexels-photo-26794820.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "flats",
    label: "Flats",
    image: "https://images.pexels.com/photos/2562992/pexels-photo-2562992.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const PROMISE_CARDS = [
  { emoji: "👠", title: "Curated, Not Cluttered", body: "Every pair earns its spot on our shelf. Quality over quantity, always." },
  { emoji: "🚚", title: "Same-Day Delivery", body: "Order before 2PM, wear it tonight. Nairobi's fastest shoe delivery." },
  { emoji: "💛", title: "We Know Our Sizes", body: "Not sure what fits? Call us. We'll get you the perfect pair, guaranteed." },
  { emoji: "📍", title: "Come Say Hi", body: "Visit us at Beba Beba Trade Center, Shop F17, Tom Mboya. We'd love to dress your feet in person." },
];

function SectionHeading({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mb-10 text-center">
      <span className="section-tag">{tag}</span>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
    </div>
  );
}

function MarqueeStrip() {
  return (
    <div className="overflow-hidden border-y border-brand-mid/60 bg-brand-dark py-3">
      <div className="marquee-track">
        {[0, 1].map((i) => (
          <span key={i} className="flex shrink-0 items-center gap-3 px-4 font-accent italic text-brand-gold/90">
            {MARQUEE_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeaturedProducts({ products }: { products: Product[] }) {
  const featured = products.filter((p) => p.is_featured);
  return (
    <section className="section-padding container-site">
      <SectionHeading tag="Fresh On The Shelf" title="New In" />
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/shop" className="btn-outline btn-step">
          Shop All Shoes
        </Link>
      </div>
    </section>
  );
}

function OccasionCards() {
  return (
    <section className="section-padding container-site">
      <SectionHeading tag="Dressed For The Moment" title="Shop the Vibe" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {OCCASIONS.map((o) => (
          <Link
            key={o.value}
            href={`/shop?occasion=${o.value}`}
            className="card flex flex-col items-center gap-2 px-4 py-8 text-center transition-colors hover:border-brand-gold"
          >
            <span className="text-3xl">{o.emoji}</span>
            <span className="text-sm font-semibold text-brand-light">{o.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CategoryGrid({ products }: { products: Product[] }) {
  return (
    <section className="section-padding container-site">
      <SectionHeading tag="Every Shape, Sorted" title="Heels, Sandals & Boots" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CATEGORIES.map((c) => {
          const count = products.filter((p) => p.category === c.slug).length;
          return (
            <Link
              key={c.slug}
              href={`/shop?category=${c.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-mid"
            >
              <Image
                src={c.image}
                alt={c.label}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-display text-lg font-bold text-brand-white">{c.label}</p>
                <p className="text-xs text-brand-light/80">
                  {count > 0 ? `${count} ${count === 1 ? "pair" : "pairs"}` : "Coming soon"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function PromiseSection() {
  return (
    <section className="section-padding bg-brand-dark">
      <div className="container-site">
        <SectionHeading tag="Why Shop With Us" title="The Tinnsrack Promise" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISE_CARDS.map((c) => (
            <div key={c.title} className="card p-6 text-center">
              <span className="text-3xl">{c.emoji}</span>
              <h3 className="mt-3 font-display text-lg font-bold text-brand-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SisterBrandBanner() {
  return (
    <section className="container-site py-10">
      <div className="card flex flex-col items-center gap-4 border-brand-blush/30 bg-gradient-to-r from-brand-dark to-brand-dark2 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-accent text-lg italic text-brand-blush-light">Complete the look</p>
          <p className="mt-1 text-brand-light">
            Looking for the perfect dress to match? Check out our sister page{" "}
            <span className="font-semibold text-brand-white">@the_tinnsrack</span> for dresses
            that complete the look.
          </p>
        </div>
        <a
          href="https://www.instagram.com/the_tinnsrack/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline btn-step shrink-0"
        >
          Visit @the_tinnsrack
        </a>
      </div>
    </section>
  );
}

function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="section-padding container-site">
      <SectionHeading tag="They Said It Best" title="Sole Sisters" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.id} className="card p-6">
            <div className="mb-3 flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={14} className="fill-brand-gold text-brand-gold" />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-brand-light/90">&ldquo;{t.text}&rdquo;</p>
            <p className="mt-4 text-sm font-semibold text-brand-white">
              {t.name} <span className="font-normal text-brand-muted">· {t.location}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BlogPreview({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="section-padding bg-brand-dark">
      <div className="container-site">
        <SectionHeading tag="From The Shop Floor" title="Style Notes" />
        <div className="grid gap-6 sm:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-brand-mid">
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-gold">
                {post.category}
              </p>
              <h3 className="mt-1 font-display text-lg font-bold leading-snug text-brand-white group-hover:text-brand-gold">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsAppCTA() {
  return (
    <section className="container-site py-14">
      <div className="card flex flex-col items-center gap-4 px-6 py-10 text-center">
        <h3 className="font-display text-2xl font-bold">
          Not sure about your size or the perfect pair?
        </h3>
        <p className="max-w-md text-brand-muted">
          Chat with us — we&apos;ll sort you out. 💬
        </p>
        <a
          href="https://wa.me/254768008365?text=Hi%20The%20Tinnsrack!%20I%20need%20help%20picking%20a%20pair."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp btn-step"
        >
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}

export default function HomeSections({
  products,
  blogs,
  testimonials,
}: {
  products: Product[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
}) {
  return (
    <>
      <MarqueeStrip />
      <FeaturedProducts products={products} />
      <OccasionCards />
      <CategoryGrid products={products} />
      <PromiseSection />
      <SisterBrandBanner />
      <TestimonialsSection testimonials={testimonials} />
      <BlogPreview posts={blogs} />
      <WhatsAppCTA />
    </>
  );
}
