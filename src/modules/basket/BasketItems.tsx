import { Basket } from "@/types/basket";
import React from "react";
import BasketItem from "./BasketItem";

export default function BasketItems({
  data,
  remove,
  edit,
}: {
  data: Basket[] | null;
  remove: (id: number) => void;
  edit: (id: number, value: number) => void;
}) {
  return (
    <div className="basket-items">
      {Array.isArray(data) &&
      data.length &&
      data.filter((e) => e.quantity !== 0).length
        ? data.map((e, i) => (
            <BasketItem
              remove={remove}
              edit={edit}
              item={e}
              key={i}
              index={i}
            />
          ))
        : "Нет товаров."}
    </div>
  );
}
