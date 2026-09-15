# The Tinnsrack 👠

**Luxury & classy shoes. Nairobi's favourite step.**

This is the code behind [@shoes_by_tinnsrack](https://www.instagram.com/shoes_by_tinnsrack) — a full storefront for a boutique that doesn't do generic. Heels, sandals, and boots for the woman who means business, with same-day delivery across Nairobi and M-Pesa built right in.

No database, no admin dashboard, no logins. Just a fast, good-looking site you can update by editing a JSON file. Here's everything you need to run it, tweak it, and ship it.

---

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # already done for you — just fill in real values when you're ready
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're in. The site runs immediately with placeholder env values — you only need real M-Pesa and WhatsApp credentials once you're ready to take real orders.

---

## Updating Your Products

Every shoe on the site lives in one file: `src/data/products.json`. No CMS, no dashboard — just open it, edit it, save it, redeploy.

To add a new pair, copy an existing product object and change the fields:

```json
{
  "id": "30",
  "name": "Your Shoe Name - Colour",
  "slug": "your-shoe-name-colour",
  "brand": "Brand Name",
  "description": "A short, characterful description.",
  "style_details": "Material, silhouette, and design notes.",
  "price": 3200,
  "images": ["https://your-image-url.jpg"],
  "color": "Colour",
  "sizes": ["37", "38", "39"],
  "category": "heels",
  "heel_height": "80mm",
  "occasions": ["party", "date-night"],
  "sku": "TTR00030",
  "is_featured": false,
  "is_new": true,
  "in_stock": true,
  "rating": 4.8,
  "review_count": 10
}
```

`category` must be one of `heels`, `sandals`, `boots`, or `flats` — that's what drives the category grid and filters on the shop page. Set `is_featured: true` to show a pair in the homepage "New In" section.

## Updating Blog Posts

Same idea — `src/data/blogs.json`. Each post is plain HTML inside a `content` field, so you can write in Google Docs, clean it up, and drop it in. Testimonials live in `src/data/testimonials.json`, FAQs in `src/data/faqs.json`.

---

## Setting Up M-Pesa (Daraja)

1. Create an account at [developer.safaricom.co.ke](https://developer.safaricom.co.ke) and register an app to get your **Consumer Key** and **Consumer Secret**.
2. For testing, use the sandbox shortcode `174379` (already set as the default). For real payments, apply for a paybill/till number and get your production shortcode + passkey from Safaricom.
3. Fill in `.env.local`:
   ```
   MPESA_CONSUMER_KEY=...
   MPESA_CONSUMER_SECRET=...
   MPESA_BUSINESS_SHORT_CODE=...
   MPESA_PASSKEY=...
   MPESA_CALLBACK_URL=https://your-domain.vercel.app/api/mpesa/callback
   ```
4. Once deployed, Safaricom will hit `MPESA_CALLBACK_URL` after every payment attempt — that's handled by `src/app/api/mpesa/callback/route.ts`, which logs the result and pings you on WhatsApp when a payment clears.

**Heads up:** the callback URL has to be publicly reachable over HTTPS, so this step only works once you've deployed (sandbox testing against `localhost` won't receive callbacks — use a tunnel like `ngrok` if you need to test locally).

## Setting Up WhatsApp

1. Go to [developers.facebook.com](https://developers.facebook.com), create an app, and add the **WhatsApp** product.
2. Grab your **temporary access token** (or generate a permanent one once you're out of testing) and your **Phone Number ID** from the API Setup screen.
3. Fill in `.env.local`:
   ```
   WHATSAPP_API_TOKEN=...
   WHATSAPP_PHONE_NUMBER_ID=...
   OWNER_WHATSAPP_NUMBER=254768008365
   ```
4. Every order placed on the site sends a formatted order summary straight to `OWNER_WHATSAPP_NUMBER` — no order database needed, that WhatsApp message *is* your order record.

---

## Deploying

1. Push this project to a GitHub repo.
2. Import it into [Vercel](https://vercel.com).
3. Add all the variables from `.env.local` into Vercel's Environment Variables settings.
4. Update `NEXT_PUBLIC_SITE_URL` and `MPESA_CALLBACK_URL` to your real production domain once it's live.
5. Deploy. That's it — no build steps, no database migrations, no admin setup.

---

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** with The Tinnsrack's black/gold/blush design system
- **React Context + localStorage** for cart and wishlist (no auth, no backend state)
- **M-Pesa Daraja API** for STK Push payments
- **WhatsApp Business Cloud API** for order notifications
- **Static JSON** for products, blog, testimonials, and FAQs — no database, ever

---

Questions about the code? That's between you and whoever built this for you. Questions about the shoes? WhatsApp **0768 008 365** — same as everyone else. 👠
