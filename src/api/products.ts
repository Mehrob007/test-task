import apiClient from "./apiClient";

export const productsService = {
  getAllProducts: async (page?: number, page_size?: number) => {
    try {
      const params: Record<string, string> = {};
      if (page !== undefined) params.page = page.toString();
      if (page_size !== undefined) params.page_size = page_size.toString();

      const queryParams = new URLSearchParams(params);

      const res = await apiClient(`products?${queryParams.toString()}`);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  },
};
