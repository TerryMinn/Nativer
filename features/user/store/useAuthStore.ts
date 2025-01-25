import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthI } from "../types/auth.type";
import { AUTH_STORE } from "@/constants/Service";
import { storage } from "@/utils/storage";

const useAuthStore = create(
  persist<AuthI>(
    (set) => ({
      session: {
        isAuth: false,
        profile: {
          picture: undefined,
          username: undefined,
          email: undefined,
          created_at: undefined,
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
              created_at: undefined,
            },
          },
        }),
    }),
    {
      name: AUTH_STORE,
      storage: {
        getItem: (name) => {
          const value = storage.getString(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          storage.set(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          storage.delete(name);
        },
      },
    }
  )
);

export default useAuthStore;
