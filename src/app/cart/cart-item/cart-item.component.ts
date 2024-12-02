import {Component, computed, input, output} from '@angular/core';
import {CartItem} from "../../store/cart";
import {RouterLink} from "@angular/router";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  cartItem = input.required<CartItem>();
  totalPrice = computed(() => this.cartItem().price * this.cartItem().quantity);
  quantityChanged = output<{ productId: number; quantity: number }>();
  itemRemoved = output<number>();

  incrementQuantity() {
    if (this.cartItem().quantity < 20) {
      this.quantityChanged.emit({
        productId: this.cartItem().productId,
        quantity: this.cartItem().quantity + 1
      });
    }
  }

  decrementQuantity() {
    if (this.cartItem().quantity > 1) {
      this.quantityChanged.emit({
        productId: this.cartItem().productId,
        quantity: this.cartItem().quantity - 1
      });
    }
  }
}
