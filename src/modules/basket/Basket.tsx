"use client";
import React, { useEffect, useState } from "react";
import BasketItems from "./BasketItems";
import type { Basket, FormDataBasket } from "@/types/basket";
import { basketService } from "@/api/basket";
import PhoneInput from "@/components/ui/PhoneInput";
import { useGlobalStore } from "@/store/globalState";
import Popap from "@/components/ui/Popap";

export default function Basket() {
  const [data, setData] = useState<Basket[] | null>(null);
  const [formData, setFormData] = useState<FormDataBasket>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { dataBasket, setDataBasket } = useGlobalStore();
  const [popapOpen, setPopapOpen] = useState<boolean>(false);

  const tel: string | null = localStorage.getItem("tel");

  const validata = () => {
    let error: string = "";
    if (!formData.phone) {
      error = "Номер обязателен!";
    } else if (formData?.phone?.length !== 11) {
      error = "Введите правельный номур!";
    } else if (!data?.length) {
      error = "Нужно выбрать товар!";
    }

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
      if (!data) return;
      setLoading(true);
      await basketService.postOrder({
        ...formData,
        cart: data.map((e) => ({ id: e.id, quantity: e.quantity })),
      });
      setTimeout(() => setPopapOpen(true), 0);
    } catch (err) {
      setError("Не удалось получить данные отзывов.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = (id: number) => {
    setDataBasket(dataBasket.filter((e) => e.id !== id));
  };
  const edit = (id: number, value: number) => {
    setDataBasket(
      dataBasket.map((e) => {
        if (e.id === id) {
          return { ...e, quantity: value };
        } else {
          return e;
        }
      }),
    );
  };

  const onChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    localStorage.setItem("tel", value);
  };

  useEffect(() => {
    if (dataBasket) {
      setData(dataBasket);
    }
  }, [dataBasket]);
  useEffect(() => {
    if (tel) {
      setFormData((prev) => ({ ...prev, phone: tel }));
    }
  }, []);
  return (
    <div className={`basket ${loading ? "loading-div" : ""}`}>
      <h1>Добавленные товары</h1>
      <BasketItems data={data} remove={remove} edit={edit} />
      <div className="basket-form">
        <div>
          <PhoneInput
            value={formData.phone || ""}
            onChange={(e) => onChange("phone", e)}
          />{" "}
          <button onClick={() => onSend()}>заказать</button>
        </div>
        <p>{error}</p>
      </div>
      {popapOpen && <Popap cloas={() => setPopapOpen(false)} />}
    </div>
  );
}
