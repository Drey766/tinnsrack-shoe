import HeroSection from "@/components/home/HeroSection";
import HomeSections from "@/components/home/HomeSections";
import products from "@/data/products.json";
import blogs from "@/data/blogs.json";
import testimonials from "@/data/testimonials.json";
import { Product, BlogPost, Testimonial } from "@/types";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeSections
        products={products as Product[]}
        blogs={blogs as BlogPost[]}
        testimonials={testimonials as Testimonial[]}
      />
    </>
  );
}
