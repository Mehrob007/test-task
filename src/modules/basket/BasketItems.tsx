import { Basket } from "@/types/basket";
import React from "react";
import BasketItem from "./BasketItem";

export default function BasketItems({ data }: { data: Basket[] }) {
  return (
    <div className="basket-items">
      {Array.isArray(data)
        ? data.map((e, i) => <BasketItem item={e} key={i} index={i} />)
        : ""}
    </div>
  );
}
