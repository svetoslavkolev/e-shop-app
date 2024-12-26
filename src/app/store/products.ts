import {patchState, signalStore, withComputed, withHooks, withMethods} from "@ngrx/signals";
import {setEntities, updateEntity, withEntities} from "@ngrx/signals/entities";
import {computed, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";
import {FavoritesService} from "../services/favorites.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

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

  withHooks({
    onInit(store, http = inject(HttpClient), favService = inject(FavoritesService)) {
      http.get<Product[]>('https://fakestoreapi.com/products').pipe(
        takeUntilDestroyed(),
        map(response => response.map(product => ({
            ...product,
            isFavorite: favService.isFavorite(product.id)
          })
        )),
        tap(products => patchState(store, setEntities(products)))
      )
      .subscribe();
    }
  }),

  withMethods((store, favService = inject(FavoritesService)) => ({
    toggleFavorite(productId: number) {
      patchState(store, updateEntity({
        id: productId,
        changes: {
          isFavorite: !store.entityMap()[productId].isFavorite
        }
      }));
      favService.toggleFavorite(productId);
    }
  }))
);
