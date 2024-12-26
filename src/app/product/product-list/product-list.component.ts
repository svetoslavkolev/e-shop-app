import {Component, inject, OnDestroy, signal} from '@angular/core';
import {ProductComponent} from "../product/product.component";
import {
  PriceFilter,
  ProductsService,
  SortAttribute,
  SortOrder
} from "../../services/products.service";
import {ProductsStore} from "../../store/products";
import {FormsModule} from "@angular/forms";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductComponent,
    FormsModule,
    TitleCasePipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnDestroy {
  private productsService = inject(ProductsService);
  products = this.productsService.productsResult;
  categories = inject(ProductsStore).categories;

  sortAttribute = signal<SortAttribute>('None');
  sortOrder = signal<SortOrder>('Asc');

  onTyping(event: KeyboardEvent) {
    this.productsService.updateSearchTerm((event.target as HTMLInputElement).value);
  }

  onCategorySelected(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    if (selectedCategory === 'all') {
      this.productsService.updateCategoryFilter('');
    } else {
      this.productsService.updateCategoryFilter(selectedCategory);
    }
  }

  onPriceFilterSelected(event: Event) {
    const selectedPriceFilter = (event.target as HTMLSelectElement).value as PriceFilter;
    this.productsService.updatePriceFilter(selectedPriceFilter);
  }

  onSortingChanged() {
    this.productsService.updateSorting({attribute: this.sortAttribute(), order: this.sortOrder()});
  }

  ngOnDestroy() {
    this.productsService.resetFilteringAndSorting();
  }
}
