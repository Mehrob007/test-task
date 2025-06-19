import { Basket } from "@/types/basket";
import React from "react";

export default function BasketItem({ item }: { item: Basket; index?: number }) {
  return (
    <div className="basket-item">
      <h1>{item.title}</h1>{" "}
      <div>
        <span>x{item.quantity}</span>
        <p>{item.price}</p>
      </div>
    </div>
  );
}
