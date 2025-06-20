import type { FormDataBasketCart } from "@/types/basket";
import { create } from "zustand";

interface GlobalState {
  dataBasket: FormDataBasketCart[];
  setDataBasket: (state: FormDataBasketCart[]) => void;
}

export const globalState = create<GlobalState>((set) => ({
  dataBasket: [],
  setDataBasket: (state: FormDataBasketCart[]) => set({ dataBasket: state }),
}));
