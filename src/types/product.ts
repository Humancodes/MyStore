export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface Category {
  name: string;
  slug: string;
}

export type ProductSortOption = 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  searchQuery?: string;
}
