import { FormDataBasket } from "@/types/basket";
import apiClient from "../utils/apiClient";

export const basketService = {
  postOrder: async (data: FormDataBasket) => {
    try {
      const res = await apiClient.post("order", data);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
};
