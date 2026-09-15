import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-black">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(201,162,39,0.18) 0%, rgba(201,162,39,0.06) 45%, transparent 70%)",
        }}
      />
      <div className="container-site relative flex min-h-[86vh] flex-col items-center justify-center py-24 text-center sm:min-h-[90vh]">
        <span className="font-accent text-xl italic text-brand-gold sm:text-2xl">
          Luxury & Classy Shoes
        </span>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-[1.05] text-brand-white sm:text-6xl lg:text-7xl">
          Step Out. Stand Out.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-light/85 sm:text-lg">
          Heels, sandals & boots for the woman who means business — in every sense
          of the word. Same-day delivery across Nairobi.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/shop" className="btn-primary btn-step">
            Shop New In 👠
          </Link>
          <a
            href="https://wa.me/254768008365?text=Hi%20The%20Tinnsrack!%20I%27d%20love%20some%20help%20finding%20a%20pair."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp btn-step"
          >
            Chat with Us
          </a>
        </div>
      </div>
    </section>
  );
}
