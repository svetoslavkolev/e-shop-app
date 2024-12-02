import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css'
})
export class OrderConfirmationComponent {
  orderId = inject(ActivatedRoute).snapshot.paramMap.get('orderId');
}
