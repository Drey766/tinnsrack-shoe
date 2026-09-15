import { notFound } from "next/navigation";
import type { Metadata } from "next";
import products from "@/data/products.json";
import { Product } from "@/types";
import ProductDetailClient from "@/components/shop/ProductDetailClient";

const allProducts = products as Product[];

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = allProducts.find((p) => p.slug === params.slug);
  if (!product) return { title: "Product Not Found | The Tinnsrack" };
  return {
    title: `${product.name} | The Tinnsrack`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = allProducts.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}
