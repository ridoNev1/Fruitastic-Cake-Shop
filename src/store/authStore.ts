import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { jwtDecode } from "jwt-decode";
import type { RegisterFormValues, User } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<void>;
  register: (data: RegisterFormValues) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,
      register: async (data) => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.post(
            `${API_URL}/users/register`,
            data
          );
          set({ isLoading: false });
          return response.data;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      updateProfile: async (data) => {
        const { token } = get();
        if (!token) throw new Error("Unauthorized");
        set({ isLoading: true });

        try {
          const response = await axiosInstance.put(
            `${API_URL}/users/profile`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          set({
            user: { ...get().user, ...response.data.data },
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.post<{ token: string }>(
            `${API_URL}/users/login`,
            { email, password }
          );
          const { token } = response.data;

          const decodedUser = jwtDecode<User>(token);

          set({ token, user: decodedUser, isLoading: false });
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ token: null, user: null });
        delete axiosInstance.defaults.headers.common["Authorization"];
      },

      getProfile: async () => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.get<User>(
            `${API_URL}/users/profile`
          );
          set({ user: { ...get().user, ...response.data }, isLoading: false });
        } catch (error) {
          console.error("Gagal mengambil profil:", error);
          set({ isLoading: false });
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            get().logout();
          }
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
