"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, string> = {
  heels: "Heels & Pumps",
  sandals: "Sandals & Wedges",
  boots: "Boots",
  flats: "Flats",
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

function toggleInSet<T>(set: T[], value: T): T[] {
  return set.includes(value) ? set.filter((v) => v !== value) : [...set, value];
}

export default function ShopContent({ allProducts }: { allProducts: Product[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialOccasion = searchParams.get("occasion");

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [occasions, setOccasions] = useState<string[]>(initialOccasion ? [initialOccasion] : []);
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const allBrands = useMemo(() => Array.from(new Set(allProducts.map((p) => p.brand))).sort(), [allProducts]);
  const allColors = useMemo(() => Array.from(new Set(allProducts.map((p) => p.color))).sort(), [allProducts]);
  const allSizes = useMemo(
    () => Array.from(new Set(allProducts.flatMap((p) => p.sizes))).sort((a, b) => Number(a) - Number(b)),
    [allProducts]
  );
  const allOccasions = useMemo(
    () => Array.from(new Set(allProducts.flatMap((p) => p.occasions))).sort(),
    [allProducts]
  );
  const maxPrice = useMemo(() => Math.max(...allProducts.map((p) => p.price)), [allProducts]);
  const [priceMax, setPriceMax] = useState(maxPrice);

  const filtered = useMemo(() => {
    let result = allProducts.filter((p) => {
      if (categories.length && !categories.includes(p.category)) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (colors.length && !colors.includes(p.color)) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (occasions.length && !p.occasions.some((o) => occasions.includes(o))) return false;
      if (p.price > priceMax) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result = [...result].sort((a, b) => b.review_count - a.review_count);
        break;
      default:
        result = [...result].sort((a, b) => Number(b.id) - Number(a.id));
    }
    return result;
  }, [allProducts, categories, brands, colors, sizes, occasions, priceMax, search, sortBy]);

  const clearAll = () => {
    setCategories([]);
    setBrands([]);
    setColors([]);
    setSizes([]);
    setOccasions([]);
    setPriceMax(maxPrice);
    setSearch("");
  };

  const activeFilterCount =
    categories.length + brands.length + colors.length + sizes.length + occasions.length + (priceMax < maxPrice ? 1 : 0);

  const FilterPanel = (
    <div className="space-y-7">
      <div>
        <h4 className="label mb-3">Category</h4>
        <div className="space-y-2">
          {Object.entries(CATEGORY_LABELS).map(([slug, label]) => (
            <label key={slug} className="flex cursor-pointer items-center gap-2 text-sm text-brand-light/85">
              <input
                type="checkbox"
                checked={categories.includes(slug)}
                onChange={() => setCategories((c) => toggleInSet(c, slug))}
                className="h-4 w-4 rounded border-brand-mid bg-brand-dark2 accent-brand-gold"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="label mb-3">Brand</h4>
        <div className="space-y-2">
          {allBrands.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-2 text-sm text-brand-light/85">
              <input
                type="checkbox"
                checked={brands.includes(b)}
                onChange={() => setBrands((v) => toggleInSet(v, b))}
                className="h-4 w-4 rounded border-brand-mid bg-brand-dark2 accent-brand-gold"
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="label mb-3">Colour</h4>
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => (
            <button
              key={c}
              onClick={() => setColors((v) => toggleInSet(v, c))}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                colors.includes(c)
                  ? "border-brand-gold bg-brand-gold text-brand-black"
                  : "border-brand-mid text-brand-light/85 hover:border-brand-gold"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="label mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => setSizes((v) => toggleInSet(v, s))}
              className="size-chip !h-9 !min-w-9 !text-xs"
              data-selected={sizes.includes(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="label mb-3">Occasion</h4>
        <div className="flex flex-wrap gap-2">
          {allOccasions.map((o) => (
            <button
              key={o}
              onClick={() => setOccasions((v) => toggleInSet(v, o))}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs capitalize transition-colors",
                occasions.includes(o)
                  ? "border-brand-gold bg-brand-gold text-brand-black"
                  : "border-brand-mid text-brand-light/85 hover:border-brand-gold"
              )}
            >
              {o.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="label mb-3">Price Range</h4>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={100}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-brand-gold"
        />
        <p className="mt-1 text-xs text-brand-muted">Up to KSh {priceMax.toLocaleString("en-KE")}</p>
      </div>

      {activeFilterCount > 0 && (
        <button onClick={clearAll} className="btn-ghost">
          <X size={14} /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="container-site section-padding">
      <div className="mb-8">
        <span className="section-tag">The Full Rack</span>
        <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Shop All Shoes</h1>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or brand"
            className="input !pl-10"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="btn-outline btn-step !px-4 !py-2.5 !text-xs lg:hidden"
          >
            <SlidersHorizontal size={14} />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input !w-auto !py-2.5 !text-sm"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">{FilterPanel}</aside>

        <div>
          <p className="mb-4 text-sm text-brand-muted">{filtered.length} pairs found</p>
          {filtered.length === 0 ? (
            <div className="card px-6 py-16 text-center">
              <p className="text-lg text-brand-light">
                Didn&apos;t find your size or style? Call us — we restock fast. ☎️ 0768 008 365
              </p>
              <button onClick={clearAll} className="btn-outline btn-step mt-5">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-xs overflow-y-auto bg-brand-dark p-5">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                <X size={22} className="text-brand-muted" />
              </button>
            </div>
            {FilterPanel}
            <button onClick={() => setMobileFiltersOpen(false)} className="btn-primary btn-step mt-6 w-full">
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
