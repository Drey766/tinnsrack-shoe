import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import blogs from "@/data/blogs.json";
import { BlogPost } from "@/types";
import { whatsappLink } from "@/lib/utils";

const posts = blogs as BlogPost[];

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post not found | The Tinnsrack" };
  return { title: `${post.title} | The Tinnsrack`, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const index = posts.findIndex((p) => p.slug === params.slug);
  const post = posts[index];
  if (!post) notFound();
  const next = posts[(index + 1) % posts.length];

  return (
    <article className="pb-24 lg:pb-32">
      <header className="container-site pt-12 sm:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <nav aria-label="Breadcrumb" className="text-xs text-stone">
            <Link href="/blog" className="hover:text-ink">Style notes</Link>
            <span className="mx-2">/</span>
            {post.category}
          </nav>
          <h1 className="mt-8 text-[2.5rem] leading-[1.05] sm:text-[3.5rem] lg:text-[4rem]">{post.title}</h1>
          <p className="mt-6 text-sm text-stone">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            <span className="mx-3">/</span>
            {post.read_time}
          </p>
        </div>
      </header>

      <div className="container-site mt-12 lg:mt-16">
        <div className="product-frame mx-auto aspect-[16/9] max-w-5xl">
          <Image src={post.cover_image} alt="" fill priority sizes="(max-width: 1100px) 100vw, 1024px" className="object-cover" />
        </div>
      </div>

      <div className="container-site">
        <div
          className="prose-article mx-auto mt-14 max-w-[40rem] lg:mt-20"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <aside className="mx-auto mt-16 max-w-[40rem] border-y border-line py-10">
          <p className="font-display text-[1.625rem] leading-snug">Still deciding on a pair for your event?</p>
          <p className="mt-2 text-sm text-ink/70">Tell us the occasion and the outfit. We&apos;ll suggest a few.</p>
          <a
            href={whatsappLink("Hi The Tinnsrack, I read your style notes and would love some advice.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6"
          >
            Ask us on WhatsApp
          </a>
        </aside>

        {next && next.slug !== post.slug && (
          <Link href={`/blog/${next.slug}`} className="group mx-auto mt-16 block max-w-[40rem]">
            <p className="meta">Read next</p>
            <p className="mt-2 font-display text-[1.75rem] leading-snug transition-colors group-hover:text-bordeaux">
              {next.title}
            </p>
          </Link>
        )}
      </div>
    </article>
  );
}
