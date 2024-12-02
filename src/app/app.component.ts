import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {NgOptimizedImage} from "@angular/common";
import {ProductsStore} from "./store/products";
import {CartStore} from "./store/cart";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, NavBarComponent, NgOptimizedImage, RouterLink]
})
export class AppComponent implements OnInit {
  private productsStore = inject(ProductsStore);
  itemsInCart = inject(CartStore).itemsInCart;

  ngOnInit() {
    this.productsStore.loadProducts().then(r => console.log('Products loaded'));
  }
}
