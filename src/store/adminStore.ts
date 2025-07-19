import { create } from "zustand";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";
import type { Order } from "@/types";
import type { AxiosError } from "axios";
import { useAuthStore } from "./authStore";

interface AdminState {
  orders: Order[];
  isLoading: boolean;
  fetchAdminOrders: () => Promise<void>;
  updateOrderStatus: (
    orderId: number,
    data: { transaction_status?: number; tracking_position?: number }
  ) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  orders: [],
  isLoading: false,

  fetchAdminOrders: async () => {
    const token = useAuthStore.getState().token;

    set({ isLoading: true });
    try {
      const response = await axiosInstance.get<Order[]>("/orders/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ orders: response.data, isLoading: false });
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message ||
        "Gagal mengambil data pesanan admin.";
      toast.error(errorMessage);
      set({ isLoading: false });
    }
  },

  updateOrderStatus: async (orderId, data) => {
    const token = useAuthStore.getState().token;

    set({ isLoading: true });
    try {
      await axiosInstance.put(`/orders/${orderId}/status`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Status pesanan #${orderId} berhasil diperbarui.`);
      await get().fetchAdminOrders();
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message ||
        "Gagal memperbarui status pesanan.";
      toast.error(errorMessage);
      set({ isLoading: false });
    }
  },
}));
