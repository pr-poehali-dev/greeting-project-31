export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  discount?: number;
  description: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
