import { create } from "zustand";
import Cookies from "js-cookie";

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  vbucksBalance?: number;
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  initAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    set({ user });
  },

  logout: () => {
    Cookies.remove("accessToken");
    localStorage.removeItem("user");
    set({ user: null });
  },

  initAuth: () => {
    const token = Cookies.get("accessToken");
    if (!token) {
      // sem token, não tem user
      set({ user: null });
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        set({ user });
      } catch {
        localStorage.removeItem("user");
        set({ user: null });
      }
    }
  },
}));
