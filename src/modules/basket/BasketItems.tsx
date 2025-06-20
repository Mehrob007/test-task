import { Basket } from "@/types/basket";
import React from "react";
import BasketItem from "./BasketItem";

export default function BasketItems({ data }: { data?: Basket[] | null }) {
  return (
    <div className="basket-items">
      {Array.isArray(data) && !data.length
        ? data.map((e, i) => <BasketItem item={e} key={i} index={i} />)
        : "Нет товаров."}
    </div>
  );
}
