import HeroSection from "@/components/home/HeroSection";
import HomeSections from "@/components/home/HomeSections";
import products from "@/data/products.json";
import blogs from "@/data/blogs.json";
import testimonials from "@/data/testimonials.json";
import { Product, BlogPost, Testimonial } from "@/types";

const allProducts = products as Product[];

export default function HomePage() {
  // Cover shoe: the second featured pair photographs best full-height; fall back gracefully.
  const featured = allProducts.filter((p) => p.is_featured);
  const cover = featured[1] ?? featured[0] ?? allProducts[0];

  return (
    <>
      <HeroSection product={cover} />
      <HomeSections
        products={allProducts}
        blogs={blogs as BlogPost[]}
        testimonials={testimonials as Testimonial[]}
      />
    </>
  );
}
