import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private readonly _key = 'e-shop-favorites';

  toggleFavorite(productId: number) {
    const favorites: number[] = JSON.parse(localStorage.getItem(this._key) || JSON.stringify([]));
    if (favorites.includes(productId)) {
      const stillFavorites = favorites.filter(favorite => favorite !== productId);
      localStorage.setItem(this._key, JSON.stringify(stillFavorites));
    } else {
      favorites.push(productId);
      localStorage.setItem(this._key, JSON.stringify(favorites));
    }
  }

  isFavorite(productId: number): boolean {
    let favorites = JSON.parse(localStorage.getItem(this._key) || JSON.stringify([])) as number[];
    return favorites.includes(productId);
  }
}
