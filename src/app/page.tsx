import Header from "@/components/ui/Header";
import ReviewsItems from "@/modules/reviews/ReviewsItems";
import Basket from "@/modules/basket/Basket";
import React from "react";
import ProductsItems from "@/modules/products/ProductsItems";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <ReviewsItems />
      <Basket />
      <ProductsItems />
    </div>
  );
}
