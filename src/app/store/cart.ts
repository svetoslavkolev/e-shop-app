import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {computed, inject} from "@angular/core";
import {CartService} from "../services/cart.service";

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
  withState<Cart>((cartService = inject(CartService)) => cartService.getCart()),
  withComputed(state => ({
    itemsInCart: computed(() => state.items().length),
    cartTotal: computed(() =>
      state.items().reduce((acc, item) => acc + item.price * item.quantity, 0)
    )
  })),
  withMethods((state, cartService = inject(CartService)) => ({
    addToCart(cartItem: CartItem) {
      patchState(state, {items: [...state.items(), cartItem]});
      cartService.updateCart({items: state.items()});
    },

    updateItemQuantity(productId: number, quantity: number) {
      const items = state.items().map(item =>
        item.productId === productId ? {...item, quantity} : item
      );
      patchState(state, {items: [...items]});
      cartService.updateCart({items: state.items()});
    },

    removeFromCart(productId: number) {
      patchState(state, {items: [...state.items().filter(item => item.productId !== productId)]});
      cartService.updateCart({items: state.items()});
    },

    clearCart() {
      patchState(state, {items: []});
      cartService.removeCart();
    }
  }))
);
