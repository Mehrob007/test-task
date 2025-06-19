import apiClient from "./apiClient";

export const reviewsService = {
  getAllReviews: async () => {
    try {
      const res = await apiClient("reviews");
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
};
