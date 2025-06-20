"use client";
import React, { useEffect, useState } from "react";
import ProductsItem from "./ProductsItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { productsService } from "@/api/products";
import type { ProductsItemType } from "@/types/products";
import { globalState } from "@/stor/globalState";

export default function ProductsItems() {
  const [data, setData] = useState<ProductsItemType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { dataBasket, setDataBasket } = globalState();

  const add = (id: number) => {
    if (!data) return;
    const itemData = data?.find((e) => e.id === id);
    const itemBasket = dataBasket?.find((e) => e.id === id);
    if (itemBasket) {
      setDataBasket(
        dataBasket.map((el) => {
          if (el.id === id) {
            return { ...el, quantity: el.quantity + 1 };
          } else {
            return el;
          }
        }),
      );
    } else if (itemData) {
      setDataBasket([...dataBasket, { id: itemData.id || 0, quantity: 1 }]);
    }
  };

  const dec = (id: number) => {
    if (!dataBasket) return;
    const itemBasket = dataBasket?.find((e) => e.id === id);
    if (itemBasket) {
      setDataBasket(
        dataBasket.map((el) => {
          if (el.id === id) {
            return { ...el, quantity: el.quantity - 1 };
          } else {
            return el;
          }
        }),
      );
    }
  };
  const countProduct = (id: number, quantity: number) => {
    if (!dataBasket) return;
    const itemBasket = dataBasket?.find((e) => e.id === id);
    if (itemBasket) {
      setDataBasket(
        dataBasket.map((el) => {
          if (el.id === id) {
            return { ...el, quantity: quantity };
          } else {
            return el;
          }
        }),
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await productsService.getAllProducts(1, 20);
        console.log("data", data);

        setData(data.items);
      } catch (e) {
        setError("Не удалось получить данные о  продуктах.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("basket");
    if (saved) setData(JSON.parse(saved));
  }, []);

  console.log("dataBasket", dataBasket);

  if (loading) {
    return <Loading />;
  }
  if (error.length) {
    return <Error message={error} />;
  }

  return (
    <div className="products-items">
      {Array.isArray(data)
        ? data.map((item, i) => (
            <ProductsItem
              dataBasket={dataBasket}
              countProduct={countProduct}
              add={add}
              dec={dec}
              item={item}
              index={i}
              key={i}
            />
          ))
        : ""}
    </div>
  );
}
