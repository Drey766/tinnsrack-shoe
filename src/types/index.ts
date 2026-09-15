export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  style_details: string;
  price: number;
  images: string[];
  color: string;
  sizes: string[];
  category: "heels" | "sandals" | "boots" | "flats";
  heel_height?: string | null;
  occasions: string[];
  sku: string;
  is_featured: boolean;
  is_new: boolean;
  in_stock: boolean;
  rating: number;
  review_count: number;
}

export interface CartItem {
  product: Product;
  selected_size: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  added_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read_time: string;
  cover_image: string;
  content: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export interface FAQ {
  id: string;
  q: string;
  a: string;
}
