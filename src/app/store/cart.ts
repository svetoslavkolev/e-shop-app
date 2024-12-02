import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {computed} from "@angular/core";

const _key = 'e-shop-cart';

export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  productId: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export const CartStore = signalStore(
  {providedIn: 'root'},
  withState<Cart>(JSON.parse(localStorage.getItem(_key) || JSON.stringify({items: []}))),
  withComputed(state => ({
    itemsInCart: computed(() => state.items().length),
    cartTotal: computed(() =>
      state.items().reduce((acc, item) => acc + item.price * item.quantity, 0)
    )
  })),
  withMethods(state => ({
    addToCart(cartItem: CartItem) {
      patchState(state, {items: [...state.items(), cartItem]});
      localStorage.setItem(_key, JSON.stringify({items: state.items()}));
    },

    updateItemQuantity(productId: number, quantity: number) {
      const items = state.items().map(item =>
        item.productId === productId ? {...item, quantity} : item
      );
      patchState(state, {items: [...items]});
      localStorage.setItem(_key, JSON.stringify({items: state.items()}));
    },

    removeFromCart(productId: number) {
      patchState(state, {items: [...state.items().filter(item => item.productId !== productId)]});
      localStorage.setItem(_key, JSON.stringify({items: state.items()}));
    },

    clearCart() {
      patchState(state, {items: []});
      localStorage.removeItem(_key);
    }
  }))
);
