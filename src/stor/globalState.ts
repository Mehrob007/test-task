import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Basket } from "@/types/basket";

interface GlobalState {
  dataBasket: Basket[];
  setDataBasket: (state: Basket[]) => void;
}

export const useGlobalStore =
  typeof window !== "undefined"
    ? create<GlobalState>()(
        persist(
          (set) => ({
            dataBasket: [],
            setDataBasket: (state) => set({ dataBasket: state }),
          }),
          {
            name: "basket-store",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
              dataBasket: state.dataBasket,
            }),
          },
        ),
      )
    : create<GlobalState>(() => ({
        dataBasket: [],
        setDataBasket: () => {},
      }));
