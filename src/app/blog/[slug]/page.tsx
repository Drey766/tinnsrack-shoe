import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import blogs from "@/data/blogs.json";
import { BlogPost } from "@/types";

const posts = blogs as BlogPost[];

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found | The Tinnsrack" };
  return { title: `${post.title} | The Tinnsrack`, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <article className="container-site section-padding max-w-3xl">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/blog" className="hover:text-brand-gold">Style Notes</Link>
        <ChevronRight size={12} />
        <span className="text-brand-light">{post.title}</span>
      </nav>

      <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold">
        {post.category} · {post.read_time}
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
      <p className="mt-3 text-sm text-brand-muted">
        By The Tinnsrack · {new Date(post.date).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-brand-mid">
        <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
      </div>

      <div className="prose-article mt-10" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="mt-12 card px-6 py-8 text-center">
        <p className="font-display text-lg font-bold">Still not sure what pair fits your event?</p>
        <a
          href="https://wa.me/254768008365?text=Hi%20The%20Tinnsrack%2C%20I%20read%20your%20blog%20and%20need%20some%20advice!"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp btn-step mt-4 inline-flex"
        >
          Chat with Us
        </a>
      </div>
    </article>
  );
}
