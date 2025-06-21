import React from "react";
import { Reviews } from "@/types/reviews";
import ReviewHtmlTag from "./ReviewHtmlTag";

export default function ReviewsItem({
  item,
  index,
}: {
  item: Reviews;
  index: number;
}) {
  return (
    <div className="reviews-item">
      <h1>Отзыв {index + 1}</h1>
      <ReviewHtmlTag htmlString={item.text} />
    </div>
  );
}
