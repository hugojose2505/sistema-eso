import { create } from "zustand";

interface NavbarState {
  selectedItemNavBar: string;
  setSelectedItemNavBar: (title: string) => void;
}

export const useItemNavBar = create<NavbarState>((set) => ({
  selectedItemNavBar: "Cosmeticos",
  setSelectedItemNavBar: (title) => set({ selectedItemNavBar: title }),
}));
