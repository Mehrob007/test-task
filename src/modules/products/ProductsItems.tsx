"use client";
import React, { useEffect, useState } from "react";
import ProductsItem from "./ProductsItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { productsService } from "@/api/products";
import type { ProductsItemType } from "@/types/products";
import { useGlobalStore } from "@/stor/globalState";

export default function ProductsItems() {
  const [data, setData] = useState<ProductsItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { dataBasket, setDataBasket } = useGlobalStore();
  const [page, setPage] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const [hasMore] = useState(true);

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
      setDataBasket([
        ...dataBasket,
        {
          title: itemData.title,
          price: itemData.price,
          id: itemData.id || 0,
          quantity: 1,
        },
      ]);
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
      setTimeout(() => setFetching(false), 1000);
      setPage((page) => page && page + 1);
      try {
        setLoading(true);
        const dataRes = await productsService.getAllProducts(page, 20);
        console.log("data", dataRes);

        setData((data) => [...data, ...dataRes.items]);
      } catch (e) {
        setError("Не удалось получить данные о  продуктах.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (fetching) {
      fetchData();
    }
  }, [fetching]);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 100) {
        setFetching(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

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
      {loading && <Loading />}
    </div>
  );
}
