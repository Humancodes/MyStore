import { FirestoreService } from './firestoreService';
import { fetchAllProducts as fetchAllProductsFromAPI } from './fakeStoreApi';
import { where, QueryConstraint } from 'firebase/firestore';
import type { FirestoreProduct } from '@/types/firestore';
import type { Product } from '@/types/product';

export function convertFirestoreProductToProduct(
  firestoreProduct: FirestoreProduct
): Product {
  return {
    id: firestoreProduct.id as any,
    title: firestoreProduct.title,
    price: firestoreProduct.price,
    description: firestoreProduct.description,
    category: firestoreProduct.category,
    image: firestoreProduct.images?.[0] || '',
    images: firestoreProduct.images || [],
    rating: {
      rate: firestoreProduct.rating || 0,
      count: firestoreProduct.reviewCount || 0,
    },
  };
}

async function fetchFirestoreProducts(filters?: {
  title?: string;
  price_min?: number;
  price_max?: number;
  category?: string;
  status?: 'active' | 'inactive' | 'out_of_stock';
}): Promise<Product[]> {
  try {
    const constraints: QueryConstraint[] = [];

    if (filters?.status) {
      constraints.push(where('status', '==', filters.status));
    } else {
      constraints.push(where('status', '==', 'active'));
    }

    if (filters?.category) {
      constraints.push(where('category', '==', filters.category));
    }

    const { products } = await FirestoreService.getProducts(constraints, 1000);

    let filteredProducts = products;

    if (filters?.title) {
      const titleLower = filters.title.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.title.toLowerCase().includes(titleLower)
      );
    }

    if (filters?.price_min !== undefined) {
      filteredProducts = filteredProducts.filter(
        p => p.price >= filters.price_min!
      );
    }

    if (filters?.price_max !== undefined) {
      filteredProducts = filteredProducts.filter(
        p => p.price <= filters.price_max!
      );
    }

    return filteredProducts.map(convertFirestoreProductToProduct);
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    return [];
  }
}

async function fetchAPIProducts(filters?: {
  title?: string;
  price_min?: number;
  price_max?: number;
  category?: string;
}): Promise<Product[]> {
  try {
    const apiFilters: any = {};

    if (filters?.title) {
      apiFilters.title = filters.title;
    }
    if (filters?.price_min !== undefined) {
      apiFilters.price_min = filters.price_min;
    }
    if (filters?.price_max !== undefined) {
      apiFilters.price_max = filters.price_max;
    }
    if (filters?.category) {
      apiFilters.categorySlug = filters.category
        .toLowerCase()
        .replace(/\s+/g, '-');
    }

    const apiProducts = await fetchAllProductsFromAPI(apiFilters);
    return apiProducts;
  } catch (error) {
    console.error('Error fetching products from API:', error);
    return [];
  }
}

export async function fetchAllProductsFromFirestore(filters?: {
  title?: string;
  price_min?: number;
  price_max?: number;
  category?: string;
  status?: 'active' | 'inactive' | 'out_of_stock';
}): Promise<Product[]> {
  const [firestoreProducts, apiProducts] = await Promise.all([
    fetchFirestoreProducts(filters),
    fetchAPIProducts(filters),
  ]);

  const mergedProducts = [...firestoreProducts, ...apiProducts];

  return mergedProducts;
}

export async function fetchProductByIdFromFirestore(
  productId: string | number
): Promise<Product | null> {
  try {
    if (typeof productId === 'string') {
      const product = await FirestoreService.getProduct(productId);
      if (product) {
        return convertFirestoreProductToProduct(product);
      }
    }

    const { fetchProductById } = await import('./fakeStoreApi');
    if (typeof productId === 'number') {
      try {
        const apiProduct = await fetchProductById(productId);
        return apiProduct;
      } catch {
        return null;
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getCategoriesFromProducts(): Promise<
  Array<{
    id: number;
    name: string;
    slug: string;
    image: string;
  }>
> {
  try {
    const [firestoreProducts, apiProducts] = await Promise.all([
      fetchFirestoreProducts({ status: 'active' }),
      fetchAPIProducts(),
    ]);

    const allProducts = [...firestoreProducts, ...apiProducts];

    const categorySet = new Set<string>();
    allProducts.forEach(p => {
      if (p.category) {
        categorySet.add(p.category);
      }
    });

    return Array.from(categorySet)
      .sort()
      .map((name, index) => ({
        id: index + 1,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        image: `https://placehold.co/600x400?text=${encodeURIComponent(name)}`,
      }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
