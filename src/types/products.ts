export interface ProductsItemType {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
}

export interface Products {
  page: number;
  amount: number;
  total: number;
  items: ProductsItemType[];
}
