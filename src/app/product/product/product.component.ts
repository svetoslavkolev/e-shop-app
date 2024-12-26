import {Component, computed, inject, input} from '@angular/core';
import {ProductEntity, ProductsStore} from "../../store/products";
import {CurrencyPipe, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CartStore} from "../../store/cart";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TitleCasePipe,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  product = input.required<ProductEntity>();
  private productsStore = inject(ProductsStore);
  private cartStore = inject(CartStore);

  isAddedToCart = computed(() =>
    this.cartStore.items().some(item => item.productId === this.product().id)
  );

  addToCart() {
    this.cartStore.addToCart({
      productId: this.product().id,
      title: this.product().title,
      price: this.product().price,
      image: this.product().image,
      quantity: 1
    });
  }

  toggleFavorite() {
    this.productsStore.toggleFavorite(this.product().id);
  }

}
