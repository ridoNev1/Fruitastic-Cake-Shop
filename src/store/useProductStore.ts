// src/stores/productStore.ts
import { create } from "zustand";
import { AxiosError } from "axios";
import { useAuthStore } from "./authStore";
import axiosInstance from "@/utils/axiosInstance";

interface Product {
  id: string;
  product_name: string;
  product_price: number;
  product_qty: number;
  product_weight: number;
  product_story: string;
  product_image_url: string;
  createdAt?: string;
  updatedAt?: string;
}
type ProductFormData = Omit<Product, "id" | "createdAt" | "updatedAt">;

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  message: string | null;

  fetchAllProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  createProduct: (productData: ProductFormData) => Promise<boolean>;
  updateProduct: (
    id: string,
    productData: Partial<ProductFormData>
  ) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  clearSelectedProduct: () => void;
  clearMessages: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  message: null,

  fetchAllProducts: async () => {
    set({ loading: true, error: null, message: null });
    try {
      const response = await axiosInstance.get<Product[]>(
        `${API_BASE_URL}/products`
      );
      set({ products: response.data, loading: false });
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message ||
        "Failed to fetch products.";
      set({ error: errorMessage, loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null, message: null });
    try {
      const response = await axiosInstance.get<Product>(
        `${API_BASE_URL}/products/${id}`
      );
      set({ selectedProduct: response.data, loading: false });
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message ||
        `Failed to fetch product with ID ${id}.`;
      set({ error: errorMessage, loading: false });
    }
  },

  createProduct: async (productData) => {
    set({ loading: true, error: null, message: null });
    const token = useAuthStore.getState().token;
    if (!token) {
      set({ error: "Authentication token not found.", loading: false });
      return false;
    }
    try {
      const response = await axiosInstance.post<{
        message: string;
        product: Product;
      }>(`${API_BASE_URL}/products`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        products: [...state.products, response.data.product],
        loading: false,
        message: response.data.message || "Product created successfully!",
      }));
      return true;
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message ||
        "Failed to create product.";
      set({ error: errorMessage, loading: false });
      return false;
    }
  },

  updateProduct: async (id, productData) => {
    set({ loading: true, error: null, message: null });
    const token = useAuthStore.getState().token;
    if (!token) {
      set({ error: "Authentication token not found.", loading: false });
      return false;
    }
    try {
      const response = await axiosInstance.put<{
        message: string;
        product: Product;
      }>(`${API_BASE_URL}/products/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, ...response.data.product } : p
        ),
        selectedProduct:
          state.selectedProduct?.id === id
            ? { ...state.selectedProduct, ...response.data.product }
            : state.selectedProduct,
        loading: false,
        message: response.data.message || "Product updated successfully!",
      }));
      return true;
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message ||
        "Failed to update product.";
      set({ error: errorMessage, loading: false });
      return false;
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null, message: null });
    const token = useAuthStore.getState().token;
    if (!token) {
      set({ error: "Authentication token not found.", loading: false });
      return false;
    }
    try {
      const response = await axiosInstance.delete<{ message: string }>(
        `${API_BASE_URL}/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        selectedProduct:
          state.selectedProduct?.id === id ? null : state.selectedProduct,
        loading: false,
        message: response.data.message || "Product deleted successfully!",
      }));
      return true;
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message ||
        "Failed to delete product.";
      set({ error: errorMessage, loading: false });
      return false;
    }
  },

  clearSelectedProduct: () => set({ selectedProduct: null }),
  clearMessages: () => set({ message: null, error: null }),
}));
