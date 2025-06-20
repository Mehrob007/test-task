import React, { KeyboardEvent, useEffect, useState } from "react";
import type { ProductsItemType } from "@/types/products";
import Image from "next/image";
import { FormDataBasketCart } from "@/types/basket";

export default function ProductsItem({
  item,
  dataBasket,
  add,
  dec,
  countProduct,
}: {
  item: ProductsItemType;
  index?: number;
  add: (id: number) => void;
  dec: (id: number) => void;
  countProduct: (id: number, quantity: number) => void;
  dataBasket: FormDataBasketCart[];
}) {
  const [input, setInput] = useState<number>(1);

  const quantity = dataBasket?.find((e) => e.id === item.id)?.quantity;

  // useEffect(() => {
  // if(input == 0){
  //   setTimeout(() => countProduct(item.id, input), 1000)
  // }
  //   countProduct(item.id, input)
  // }, [input]);

  useEffect(() => {
    if (quantity) {
      setInput(quantity);
    }
  }, [quantity]);

  return (
    <div className="products-item">
      <Image
        src={item.image_url as string}
        width={100}
        height={100}
        alt="photo product"
      />
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <div className="products-item-buy">
        <span>цена: {item.price}₽</span>
        {quantity ? (
          <div>
            <button onClick={() => dec(item.id)}>-</button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(+e.target.value)}
              onBlur={() => countProduct(item.id, input)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  countProduct(item.id, input);
                }
              }}
            />
            <button onClick={() => add(item.id)}>+</button>
          </div>
        ) : (
          <button onClick={() => add(item.id)}>купить</button>
        )}
      </div>
    </div>
  );
}
