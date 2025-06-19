"use client";
import { reviewsService } from "@/api/reviews";
import React, { useEffect, useState } from "react";
import type { Reviews } from "@/types/reviews";
import ReviewsItem from "./ReviewsItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

export default function ReviewsItems() {
  const [data, setData] = useState<Reviews[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await reviewsService.getAllReviews();
        setData(data);
      } catch (e) {
        setError("Не удалось получить данные отзывов.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error.length) {
    return <Error message={error} />;
  }

  return (
    <div className="reviews-items">
      {Array.isArray(data)
        ? data.map((item, i) => <ReviewsItem item={item} index={i} key={i} />)
        : ""}
    </div>
  );
}
