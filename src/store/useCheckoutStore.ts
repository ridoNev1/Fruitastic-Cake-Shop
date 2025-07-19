// src/store/useCheckoutStore.ts
import { create } from "zustand";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useAuthStore } from "./authStore";
import { useShippingStore } from "./useShippingStore";
import { useCartStore } from "./useCartStore";
import axiosInstance from "@/utils/axiosInstance";
import type { Order } from "@/types";

interface CheckoutItem {
  productId: string;
  qty: number;
}

interface CheckoutShippingDetails {
  recipient_name: string;
  recipient_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_province: string;
  vendor_id: number;
  serviceId: number;
}

interface OrderPayload {
  shippingDetails: CheckoutShippingDetails;
  items: CheckoutItem[];
}

export interface CheckoutResponse {
  message?: string;
  paymentUrl: string;
  transactionId?: number;
}

interface CheckoutState {
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  orders: Order[];
  fetchOrders: () => Promise<void>;
  createOrder: () => Promise<CheckoutResponse | null>;
  clearMessages: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export const useCheckoutStore = create<CheckoutState>((set) => ({
  isLoading: false,
  error: null,
  successMessage: null,
  orders: [],
  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    const token = useAuthStore.getState().token;

    if (!token) {
      set({
        isLoading: false,
        error: "Anda harus login untuk melihat pesanan.",
      });
      return;
    }

    try {
      const response = await axiosInstance.get<Order[]>(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ orders: response.data, isLoading: false });
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "Gagal mengambil data pesanan.";
      set({ isLoading: false, error: errorMessage });
      toast.error(errorMessage);
    }
  },
  createOrder: async () => {
    set({ isLoading: true, error: null, successMessage: null });

    const authState = useAuthStore.getState();
    const shippingState = useShippingStore.getState();
    const cartState = useCartStore.getState();

    const token = authState.token;
    const user = authState.user;
    const selectedShipping = shippingState.selectedOption;
    const cartItems = cartState.items;

    if (!token) {
      set({
        error: "Authentication token not found. Please login.",
        isLoading: false,
      });
      toast.error("Authentication required. Please login.");
      return null;
    }

    if (
      !user ||
      !user.address_line ||
      !user.city ||
      !user.postal_code ||
      !user.province ||
      !user.phone_number
    ) {
      set({
        error: "Delivery address is incomplete. Please update your profile.",
        isLoading: false,
      });
      toast.error(
        "Delivery address is incomplete. Please update your profile."
      );
      return null;
    }

    if (!selectedShipping) {
      set({ error: "No shipping option selected.", isLoading: false });
      toast.error("Please select a shipping option.");
      return null;
    }

    if (cartItems.length === 0) {
      set({
        error: "Cart is empty. Please add items to your cart.",
        isLoading: false,
      });
      toast.error("Your cart is empty. Please add items to your cart.");
      return null;
    }

    try {
      const shippingDetails: CheckoutShippingDetails = {
        recipient_name: user.name || "Unknown Recipient",
        recipient_phone: user.phone_number,
        shipping_address: user.address_line,
        shipping_city: user.city,
        shipping_postal_code: user.postal_code,
        shipping_province: user.province,
        vendor_id: selectedShipping.vendorId,
        serviceId: selectedShipping.serviceId,
      };
      const items: CheckoutItem[] = cartItems.map((item) => ({
        productId: item.id,
        qty: item.quantity,
      }));

      const payload: OrderPayload = {
        shippingDetails,
        items,
      };

      const response = await axiosInstance.post<CheckoutResponse>(
        `${API_URL}/orders/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      set({
        isLoading: false,
        successMessage: response.data.message || "Order created successfully!",
        error: null,
      });
      toast.success(response.data.message || "Order created successfully!");
      cartState.clearCart();
      shippingState.clearShippingSelection();

      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message ||
        "Failed to create order.";
      set({ isLoading: false, error: errorMessage, successMessage: null });
      toast.error(errorMessage);
      return null;
    }
  },

  clearMessages: () => {
    set({ error: null, successMessage: null });
  },
}));
