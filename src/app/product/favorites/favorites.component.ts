import {Component, inject} from '@angular/core';
import {ProductComponent} from "../product/product.component";
import {ProductsStore} from "../../store/products";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    ProductComponent
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  favProducts = inject(ProductsStore).favoriteProducts;
}
