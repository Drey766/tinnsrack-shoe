type ClassValue = string | number | null | boolean | undefined | ClassValue[];

// Lightweight class-name combiner (no extra dependency needed for this project)
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (v: ClassValue) => {
    if (!v && v !== 0) return;
    if (Array.isArray(v)) {
      v.forEach(walk);
    } else {
      out.push(String(v));
    }
  };
  inputs.forEach(walk);
  return out.join(" ");
}

// Single source for the shop's public contact details used across the UI.
export const SHOP = {
  phoneDisplay: "0768 008 365",
  phoneHref: "tel:+254768008365",
  whatsapp: "254768008365",
  addressLine1: "Shop F17, Beba Beba Trade Center",
  addressLine2: "Tom Mboya Street, Nairobi",
  hours: "Monday to Saturday, 9am – 7pm",
  instagram: "https://www.instagram.com/shoes_by_tinnsrack",
  instagramHandle: "@shoes_by_tinnsrack",
  sisterInstagram: "https://www.instagram.com/the_tinnsrack/",
  sisterHandle: "@the_tinnsrack",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Beba+Beba+Trade+Center+Tom+Mboya+Street+Nairobi",
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SHOP.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Product names in the catalogue repeat the brand ("Nine West Lorna Heel - Black").
// Cards and headings already show the brand, so drop the prefix and the colour suffix.
export function productTitle(p: { name: string; brand: string }): string {
  let title = p.name.trim();
  if (title.toLowerCase().startsWith(p.brand.toLowerCase())) {
    title = title.slice(p.brand.length).trim();
  }
  title = title.replace(/\s+-\s+[^-]+$/, "").trim();
  return title.charAt(0).toUpperCase() + title.slice(1);
}

export function formatOccasion(o: string): string {
  const map: Record<string, string> = {
    "wedding-guest": "Wedding guest",
    "date-night": "Date night",
    formal: "The office",
    everyday: "Every day",
    party: "Party season",
  };
  if (map[o]) return map[o];
  const s = o.replace(/-/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatPrice(amount: number): string {
  return `KSh ${amount.toLocaleString("en-KE")}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const KENYA_COUNTIES = [
  "Nairobi",
  "Mombasa",
  "Kwale",
  "Kilifi",
  "Tana River",
  "Lamu",
  "Taita-Taveta",
  "Garissa",
  "Wajir",
  "Mandera",
  "Marsabit",
  "Isiolo",
  "Meru",
  "Tharaka-Nithi",
  "Embu",
  "Kitui",
  "Machakos",
  "Makueni",
  "Nyandarua",
  "Nyeri",
  "Kirinyaga",
  "Murang'a",
  "Kiambu",
  "Turkana",
  "West Pokot",
  "Samburu",
  "Trans Nzoia",
  "Uasin Gishu",
  "Elgeyo-Marakwet",
  "Nandi",
  "Baringo",
  "Laikipia",
  "Nakuru",
  "Narok",
  "Kajiado",
  "Kericho",
  "Bomet",
  "Kakamega",
  "Vihiga",
  "Bungoma",
  "Busia",
  "Siaya",
  "Kisumu",
  "Homa Bay",
  "Migori",
  "Kisii",
  "Nyamira",
] as const;

// Flat KSh 150 within Nairobi (waived when same-day-eligible order shows
// same-day promise), KSh 350 outside Nairobi.
export function getShippingFee(county: string): number {
  return county === "Nairobi" ? 150 : 350;
}

export function isSameDayEligible(county: string, now: Date = new Date()): boolean {
  if (county !== "Nairobi") return false;
  return now.getHours() < 14;
}

export function formatOrderId(): string {
  return `TTR-${Date.now()}`;
}
