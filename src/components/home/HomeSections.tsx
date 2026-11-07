import Link from "next/link";
import Image from "next/image";
import { Product, BlogPost, Testimonial } from "@/types";
import ProductCard from "@/components/shop/ProductCard";
import OccasionIndex, { OccasionEntry } from "@/components/home/OccasionIndex";
import { SHOP, formatOccasion, whatsappLink } from "@/lib/utils";

const OCCASION_ORDER = ["wedding-guest", "date-night", "party", "formal", "everyday"];

const SERVICES = [
  {
    title: "Same-day delivery",
    body: "Order before 2pm and we deliver anywhere in Nairobi that afternoon. Later orders arrive first thing next morning.",
  },
  {
    title: "Fitted by people who know shoes",
    body: "Between sizes? Call or WhatsApp before you order and we'll tell you honestly how each pair runs.",
  },
  {
    title: "Pay with M-Pesa",
    body: "Check out in a minute and confirm the payment prompt on your phone. No cards, no accounts.",
  },
];

function SectionHeader({
  title,
  intro,
  action,
}: {
  title: string;
  intro?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-16">
      <div>
        <h2 className="display-lg">{title}</h2>
        {intro && <p className="mt-4 max-w-md text-ink/70">{intro}</p>}
      </div>
      {action && (
        <Link href={action.href} className="text-link shrink-0">
          {action.label}
        </Link>
      )}
    </div>
  );
}

function NewArrivals({ products, total }: { products: Product[]; total: number }) {
  return (
    <section className="section border-t border-line">
      <div className="container-site">
        <SectionHeader
          title="New this week"
          intro="Fresh from the boxes and on the shelf at Beba Beba now."
          action={{ href: "/shop", label: `View all ${total} pairs` }}
        />
      </div>
      <div className="container-site">
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:px-0">
          {products.map((p) => (
            <li key={p.id} className="w-[68vw] shrink-0 snap-start sm:w-[40vw] lg:w-auto">
              <ProductCard product={p} sizes="(max-width: 640px) 68vw, (max-width: 1024px) 40vw, 25vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ShopByOccasion({ products }: { products: Product[] }) {
  const usedImages = new Set<string>();
  const entries: OccasionEntry[] = OCCASION_ORDER.map((value) => {
    const matches = products.filter((p) => p.occasions.includes(value));
    const pick =
      matches.find((p) => p.is_featured && !usedImages.has(p.images[0])) ??
      matches.find((p) => !usedImages.has(p.images[0])) ??
      matches[0];
    if (pick) usedImages.add(pick.images[0]);
    return { value, label: formatOccasion(value), count: matches.length, image: pick?.images[0] ?? "" };
  }).filter((e) => e.count > 0 && e.image);

  return (
    <section className="section bg-tissue/60">
      <div className="container-site">
        <SectionHeader
          title="Dressing for something?"
          intro="Start with the occasion. We'll show you the pairs that suit it."
        />
        <OccasionIndex entries={entries} />
      </div>
    </section>
  );
}

function Brands({ products }: { products: Product[] }) {
  const counts = new Map<string, number>();
  products.forEach((p) => counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1));
  const brands = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <section className="section">
      <div className="container-site">
        <p className="meta mb-8">The labels on our shelves</p>
        <ul className="flex flex-wrap items-baseline gap-x-10 gap-y-4 sm:gap-x-14">
          {brands.map(([brand, count]) => (
            <li key={brand}>
              <Link
                href={`/shop?brand=${encodeURIComponent(brand)}`}
                className="group inline-flex items-baseline gap-2"
              >
                <span className="font-display text-[1.75rem] tracking-display text-ink transition-colors group-hover:text-bordeaux sm:text-[2.5rem]">
                  {brand}
                </span>
                <sup className="text-xs tabular-nums text-stone">{count}</sup>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Boutique({ image }: { image: string }) {
  return (
    <section className="bg-bordeaux text-porcelain">
      <div className="container-site grid gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <div className="lg:col-span-5">
          <h2 className="display-lg text-porcelain">Come and try them on.</h2>
          <p className="mt-6 max-w-md text-porcelain/75">
            Our boutique is in Beba Beba Trade Center, in the heart of town. Walk in, sit down, and
            try as many pairs as you like.
          </p>
          <address className="mt-10 space-y-1 not-italic">
            <p className="font-display text-[1.5rem]">{SHOP.addressLine1}</p>
            <p className="text-porcelain/75">{SHOP.addressLine2}</p>
            <p className="pt-3 text-sm text-porcelain/60">{SHOP.hours}</p>
          </address>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href={SHOP.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-light">
              Get directions
            </a>
            <a
              href={SHOP.phoneHref}
              className="text-[0.9375rem] font-medium text-porcelain underline decoration-porcelain/30 underline-offset-[6px] hover:decoration-porcelain"
            >
              Call {SHOP.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="hidden lg:col-span-3 lg:col-start-7 lg:block">
          <div className="relative aspect-[3/4] overflow-hidden bg-bordeaux-deep">
            <Image src={image} alt="" fill sizes="22vw" className="object-cover object-bottom" />
          </div>
        </div>

        <ul className="space-y-10 lg:col-span-3 lg:col-start-10 lg:self-end">
          {SERVICES.map((s) => (
            <li key={s.title} className="border-t border-porcelain/20 pt-5">
              <h3 className="font-display text-[1.375rem] text-porcelain">{s.title}</h3>
              <p className="mt-2 text-sm text-porcelain/70">{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeader title="In their words" />
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {testimonials.slice(0, 3).map((t) => (
            <figure key={t.id} className="border-t border-ink pt-6">
              <blockquote className="font-display text-[1.375rem] italic leading-[1.45] text-ink">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm">
                {t.name} <span className="text-stone">— {t.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function SisterLabel() {
  return (
    <section className="container-site">
      <div className="flex flex-col items-start justify-between gap-6 border-y border-line py-10 sm:flex-row sm:items-center">
        <p className="max-w-xl font-display text-[1.5rem] leading-snug sm:text-[1.875rem]">
          Need the dress as well? Our sister label {SHOP.sisterHandle} has you covered.
        </p>
        <a href={SHOP.sisterInstagram} target="_blank" rel="noopener noreferrer" className="btn-secondary shrink-0">
          See the dresses
        </a>
      </div>
    </section>
  );
}

function StyleNotes({ posts }: { posts: BlogPost[] }) {
  const [lead, ...rest] = posts;
  if (!lead) return null;
  return (
    <section className="section">
      <div className="container-site">
        <SectionHeader
          title="Style notes"
          intro="Fit advice and occasion guides from the boutique floor."
          action={{ href: "/blog", label: "Read all notes" }}
        />
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Link href={`/blog/${lead.slug}`} className="group lg:col-span-7">
            <div className="product-frame aspect-[16/10]">
              <Image
                src={lead.cover_image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              />
            </div>
            <p className="meta mt-5">
              {lead.category}, {lead.read_time}
            </p>
            <h3 className="mt-2 max-w-xl text-[1.75rem] leading-tight transition-colors group-hover:text-bordeaux sm:text-[2.125rem]">
              {lead.title}
            </h3>
          </Link>
          <ul className="space-y-10 lg:col-span-4 lg:col-start-9">
            {rest.slice(0, 2).map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`} className="group grid grid-cols-[7rem_1fr] gap-5 sm:grid-cols-[9rem_1fr]">
                  <div className="product-frame aspect-[4/5]">
                    <Image src={post.cover_image} alt="" fill sizes="10rem" className="object-cover" />
                  </div>
                  <div>
                    <p className="meta">{post.category}</p>
                    <h3 className="mt-2 text-[1.25rem] leading-snug transition-colors group-hover:text-bordeaux">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function HelpBand() {
  return (
    <section className="container-site pb-24 lg:pb-32">
      <div className="bg-tissue px-6 py-16 text-center sm:px-12 lg:py-20">
        <h2 className="display-md mx-auto max-w-2xl">Not sure of your size? Ask us before you buy.</h2>
        <p className="mx-auto mt-4 max-w-md text-ink/70">
          Send a photo of your outfit or the pair you&apos;re eyeing and we&apos;ll reply on WhatsApp.
        </p>
        <a
          href={whatsappLink("Hi The Tinnsrack, I need help picking a pair.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8"
        >
          Message us on WhatsApp
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
  const featured = products.filter((p) => p.is_featured).slice(0, 4);
  const boutiqueImage =
    products.find((p) => p.brand === "Nine West")?.images[0] ?? products[0]?.images[0] ?? "";

  return (
    <>
      <NewArrivals products={featured} total={products.length} />
      <ShopByOccasion products={products} />
      <Brands products={products} />
      <Boutique image={boutiqueImage} />
      <Testimonials testimonials={testimonials} />
      <SisterLabel />
      <StyleNotes posts={blogs} />
      <HelpBand />
    </>
  );
}
