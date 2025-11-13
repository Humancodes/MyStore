import type { Product, Category } from '@/types/product';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

// Hardcoded products data (fallback if API fails)
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.3,
    description:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 55.99,
    description:
      'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 4,
    title: 'Mens Casual Slim Fit',
    price: 15.99,
    description:
      'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    rating: { rate: 2.1, count: 430 },
  },
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 6,
    title: 'Solid Gold Petite Micropave',
    price: 168,
    description:
      'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 3.9, count: 70 },
  },
  {
    id: 7,
    title: 'White Gold Plated Princess',
    price: 9.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 3, count: 400 },
  },
  {
    id: 8,
    title: 'Pierced Owl Rose Gold Plated Stainless Steel Double',
    price: 10.99,
    description:
      'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 1.9, count: 100 },
  },
  {
    id: 9,
    title: 'WD 2TB Elements Portable External Hard Drive',
    price: 64,
    description:
      'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user hardware configuration and operating system',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    rating: { rate: 3.3, count: 203 },
  },
  {
    id: 10,
    title: 'SanDisk SSD PLUS 1TB Internal SSD',
    price: 109,
    description:
      'Easy upgrade for faster boot up, shutdown, app load and response (As compared to 5400 RPM SATA 2.5" hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
    rating: { rate: 2.9, count: 470 },
  },
  {
    id: 11,
    title:
      'Silicon Power 256GB SSD 3D NAND A55 Internal SSD - SATA III 6 Gb/s',
    price: 109,
    description:
      '3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/71kWymZ7+L._AC_SX679_.jpg',
    rating: { rate: 4.8, count: 319 },
  },
  {
    id: 12,
    title:
      'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive',
    price: 114,
    description:
      "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg',
    rating: { rate: 4.8, count: 400 },
  },
  {
    id: 13,
    title: 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
    price: 599,
    description:
      '21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
    rating: { rate: 2.9, count: 250 },
  },
  {
    id: 14,
    title:
      'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED',
    price: 999.99,
    description:
      '49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
    rating: { rate: 2.2, count: 140 },
  },
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description:
      'Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    rating: { rate: 2.6, count: 235 },
  },
  {
    id: 16,
    title:
      "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description:
      '100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',
    rating: { rate: 2.9, count: 340 },
  },
  {
    id: 17,
    title: 'Rain Jacket Women Windbreaker Striped Climbing Raincoats',
    price: 39.99,
    description:
      "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
    rating: { rate: 3.8, count: 679 },
  },
  {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V",
    price: 9.85,
    description:
      '95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
    rating: { rate: 4.7, count: 130 },
  },
  {
    id: 19,
    title: "Opna Women's Short Sleeve Moisture",
    price: 7.95,
    description:
      '100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
    rating: { rate: 4.5, count: 146 },
  },
  {
    id: 20,
    title: 'DANVOUY Womens T Shirt Casual Cotton Short',
    price: 12.99,
    description:
      '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual,Office,Street,School,Home,Holiday, Fashion, Casual, Occasion: Casual,Office,Street,School,Home,Holiday, Fashion, Casual',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
    rating: { rate: 3.6, count: 145 },
  },
];

/**
 * Validate if an image URL is valid
 * Returns true if the URL is a valid HTTP/HTTPS URL
 * Note: We allow placehold.co URLs even without query params as they work with unoptimized images
 */
function isValidImageUrl(url: string | undefined | null): boolean {
  if (!url || typeof url !== 'string' || url.trim() === '') return false;
  
  // Check if it's a valid HTTP/HTTPS URL
  try {
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) return false;
    
    // Allow all valid HTTP/HTTPS URLs
    // placehold.co URLs work fine with unoptimized images
    return true;
  } catch {
    return false;
  }
}

/**
 * Shuffle array randomly (Fisher-Yates algorithm)
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Transform API product to our Product type
 * Platzi API returns: { id, title, price, description, category: {id, name, slug, image}, images: [] }
 * We need to transform to: { id, title, price, description, category: string, image: string, rating }
 * Returns null if product has no valid image
 */
function transformProduct(product: any, index: number): Product | null {
  // Extract all images from various possible sources
  let images: string[] = [];
  let primaryImage: string | undefined;
  
  // First, try to get images array from API
  if (Array.isArray(product.images) && product.images.length > 0) {
    // Filter and validate all images
    images = product.images.filter((img: string) => isValidImageUrl(img));
    primaryImage = images[0];
  }
  
  // If no valid images from array, try other sources
  if (!primaryImage) {
    if (typeof product.category === 'object' && product.category.image && isValidImageUrl(product.category.image)) {
      const categoryImage = product.category.image as string;
      primaryImage = categoryImage;
      images = [categoryImage];
    } else if (product.image && isValidImageUrl(product.image)) {
      const productImage = product.image as string;
      primaryImage = productImage;
      images = [productImage];
    }
  }
  
  // If no valid image URL, return null (product will be filtered out)
  if (!primaryImage) {
    return null;
  }
  
  // Extract category name from category object
  const categoryName = typeof product.category === 'object' ? product.category.name : product.category;
  
  // Enhance generic titles like "new 1", "new 2" while keeping proper API titles
  let enhancedTitle = product.title;
  if (!product.title || /^new\s*\d+$/i.test(product.title.trim()) || product.title.trim().length < 5) {
    // Generate a better title from category and description
    const description = product.description || '';
    const category = categoryName || 'Product';
    
    // Category-specific title generators
    const categoryTitles: Record<string, string[]> = {
      'clothes': ['Classic Cotton T-Shirt', 'Premium Denim Jeans', 'Comfortable Hoodie', 'Stylish Polo Shirt', 'Casual Summer Dress', 'Designer Jacket', 'Elegant Blazer', 'Soft Cotton Sweater'],
      'electronics': ['Smart Wireless Headphones', 'High-Performance Laptop', 'Portable Power Bank', 'Wireless Mouse', 'USB-C Charging Cable', 'Bluetooth Speaker', 'Smart Watch', 'Tablet Stand'],
      'furniture': ['Modern Office Chair', 'Comfortable Sofa Set', 'Wooden Dining Table', 'Ergonomic Desk', 'Cozy Bed Frame', 'Storage Cabinet', 'Coffee Table', 'Bookshelf'],
      'shoes': ['Running Sports Shoes', 'Casual Sneakers', 'Formal Leather Shoes', 'Comfortable Sandals', 'Winter Boots', 'Athletic Trainers', 'Dress Shoes', 'Hiking Boots'],
      'others': ['Premium Accessory', 'Quality Product', 'Designer Item', 'Luxury Collection', 'Exclusive Edition', 'Limited Edition', 'Special Collection', 'Signature Series'],
    };
    
    // Normalize category name for matching
    const normalizedCategory = category.toLowerCase().trim();
    
    // Get category-specific titles or use generic ones
    const titles = categoryTitles[normalizedCategory] || ['Premium Product', 'Quality Item', 'Designer Collection', 'Exclusive Edition', 'Luxury Item'];
    
    // Use product ID to consistently select a title for the same product
    const titleIndex = product.id % titles.length;
    enhancedTitle = titles[titleIndex];
  }
  
  return {
    id: product.id,
    title: enhancedTitle,
    price: product.price,
    description: product.description || 'No description available',
    category: categoryName,
    // Primary image (first valid image)
    image: primaryImage,
    // All valid images array
    images: images.length > 0 ? images : [primaryImage],
    // Add rating (Platzi API doesn't provide rating, so generate random)
    rating: product.rating || {
      rate: Math.round((Math.random() * 3 + 2) * 10) / 10, // 2.0 to 5.0
      count: Math.floor(Math.random() * 500) + 50, // 50 to 550
    },
  };
}

/**
 * Build query string from filter parameters
 */
function buildQueryString(filters: {
  title?: string;
  price?: number;
  price_min?: number;
  price_max?: number;
  categoryId?: number;
  categorySlug?: string;
  offset?: number;
  limit?: number;
}): string {
  const params = new URLSearchParams();

  if (filters.title) params.append('title', filters.title);
  if (filters.price !== undefined) params.append('price', filters.price.toString());
  if (filters.price_min !== undefined) params.append('price_min', filters.price_min.toString());
  if (filters.price_max !== undefined) params.append('price_max', filters.price_max.toString());
  if (filters.categoryId !== undefined) params.append('categoryId', filters.categoryId.toString());
  if (filters.categorySlug) params.append('categorySlug', filters.categorySlug);
  if (filters.offset !== undefined) params.append('offset', filters.offset.toString());
  if (filters.limit !== undefined) params.append('limit', filters.limit.toString());

  return params.toString();
}

/**
 * Fetch all products from Platzi Fake Store API
 * Supports filtering, pagination, and combining multiple filters
 */
export async function fetchAllProducts(
  filters: {
    title?: string;
    price?: number;
    price_min?: number;
    price_max?: number;
    categoryId?: number;
    categorySlug?: string;
    offset?: number;
    limit?: number;
  } = {}
): Promise<Product[]> {
  try {
    const defaultLimit = filters.limit || 50;
    const defaultOffset = filters.offset || 0;
    
    const queryString = buildQueryString({
      ...filters,
      limit: defaultLimit,
      offset: defaultOffset,
    });

    const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const products = await response.json();
    
    // Log API response for debugging (only in development)
    if (process.env.NODE_ENV === 'development' && products.length > 0) {
      console.log('API Response sample:', {
        total: products.length,
        firstProduct: {
          id: products[0].id,
          title: products[0].title,
          images: products[0].images,
        },
      });
    }
    
    // Transform products to match our Product type and filter out products without valid images
    const transformedProducts = products
      .map((product: any, index: number) => transformProduct(product, index))
      .filter((product: Product | null): product is Product => product !== null);
    
    // Log transformed products for debugging
    if (process.env.NODE_ENV === 'development' && transformedProducts.length > 0) {
      console.log('Transformed products sample:', {
        total: transformedProducts.length,
        firstProduct: {
          id: transformedProducts[0].id,
          title: transformedProducts[0].title,
          images: transformedProducts[0].images,
        },
      });
    }
    
    // Shuffle products to make it feel fresh (randomize order)
    return shuffleArray(transformedProducts);
  } catch (error) {
    console.error('Error fetching products from API, using fallback data:', error);
    // Fallback to hardcoded data if API fails
    return MOCK_PRODUCTS;
  }
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const product = await response.json();
    const transformed = transformProduct(product, id);
    if (!transformed) {
      throw new Error(`Product with id ${id} has no valid image`);
    }
    return transformed;
  } catch (error) {
    console.error(`Error fetching product ${id} from API, using fallback:`, error);
    // Fallback to hardcoded data if API fails
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }
}

/**
 * Fetch all categories
 * Returns category objects with id, name, slug, image
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories from API, using fallback:', error);
    // Fallback to hardcoded data if API fails
    const categoryNames = Array.from(
      new Set(MOCK_PRODUCTS.map((p) => p.category))
    );
    // Convert to Category format
    return categoryNames.map((name, index) => ({
      id: index + 1,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      image: `https://placehold.co/600x400?text=${encodeURIComponent(name)}`,
    }));
  }
}

/**
 * Get category by name or slug
 * Helper function to find category ID from name/slug
 */
export async function getCategoryByNameOrSlug(
  nameOrSlug: string
): Promise<Category | null> {
  try {
    const categories = await fetchCategories();
    const normalized = nameOrSlug.toLowerCase();
    
    return (
      categories.find(
        (cat) =>
          cat.name.toLowerCase() === normalized ||
          cat.slug.toLowerCase() === normalized
      ) || null
    );
  } catch (error) {
    console.error('Error getting category:', error);
    return null;
  }
}

/**
 * Fetch products by category
 * Accepts category ID, name, or slug
 * Uses the efficient /categories/{id}/products endpoint
 */
export async function fetchProductsByCategory(
  category: string | number
): Promise<Product[]> {
  try {
    let categoryId: number;

    // If category is a number, use it directly as ID
    if (typeof category === 'number') {
      categoryId = category;
    } else {
      // Otherwise, find category by name or slug
      const categoryObj = await getCategoryByNameOrSlug(category);
      if (!categoryObj) {
        // Fallback: fetch all and filter by name
        const response = await fetch(`${API_BASE_URL}/products?offset=0&limit=200`, {
          next: { revalidate: 3600 },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const products = await response.json();
        const transformedProducts = products
          .map((product: any, index: number) => transformProduct(product, index))
          .filter((product: Product | null): product is Product => product !== null)
          .filter((p: Product) => p.category.toLowerCase() === category.toLowerCase());
        
        return shuffleArray(transformedProducts);
      }
      categoryId = categoryObj.id;
    }

    // Use the efficient category products endpoint
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/products`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products by category: ${response.statusText}`);
    }

    const products = await response.json();
    // Transform products to match our Product type and filter out products without valid images
    const transformedProducts = products
      .map((product: any, index: number) => transformProduct(product, product.id || index))
      .filter((product: Product | null): product is Product => product !== null);
    
    // Shuffle products to make it feel fresh
    return shuffleArray(transformedProducts);
  } catch (error) {
    console.error(`Error fetching products for category ${category} from API, using fallback:`, error);
    // Fallback to hardcoded data if API fails
    return MOCK_PRODUCTS.filter((p) => 
      p.category.toLowerCase() === String(category).toLowerCase()
    );
  }
}
