import {CartItem} from "../store/cart";
import {CheckoutInfo} from "./checkout-info";

export const LOCAL_STORAGE_ORDERS_KEY = 'e-shop-orders';

export type OrderInfo = {
  id: string;
  date: Date;
  items: CartItem[];
  cartTotal: number;
  shipping: number;
  orderTotal: number;
  checkoutInfo: CheckoutInfo;
}
