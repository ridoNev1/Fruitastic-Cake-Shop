import { create } from "zustand";
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axiosInstance";

interface TrackingVendorService {
  id: number;
  tracking_vendor_id: number;
  name: string;
  base_rate: string;
  per_kg_rate: string;
  estimated_days: number;
  createdAt: string;
  updatedAt: string;
}

interface VendorZone {
  id: number;
  tracking_vendor_id: number;
  origin: string;
  destination: string;
  additional_fee: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrackingVendor {
  id: number;
  vendor_name: string;
  contact_info: string;
  createdAt: string;
  updatedAt: string;
  services: TrackingVendorService[];
  zones: VendorZone[];
}

export interface SelectedShippingOption {
  vendorId: number;
  vendorName: string;
  serviceId: number;
  serviceName: string;
  cost: number;
  estimatedDays: number;
}

interface ShippingState {
  vendors: TrackingVendor[];
  selectedOption: SelectedShippingOption | null;
  isLoading: boolean;
  error: string | null;
  fetchVendors: () => Promise<void>;
  setSelectedOption: (option: SelectedShippingOption | null) => void;
  clearShippingSelection: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

export const useShippingStore = create<ShippingState>((set) => ({
  vendors: [],
  selectedOption: null,
  isLoading: false,
  error: null,

  fetchVendors: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get<TrackingVendor[]>(
        `${API_URL}/tracking-vendors`
      );
      set({ vendors: response.data, isLoading: false });
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        error.message ||
        "Failed to load shipping options. Please try again.";
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  setSelectedOption: (option) => {
    set({ selectedOption: option });
  },

  clearShippingSelection: () => {
    set({ selectedOption: null });
  },
}));
