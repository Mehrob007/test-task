import React from "react";
import { Reviews } from "@/types/reviews";

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
      <div dangerouslySetInnerHTML={{ __html: item.text }} />
    </div>  
  );
}
