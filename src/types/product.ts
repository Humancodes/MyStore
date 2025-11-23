export interface Product {
  id: number | string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string; // Primary image (first image from API)
  images?: string[]; // All product images from API
  rating: {
    rate: number;
    count: number;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export type ProductSortOption = 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface ProductFilters {
  title?: string;
  price?: number;
  price_min?: number;
  price_max?: number;
  categoryId?: number;
  categorySlug?: string;
  offset?: number;
  limit?: number;
}
