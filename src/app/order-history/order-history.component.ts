import {Component} from '@angular/core';
import {LOCAL_STORAGE_ORDERS_KEY, OrderInfo} from "../cart/order-info";
import {CurrencyPipe, DatePipe, NgTemplateOutlet} from "@angular/common";

type Order = OrderInfo & { showDetails: boolean };

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    NgTemplateOutlet
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  private orders = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY) || JSON.stringify([])
  ) as OrderInfo[];

  sortedOrders: Order[] = this.orders.map(order => ({...order, showDetails: false}))
  .sort((date1, date2) =>
    new Date(date2.date).getTime() - new Date(date1.date).getTime()
  );

}
