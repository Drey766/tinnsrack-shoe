"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface OccasionEntry {
  value: string;
  label: string;
  count: number;
  image: string;
}

export default function OccasionIndex({ entries }: { entries: OccasionEntry[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <ul className="lg:col-span-7">
        {entries.map((o, i) => (
          <li key={o.value} className="border-t border-line last:border-b">
            <Link
              href={`/shop?occasion=${o.value}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group flex items-baseline justify-between gap-6 py-5 sm:py-6"
            >
              <span
                className={`font-display text-[2rem] leading-none tracking-display transition-colors duration-300 sm:text-[3rem] ${
                  active === i ? "text-bordeaux" : "text-ink group-hover:text-bordeaux"
                }`}
              >
                {o.label}
              </span>
              <span className="shrink-0 text-xs tabular-nums text-stone">
                {o.count} {o.count === 1 ? "pair" : "pairs"}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
        <div className="sticky top-28">
          <div className="product-frame aspect-[3/4]">
          {entries.map((o, i) => (
            <Image
              key={o.value}
              src={o.image}
              alt=""
              fill
              sizes="30vw"
              className={`object-cover object-bottom transition-opacity duration-500 ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
