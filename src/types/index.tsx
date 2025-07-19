export interface User {
  id: number;
  name: string;
  email: string;
  role: number;
  address_line?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  phone_number?: string;
  profile_picture_url?: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  phone_number: string;
}

interface ProductSummary {
  id: number;
  product_name: string;
  product_price: number;
  product_image_url: string;
}

interface CartItemDetail {
  id: number;
  product_id: number;
  qty: number;
  product: ProductSummary;
}

export interface Order {
  id: number;
  user_id: number;
  transaction_status: number;
  tracking_position: number | null;
  shipping_cost: number;
  shipping_address: string;
  shipping_city: string;
  recipient_phone: string;
  recipient_name: string;
  createdAt: string;
  cart_items: CartItemDetail[];
}
