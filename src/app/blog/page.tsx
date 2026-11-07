import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import blogs from "@/data/blogs.json";
import { BlogPost } from "@/types";

const posts = blogs as BlogPost[];

export const metadata: Metadata = {
  title: "Style notes | The Tinnsrack",
  description: "Fit advice, heel-height guides and occasion edits from our Nairobi boutique.",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  const [lead, ...rest] = posts;

  return (
    <div className="container-site pb-24 pt-12 sm:pt-16 lg:pb-32">
      <header className="mb-14 border-b border-line pb-10 lg:mb-20">
        <h1 className="display-xl !text-[clamp(3rem,7vw,6.5rem)]">Style notes</h1>
        <p className="lede mt-6">
          Fit advice, heel-height guides and occasion edits, written on the boutique floor.
        </p>
      </header>

      {lead && (
        <Link href={`/blog/${lead.slug}`} className="group mb-20 grid gap-8 lg:mb-28 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="product-frame aspect-[16/10] lg:col-span-8">
            <Image
              src={lead.cover_image}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
            />
          </div>
          <div className="lg:col-span-4">
            <p className="meta">
              {lead.category}, {lead.read_time}
            </p>
            <h2 className="mt-3 text-[2rem] leading-[1.1] transition-colors group-hover:text-bordeaux sm:text-[2.5rem]">
              {lead.title}
            </h2>
            <p className="mt-4 text-ink/70">{lead.excerpt}</p>
          </div>
        </Link>
      )}

      <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="product-frame aspect-[4/3]">
                <Image
                  src={post.cover_image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="meta mt-5">
                {post.category}, <time dateTime={post.date}>{formatDate(post.date)}</time>
              </p>
              <h2 className="mt-2 text-[1.5rem] leading-snug transition-colors group-hover:text-bordeaux">{post.title}</h2>
              <p className="mt-3 line-clamp-2 text-sm text-ink/70">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
