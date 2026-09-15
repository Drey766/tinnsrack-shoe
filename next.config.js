/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // `unoptimized: true` makes next/image behave like a plain <img> tag —
    // no server-side proxying/optimization step. We're a small static catalog
    // (32 fixed images total), so the reliability win here matters more than
    // automatic format conversion: it sidesteps a real class of failure where
    // Next's image optimizer rejects or fails to fetch certain remote images
    // (we hit this already with placehold.co's SVG responses).
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

module.exports = nextConfig;
