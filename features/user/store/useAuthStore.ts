import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";
import { AuthI } from "../types/auth.type";
import { AUTH_STORE } from "@/constants/Service";

const useAuthStore = create(
  persist<AuthI>(
    (set) => ({
      session: {
        isAuth: false,
        profile: {
          picture: undefined,
          username: undefined,
          email: undefined,
        },
        token: undefined,
      },
      setSession: (session) => set({ session }),
      logout: () =>
        set({
          session: {
            isAuth: false,
            token: undefined,
            profile: {
              picture: undefined,
              username: undefined,
              email: undefined,
            },
          },
        }),
    }),
    {
      name: AUTH_STORE,
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
