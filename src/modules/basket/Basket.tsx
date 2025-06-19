"use client";
import React, { useState } from "react";
import BasketItems from "./BasketItems";
import type { Basket } from "@/types/basket";
import { basketService } from "@/api/basket";
import PhoneInput from "@/components/ui/PhoneInput";

export default function Basket() {
  const [data, setData] = useState<Basket[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onSend = async () => {
    try {
      setLoading(true);
      const data = await basketService.postOrder();
      console.log("post order", data);
    } catch (err) {
      setError("Не удалось получить данные отзывов.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="basket">
      <h1>Добавленные товары</h1>
      {Array.isArray(data) ? <BasketItems data={data} /> : ""}
      <div>
        <PhoneInput value="" onChange={() => {}} /> <button>заказать</button>
      </div>
    </div>
  );
}
