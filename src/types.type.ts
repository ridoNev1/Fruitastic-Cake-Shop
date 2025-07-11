export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  isVerified: boolean;
  bio: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getDetailQtyById: (productId: number) => number;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}
