import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsStore} from "../../store/products";
import {CurrencyPipe, NgClass, UpperCasePipe} from "@angular/common";
import {FavoritesService} from "../../services/favorites.service";
import {CartStore} from "../../store/cart";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    UpperCasePipe,
    NgClass,
    CurrencyPipe
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  private productId = inject(ActivatedRoute).snapshot.paramMap.get("productId") || '';
  private favoritesService = inject(FavoritesService);
  private productsStore = inject(ProductsStore);
  private cartStore = inject(CartStore);

  product = computed(() =>
    this.productsStore.entityMap()[parseInt(this.productId)]
  );

  quantity = signal(1);
  cartQuantity = computed(() =>
    this.cartStore.items().find(item => item.productId === this.product().id)?.quantity
  );

  totalPrice = computed(() =>
    this.product().price * (this.cartQuantity() || this.quantity())
  );

  isAddedToCart = computed(() =>
    this.cartStore.items().some(item => item.productId === this.product().id)
  );

  numberOfStars = computed(() =>
    Array.from({
        length: Math.round(this.product().rating.rate)
      },
      (_, i) => i + 1)
  );

  toggleFavorite() {
    this.productsStore.updateProduct({...this.product(), isFavorite: !this.product().isFavorite});
    this.favoritesService.toggleFavorite(this.product().id);
  }

  incrementQuantity() {
    if (this.quantity() < 20) {
      this.quantity.update(qty => qty + 1);
    }
  }

  decrementQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update(qty => qty - 1);
    }
  }

  addToCart() {
    this.cartStore.addToCart({
      productId: this.product().id,
      title: this.product().title,
      price: this.product().price,
      image: this.product().image,
      quantity: this.quantity()
    });
  }
}
