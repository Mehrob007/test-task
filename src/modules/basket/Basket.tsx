"use client";
import React, {
   useState } from "react";
import BasketItems from "./BasketItems";
import type { Basket, FormDataBasket } from "@/types/basket";
import { basketService } from "@/api/basket";
import PhoneInput from "@/components/ui/PhoneInput";
import { getInitialValue } from "@/hooks/getInitialValue";

export default function Basket() {
  const [data] = useState<Basket[] | null>(() =>
    getInitialValue("basket"),
  );
  const [formData, setFormData] = useState<FormDataBasket>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const validata = () => {
    let error: string = "";
    if (!formData.phone) {
      error = "Номур обязателен!";
    } else if (formData?.phone?.length !== 11) {
      error = "Введите правельный номур!";
    } else if (!formData?.cart?.length) {
      error = "Нужно выбрать товар!";
    }

    console.log("error", error);

    if (!error.length) {
      setError("");
      return true;
    }
    setError(error);
    return false;
  };

  const onSend = async () => {
    const valid = validata();
    if (!valid) {
      return;
    }
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

  const onChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  console.log("data", data);
  

  return (
    <div className={`basket ${loading ? "loading-div" : ""}`}>
      <h1>Добавленные товары</h1>
      <BasketItems data={data} />
      <div className="basket-form">
        <div>
          <PhoneInput value="" onChange={(e) => onChange("phone", e)} />{" "}
          <button onClick={() => onSend()}>заказать</button>
        </div>
        <p>{error}</p>
      </div>
    </div>
  );
}
