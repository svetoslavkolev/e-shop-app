import {computed, inject, Injectable, signal} from '@angular/core';
import {ProductEntity, ProductsStore} from "../store/products";

export type SortAttribute = 'Category' | 'Price' | 'None';
export type SortOrder = 'Asc' | 'Desc';

export type Sorting = {
  attribute: SortAttribute,
  order: SortOrder
}

export type PriceFilter = 'LessThan50' | 'Between50And100' | 'GreaterThan100' | 'None';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productEntities = inject(ProductsStore).entities;

  private searchTerm = signal('');
  private categoryFilter = signal('');
  private priceFilter = signal<PriceFilter>('None');
  private sorting = signal<Sorting>({attribute: 'None', order: 'Asc'});

  productsResult = computed(() => {
    let result = this.bySearchTerm(this.productEntities());
    result = this.byCategory(result);
    result = this.byPrice(result);
    return this.sort(result);
  });

  private bySearchTerm(products: ProductEntity[]): ProductEntity[] {
    return products.filter(product =>
      product.title.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
  }

  private byCategory(products: ProductEntity[]): ProductEntity[] {
    return this.categoryFilter() ?
      products.filter(product => product.category === this.categoryFilter()) :
      products;
  }

  private byPrice(products: ProductEntity[]): ProductEntity[] {
    switch (this.priceFilter()) {
      case 'LessThan50':
        return products.filter(product => product.price < 50);
      case 'Between50And100':
        return products.filter(product => product.price >= 50 && product.price <= 100);
      case 'GreaterThan100':
        return products.filter(product => product.price > 100);
      default:
        return products;
    }
  }

  private sort(products: ProductEntity[]): ProductEntity[] {
    switch (this.sorting().attribute) {
      case 'Price':
        return products.sort((a, b) =>
          this.sorting().order === 'Asc' ?
            a.price - b.price :
            b.price - a.price
        );
      case 'Category':
        return products.sort((a, b) =>
          this.sorting().order === 'Asc' ?
            a.category.localeCompare(b.category) :
            b.category.localeCompare(a.category)
        );
      default:
        return products;
    }
  }

  updateSearchTerm(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
  }

  updateCategoryFilter(category: string): void {
    this.categoryFilter.set(category);
  }

  updatePriceFilter(priceFilter: PriceFilter): void {
    this.priceFilter.set(priceFilter);
  }

  updateSorting(sorting: Sorting): void {
    this.sorting.set(sorting);
  }

}
