"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/shop/ProductCard";
import AccordionIcon from "@/components/ui/AccordionIcon";
import { SHOP, formatOccasion, formatPrice } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, string> = {
  heels: "Heels",
  sandals: "Sandals & wedges",
  boots: "Boots",
  flats: "Flats",
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "popular", label: "Most loved" },
];

function toggleInSet<T>(set: T[], value: T): T[] {
  return set.includes(value) ? set.filter((v) => v !== value) : [...set, value];
}

function FilterGroup({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group accordion border-b border-line" open={defaultOpen}>
      <summary>
        {title}
        <AccordionIcon size={16} />
      </summary>
      <div className="pb-6">{children}</div>
    </details>
  );
}

function CheckRow({ checked, onChange, label, count }: { checked: boolean; onChange: () => void; label: string; count: number }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-ink">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden="true"
        className="flex h-4 w-4 shrink-0 items-center justify-center border border-stone/60 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bordeaux"
      >
        {checked && <span className="h-1.5 w-1.5 bg-porcelain" />}
      </span>
      <span className="flex-1">{label}</span>
      <span className="text-xs tabular-nums text-stone">{count}</span>
    </label>
  );
}

export default function ShopContent({ allProducts }: { allProducts: Product[] }) {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [occasions, setOccasions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Keep filters in step with links like /shop?category=heels, even when already on /shop.
  useEffect(() => {
    const c = searchParams.get("category");
    const o = searchParams.get("occasion");
    const b = searchParams.get("brand");
    setCategories(c ? [c] : []);
    setOccasions(o ? [o] : []);
    setBrands(b ? [b] : []);
  }, [searchParams]);

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  const countBy = (fn: (p: Product) => string[]) => {
    const m = new Map<string, number>();
    allProducts.forEach((p) => fn(p).forEach((v) => m.set(v, (m.get(v) ?? 0) + 1)));
    return m;
  };

  const categoryCounts = useMemo(() => countBy((p) => [p.category]), [allProducts]); // eslint-disable-line react-hooks/exhaustive-deps
  const brandCounts = useMemo(() => countBy((p) => [p.brand]), [allProducts]); // eslint-disable-line react-hooks/exhaustive-deps
  const occasionCounts = useMemo(() => countBy((p) => p.occasions), [allProducts]); // eslint-disable-line react-hooks/exhaustive-deps

  const allBrands = useMemo(() => Array.from(brandCounts.keys()).sort(), [brandCounts]);
  const allColors = useMemo(() => Array.from(new Set(allProducts.map((p) => p.color))).sort(), [allProducts]);
  const allSizes = useMemo(
    () => Array.from(new Set(allProducts.flatMap((p) => p.sizes))).sort((a, b) => Number(a) - Number(b)),
    [allProducts]
  );
  const allOccasions = useMemo(() => Array.from(occasionCounts.keys()).sort(), [occasionCounts]);
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
        if (!p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q) && !p.color.toLowerCase().includes(q))
          return false;
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
        result = [...result].sort((a, b) => Number(a.id) - Number(b.id));
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

  const activeChips: { key: string; label: string; remove: () => void }[] = [
    ...categories.map((c) => ({ key: `c-${c}`, label: CATEGORY_LABELS[c] ?? c, remove: () => setCategories((v) => v.filter((x) => x !== c)) })),
    ...brands.map((b) => ({ key: `b-${b}`, label: b, remove: () => setBrands((v) => v.filter((x) => x !== b)) })),
    ...colors.map((c) => ({ key: `co-${c}`, label: c, remove: () => setColors((v) => v.filter((x) => x !== c)) })),
    ...sizes.map((s) => ({ key: `s-${s}`, label: `Size ${s}`, remove: () => setSizes((v) => v.filter((x) => x !== s)) })),
    ...occasions.map((o) => ({ key: `o-${o}`, label: formatOccasion(o), remove: () => setOccasions((v) => v.filter((x) => x !== o)) })),
    ...(priceMax < maxPrice ? [{ key: "price", label: `Up to ${formatPrice(priceMax)}`, remove: () => setPriceMax(maxPrice) }] : []),
  ];

  const heading =
    categories.length === 1 && !brands.length && !occasions.length
      ? CATEGORY_LABELS[categories[0]] ?? "The collection"
      : brands.length === 1 && !categories.length && !occasions.length
        ? brands[0]
        : occasions.length === 1 && !categories.length && !brands.length
          ? `For ${formatOccasion(occasions[0]).toLowerCase()}`
          : "The collection";

  const FilterPanel = (
    <div className="border-t border-line">
      <FilterGroup title="Category">
        {Object.entries(CATEGORY_LABELS)
          .filter(([slug]) => categoryCounts.get(slug))
          .map(([slug, label]) => (
            <CheckRow
              key={slug}
              label={label}
              count={categoryCounts.get(slug) ?? 0}
              checked={categories.includes(slug)}
              onChange={() => setCategories((c) => toggleInSet(c, slug))}
            />
          ))}
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => setSizes((v) => toggleInSet(v, s))}
              className="size-chip !h-10 !min-w-[2.75rem] !text-xs"
              data-selected={sizes.includes(s)}
              aria-pressed={sizes.includes(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Occasion">
        {allOccasions.map((o) => (
          <CheckRow
            key={o}
            label={formatOccasion(o)}
            count={occasionCounts.get(o) ?? 0}
            checked={occasions.includes(o)}
            onChange={() => setOccasions((v) => toggleInSet(v, o))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Designer">
        {allBrands.map((b) => (
          <CheckRow
            key={b}
            label={b}
            count={brandCounts.get(b) ?? 0}
            checked={brands.includes(b)}
            onChange={() => setBrands((v) => toggleInSet(v, b))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Colour" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => (
            <button
              key={c}
              onClick={() => setColors((v) => toggleInSet(v, c))}
              className="filter-chip"
              data-selected={colors.includes(c)}
              aria-pressed={colors.includes(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Price" defaultOpen={false}>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={100}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-bordeaux"
          aria-label="Maximum price"
        />
        <p className="mt-2 text-xs text-stone">Up to {formatPrice(priceMax)}</p>
      </FilterGroup>
    </div>
  );

  return (
    <div className="container-site pb-24 pt-12 sm:pt-16 lg:pb-32">
      <header className="mb-12 flex flex-col justify-between gap-6 border-b border-line pb-10 lg:mb-14 lg:flex-row lg:items-end">
        <div>
          <h1 className="display-lg">{heading}</h1>
          <p className="mt-3 text-sm text-stone">
            {filtered.length} {filtered.length === 1 ? "pair" : "pairs"}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative sm:w-72">
            <Search size={16} strokeWidth={1.4} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone" />
            <label htmlFor="shop-search" className="sr-only">
              Search shoes
            </label>
            <input
              id="shop-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, designer or colour"
              className="input !pl-11"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setMobileFiltersOpen(true)} className="btn-secondary flex-1 !px-5 lg:hidden">
              <SlidersHorizontal size={15} strokeWidth={1.4} />
              Filter{activeChips.length > 0 && ` (${activeChips.length})`}
            </button>
            <label htmlFor="shop-sort" className="sr-only">
              Sort by
            </label>
            <select id="shop-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input flex-1 sm:!w-52">
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className="grid gap-12 lg:grid-cols-[15rem_1fr] xl:gap-16">
        <aside className="hidden lg:block" aria-label="Filters">
          {FilterPanel}
        </aside>

        <div>
          {activeChips.length > 0 && (
            <div className="mb-8 flex flex-wrap items-center gap-2">
              {activeChips.map((chip) => (
                <button
                  key={chip.key}
                  onClick={chip.remove}
                  className="filter-chip gap-1.5"
                  aria-label={`Remove filter: ${chip.label}`}
                >
                  {chip.label}
                  <X size={12} strokeWidth={1.6} />
                </button>
              ))}
              <button onClick={clearAll} className="ml-2 text-xs text-stone underline underline-offset-4 hover:text-ink">
                Clear all
              </button>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="bg-tissue/60 px-6 py-20 text-center">
              <h2 className="display-md">Nothing matches those filters.</h2>
              <p className="mx-auto mt-4 max-w-md text-ink/70">
                Remove a filter to see more pairs, or call us on {SHOP.phoneDisplay}. We restock often
                and can tell you what&apos;s arriving.
              </p>
              <button onClick={clearAll} className="btn-secondary mt-8">
                Clear all filters
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:grid-cols-3 lg:gap-y-16">
              {filtered.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} sizes="(max-width: 768px) 50vw, (max-width: 1280px) 30vw, 22vw" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 animate-fade-in bg-ink/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm animate-slide-in flex-col bg-porcelain">
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <h2 className="font-display text-[1.5rem]">Filter</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="-mr-2 flex h-10 w-10 items-center justify-center"
              >
                <X size={22} strokeWidth={1.4} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5">{FilterPanel}</div>
            <div className="flex gap-3 border-t border-line p-5">
              <button onClick={clearAll} className="btn-secondary flex-1">
                Clear
              </button>
              <button onClick={() => setMobileFiltersOpen(false)} className="btn-primary flex-[2]">
                Show {filtered.length} {filtered.length === 1 ? "pair" : "pairs"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
