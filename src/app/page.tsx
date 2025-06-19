import Header from "@/components/ui/Header";
import ReviewsItems from "@/modules/reviews/ReviewsItems";
import Basket from "@/modules/basket/Basket";
import React from "react";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <ReviewsItems />
      <Basket />
    </div>
  );
}
