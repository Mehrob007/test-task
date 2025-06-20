import apiClient from "./apiClient";

export const productsService = {
  getAllProducts: async (page?: number, page_size?: number) => {
    try {
      const params = {
        page: page,
        page_size: page_size,
      };
      const queryParams = new URLSearchParams(params.toString());
      const res = await apiClient(`products?${queryParams.toString()}`);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
};
