export interface ProductVariant {
  color: string;
  colorCode: string;
  images: string[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  variants: ProductVariant[];
}