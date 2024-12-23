import {Injectable} from '@angular/core';
import {Cart} from "../store/cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _key = 'e-shop-cart';

  getCart(): Cart {
    return JSON.parse(localStorage.getItem(this._key) || JSON.stringify({items: []}));
  }

  updateCart(cart: Cart) {
    localStorage.setItem(this._key, JSON.stringify(cart));
  }

  removeCart() {
    localStorage.removeItem(this._key);
  }

}
