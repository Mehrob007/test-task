"use client";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Basket } from "@/types/basket";
import React, { KeyboardEvent, useEffect, useState } from "react";

export default function BasketItem({
  item,
  remove,
  edit,
}: {
  item: Basket;
  index?: number;
  remove: (id: number) => void;
  edit: (id: number, value: number) => void;
}) {
  const [input, setInput] = useState<number>(0);
  const isMobile = useMediaQuery("(max-width: 870px)");

  useEffect(() => {
    setInput(item.quantity);
  }, [item.quantity]);
  return (
    <>
      {isMobile ? (
        <div className="basket-item">
          <div>
            <h1>{item.title}</h1>
            <div>
              <div>
                <span>x</span>{" "}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(+e.target.value)}
                  onBlur={() => edit(item.id, input)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      edit(item.id, input);
                    }
                  }}
                />
              </div>
              <p>{item.price * item.quantity}₽</p>
            </div>
          </div>
          <button onClick={() => remove(item.id)}>x</button>
        </div>
      ) : (
        <div className="basket-item">
          <div>
            <h1>{item.title}</h1>
            <div>
              <div>
                <span>x</span>{" "}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(+e.target.value)}
                  onBlur={() => edit(item.id, input)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      edit(item.id, input);
                    }
                  }}
                />
              </div>
              <p>{item.price * item.quantity}₽</p>
              <button onClick={() => remove(item.id)}>x</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
