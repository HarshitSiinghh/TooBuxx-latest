




import { create } from "zustand";

type User = {
  user_id: string;
  username: string;
  email: string;
  role?: string;
};

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;

  setUser: (u: User) => void;
  clearUser: () => void;
  setLoading: (v: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  loading: true,

  setUser: (u) => set({ user: u, isLoggedIn: true, loading: false }),
  clearUser: () => set({ user: null, isLoggedIn: false, loading: false }),
  setLoading: (v) => set({ loading: v }),
}));
