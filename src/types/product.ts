export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: ProductCategory;
  subcategory: string;
  brand: string;
  specifications: ProductSpecification[];
  features: string[];
  materials: string[];
  dimensions: {
    diameter?: string;
    height?: string;
    capacity?: string;
    weight?: string;
  };
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  variants?: ProductVariant[];
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  isSale: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  images: string[];
  attributes: {
    [key: string]: string;
  };
  inStock: boolean;
  stockQuantity: number;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export enum ProductCategory {
  COOKWARE_SETS = 'cookware-sets',
  FRYING_PANS = 'frying-pans',
  SAUCE_PANS = 'sauce-pans',
  DUTCH_OVENS = 'dutch-ovens',
  ACCESSORIES = 'accessories'
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  [ProductCategory.COOKWARE_SETS]: 'Cookware Sets',
  [ProductCategory.FRYING_PANS]: 'Frying Pans',
  [ProductCategory.SAUCE_PANS]: 'Sauce Pans',
  [ProductCategory.DUTCH_OVENS]: 'Dutch Ovens',
  [ProductCategory.ACCESSORIES]: 'Accessories'
};

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FilterOptions {
  categories: ProductCategory[];
  priceRange: [number, number];
  materials: string[];
  brands: string[];
  inStockOnly: boolean;
  sortBy: 'name' | 'price' | 'rating' | 'newest';
  sortOrder: 'asc' | 'desc';
}