"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="card relative w-full max-w-lg p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-brand-muted hover:text-brand-gold"
          aria-label="Close size guide"
        >
          <X size={22} />
        </button>
        <span className="section-tag">Find Your Fit</span>
        <h3 className="mt-1 text-2xl font-bold">Size Guide</h3>
        <p className="mt-2 text-sm text-brand-muted">
          A rough EU-to-common reference. Between sizes, or still unsure? Call or WhatsApp
          us at 0768 008 365 — we'll help you get it right the first time.
        </p>

        <div className="mt-5 overflow-hidden rounded-lg border border-brand-mid">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-dark2 text-left">
                <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-brand-muted">EU</th>
                <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-brand-muted">UK</th>
                <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-brand-muted">US</th>
                <th className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-brand-muted">Foot length</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_CHART.map((row) => (
                <tr key={row.eu} className="border-t border-brand-mid/60">
                  <td className="px-3 py-2.5 font-semibold text-brand-white">{row.eu}</td>
                  <td className="px-3 py-2.5">{row.uk}</td>
                  <td className="px-3 py-2.5">{row.us}</td>
                  <td className="px-3 py-2.5">{row.footCm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-brand-muted">
          Tip: measure your foot in the evening, when it's at its largest, for the most
          accurate fit.
        </p>
      </div>
    </div>
  );
}
