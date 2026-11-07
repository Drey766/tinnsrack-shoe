import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site py-28 text-center lg:py-40">
      <h1 className="display-lg">This page has walked off.</h1>
      <p className="mx-auto mt-4 max-w-sm text-ink/70">
        The link may be old, or the pair may have sold out. Try the full collection instead.
      </p>
      <Link href="/shop" className="btn-primary mt-10">
        Shop the collection
      </Link>
    </div>
  );
}
