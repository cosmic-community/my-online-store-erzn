export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    category_image?: CosmicImage;
  };
}

export type InventoryStatus = 'In Stock' | 'Out of Stock' | 'Low Stock' | 'Pre-Order';

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    product_name?: string;
    description?: string;
    price?: number;
    main_image?: CosmicImage;
    gallery?: CosmicImage[];
    inventory_status?: string;
    stock_quantity?: number;
    category?: Category;
    featured?: boolean;
  };
}

export interface Variant extends CosmicObject {
  type: 'variants';
  metadata: {
    variant_name?: string;
    product?: Product;
    sku?: string;
    size?: string;
    color?: string;
    price_adjustment?: number;
    stock_level?: number;
    variant_image?: CosmicImage;
  };
}

export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    reviewer_name?: string;
    product?: Product;
    rating?: number | string;
    review_title?: string;
    review_text?: string;
    verified_purchase?: boolean;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}