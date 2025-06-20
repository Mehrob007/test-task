export interface Basket {
  title: string;
  price: number;
  quantity: number;
}

export interface FormDataBasketCart {
  id: number;
  quantity: number;
}
export interface FormDataBasket {
  phone?: string;
  cart?: FormDataBasketCart[];
}
