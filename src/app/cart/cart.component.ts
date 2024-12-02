import {Component, inject} from '@angular/core';
import {CartStore} from "../store/cart";
import {RouterLink} from "@angular/router";
import {CartItemComponent} from "./cart-item/cart-item.component";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterLink,
    CartItemComponent,
    CurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private cartStore = inject(CartStore);
  cartItems = this.cartStore.items;
  cartTotal = this.cartStore.cartTotal;

  onQuantityChanged(event: { productId: number; quantity: number }) {
    this.cartStore.updateItemQuantity(event.productId, event.quantity);
  }

  onItemRemoved(productId: number) {
    this.cartStore.removeFromCart(productId);
  }

}
