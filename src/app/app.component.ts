import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {NgOptimizedImage} from "@angular/common";
import {CartStore} from "./store/cart";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, NavBarComponent, NgOptimizedImage, RouterLink]
})
export class AppComponent {
  itemsInCart = inject(CartStore).itemsInCart;
}
