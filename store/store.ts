import { create } from "zustand";

/* =======================
   NAVIGATION VIEWS
======================= */

export type View =
  | "home"
  | "profile"
  | "settings"
  | "history"
  | "DailySaving"
  | "transaction"
  | "setting"
  | "userProfile"
  | "notification"
  | "contactUs"
  | "my-points"
  | "saving"
  | null;

/* =======================
   MODAL TYPES
======================= */

export type ModalType =
  | "Promo Code"
  | "Logout"
  | "Change App Language"
  | "Notification Settings"
  | "Add a Nominee"
  | null;

/* =======================
   STORES
======================= */

/* ---- Navigation ---- */
type NavigationStore = {
  open: View;
  setOpen: (open: View) => void;
};

export const Navigation = create<NavigationStore>((set) => ({
  open: "home",
  setOpen: (open) => set({ open }),
}));

/* ---- Edit Menu ---- */
type EditMenuStore = {
  menu: boolean;
  showEditMenu: (menu: boolean) => void;
};

export const ShowEditMenu = create<EditMenuStore>((set) => ({
  menu: false,
  showEditMenu: (menu) => set({ menu }),
}));


/* ---- Price ---- */
type PriceStore = {
  price: number;
  setPrice: (price: number) => void;
};

export const Price = create<PriceStore>((set) => ({
  price: 0,
  setPrice: (price) => set({ price }),
}));

/* ---- Sidebar ---- */
type SidebarStore = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};

export const Sidebar = create<SidebarStore>((set, get) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () =>
    set({ sidebarOpen: !get().sidebarOpen }),
}));

/* ---- Footer ---- */
type FooterStore = {
  footerOpen: boolean;
  setFooterOpen: (open: boolean) => void;
};

export const Footer = create<FooterStore>((set) => ({
  footerOpen: true,
  setFooterOpen: (open) => set({ footerOpen: open }),
}));

/* ---- Promo / Settings Modal ---- */
type PromoModalStore = {
  openSetting: ModalType;
  setSetting: (open: ModalType) => void;
};

export const PromoModel = create<PromoModalStore>((set) => ({
  openSetting: null,
  setSetting: (openSetting) => set({ openSetting }),
}));
