import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";
import { AuthI } from "../types/auth.type";

const useAuthStore = create(
  persist<AuthI>(
    (set) => ({
      user: {
        isAuth: false,
        profile: {
          picture: null,
          username: null,
        },
      },
      setUser: (user) => set({ user }),
      logout: () =>
        set({
          user: { isAuth: false, profile: { picture: null, username: null } },
        }),
    }),
    {
      name: "app-auth-storage",
      storage: {
        getItem: async (name) => {
          const item = await AsyncStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);

export default useAuthStore;
