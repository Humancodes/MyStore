export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Books',
  'Sports & Outdoors',
  'Toys & Games',
  'Beauty & Personal Care',
  'Health & Wellness',
  'Automotive',
  'Food & Beverages',
  'Pet Supplies',
  'Office Supplies',
  'Jewelry',
  'Furniture',
  'Baby Products',
  'Garden & Tools',
  'Musical Instruments',
  'Art & Crafts',
  'Travel & Luggage',
  'Other',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

