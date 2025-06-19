import apiClient from "./apiClient";

export const basketService = {
  postOrder: async () => {
    try {
      const res = await apiClient("order");
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
};
