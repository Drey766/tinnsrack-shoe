"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { SHOP } from "@/lib/utils";

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
}

const SIZE_CHART = [
  { eu: 35, uk: 2.5, us: 5, footCm: 22.5 },
  { eu: 36, uk: 3.5, us: 6, footCm: 23.0 },
  { eu: 37, uk: 4, us: 6.5, footCm: 23.5 },
  { eu: 38, uk: 5, us: 7.5, footCm: 24.0 },
  { eu: 39, uk: 6, us: 8.5, footCm: 24.5 },
  { eu: 40, uk: 6.5, us: 9, footCm: 25.0 },
  { eu: 41, uk: 7.5, us: 10, footCm: 25.5 },
  { eu: 42, uk: 8, us: 10.5, footCm: 26.0 },
  { eu: 43, uk: 9, us: 11.5, footCm: 26.5 },
];

export default function SizeGuideModal({ open, onClose }: SizeGuideModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:px-4" role="dialog" aria-modal="true" aria-labelledby="size-guide-title">
      <div className="absolute inset-0 animate-fade-in bg-ink/40" onClick={onClose} />
      <div className="relative max-h-[92vh] w-full max-w-lg animate-rise overflow-y-auto bg-porcelain p-6 sm:p-10">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center text-ink hover:text-bordeaux"
          aria-label="Close size guide"
          autoFocus
        >
          <X size={20} strokeWidth={1.4} />
        </button>
        <h2 id="size-guide-title" className="display-md">Size guide</h2>
        <p className="mt-3 text-sm text-ink/70">
          Our shoes are sized in EU. Measure your foot from heel to longest toe, in the evening when
          it&apos;s at its largest, and match it to the chart.
        </p>

        <table className="mt-8 w-full text-sm tabular-nums">
          <thead>
            <tr className="border-b border-ink text-left">
              <th className="pb-3 font-medium">EU</th>
              <th className="pb-3 font-medium">UK</th>
              <th className="pb-3 font-medium">US</th>
              <th className="pb-3 text-right font-medium">Foot length</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_CHART.map((row) => (
              <tr key={row.eu} className="border-b border-line">
                <td className="py-3">{row.eu}</td>
                <td className="py-3 text-ink/70">{row.uk}</td>
                <td className="py-3 text-ink/70">{row.us}</td>
                <td className="py-3 text-right text-ink/70">{row.footCm.toFixed(1)} cm</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-6 text-sm text-ink/70">
          Between sizes? Call or WhatsApp us on{" "}
          <a href={SHOP.phoneHref} className="text-ink underline underline-offset-4">
            {SHOP.phoneDisplay}
          </a>{" "}
          and we&apos;ll tell you how each pair runs.
        </p>
      </div>
    </div>
  );
}
