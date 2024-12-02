import {patchState, signalStore, withComputed, withMethods} from "@ngrx/signals";
import {setEntities, setEntity, withEntities} from "@ngrx/signals/entities";
import {computed, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, map} from "rxjs";
import {FavoritesService} from "../services/favorites.service";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number, count: number };
}

export type ProductEntity = Product & { isFavorite: boolean }

export const ProductsStore = signalStore(
  {providedIn: 'root'},
  withEntities<ProductEntity>(),
  withComputed(store => ({
    favoriteProducts: computed(() => store.entities().filter(product => product.isFavorite)),
    categories: computed(() => new Set(store.entities().map(product => product.category)))
  })),
  withMethods((store, http = inject(HttpClient), favService = inject(FavoritesService)) => ({
    async loadProducts() {
      const products = await lastValueFrom(
        http.get<Product[]>('https://fakestoreapi.com/products').pipe(
          map(response => response.map(product => ({
              ...product,
              isFavorite: favService.isFavorite(product.id)
            })
          ))
        )
      );
      patchState(store, setEntities(products));
    },

    updateProduct(product: ProductEntity) {
      patchState(store, setEntity(product));
    }
  }))
);
