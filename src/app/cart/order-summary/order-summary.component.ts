import {Component, computed, inject} from '@angular/core';
import {CartStore} from "../../store/cart";
import {CurrencyPipe} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {CheckoutInfo, LOCAL_STORAGE_CHECKOUT_KEY} from "../checkout-info";
import {v4 as uuidv4} from 'uuid';
import {LOCAL_STORAGE_ORDERS_KEY, OrderInfo} from "../order-info";

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
  private cartStore = inject(CartStore);
  cartItems = this.cartStore.items;
  cartTotal = this.cartStore.cartTotal;

  shipping = 7.99;
  orderTotal = computed(() => this.cartTotal() + this.shipping);
  checkoutInfo = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_CHECKOUT_KEY) || JSON.stringify({})
  ) as CheckoutInfo;

  private router = inject(Router);

  confirmOrder() {
    const orderInfo: OrderInfo = {
      id: uuidv4(),
      date: new Date(),
      items: this.cartItems(),
      cartTotal: this.cartTotal(),
      shipping: this.shipping,
      orderTotal: this.orderTotal(),
      checkoutInfo: this.checkoutInfo
    };

    const orders = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY) || JSON.stringify([])
    ) as OrderInfo[];
    orders.push(orderInfo);
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));

    this.cartStore.clearCart();
    this.router.navigate(['/cart/order-confirmation', orderInfo.id]).then();
  }
}
