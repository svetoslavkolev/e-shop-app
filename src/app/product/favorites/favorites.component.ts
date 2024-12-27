import {Component, inject} from '@angular/core';
import {ProductComponent} from "../product/product.component";
import {ProductsStore} from "../../store/products";
import {LoadingSpinnerComponent} from "../../loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    ProductComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  productsStore = inject(ProductsStore);
}
