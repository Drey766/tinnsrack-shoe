"use client";

import Link from "next/link";
import Image from "next/image";
import blogs from "@/data/blogs.json";
import { BlogPost } from "@/types";

const posts = blogs as BlogPost[];

export default function BlogPage() {
  return (
    <div className="container-site section-padding">
      <div className="mb-12 text-center">
        <span className="section-tag">From The Shop Floor</span>
        <h1 className="mt-2 text-4xl font-bold">Style Notes</h1>
        <p className="mx-auto mt-3 max-w-xl text-brand-muted">
          Comfort guides, occasion edits, and honest advice from the women who know shoes
          best — us.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
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
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-gold">
              {post.category} · {post.read_time}
            </p>
            <h2 className="mt-1 font-display text-xl font-bold leading-snug text-brand-white group-hover:text-brand-gold">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm text-brand-muted">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
