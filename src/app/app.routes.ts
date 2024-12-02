import {Routes} from '@angular/router';
import {ProductListComponent} from "./product/product-list/product-list.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./product/favorites/favorites.component').then(m => m.FavoritesComponent)
  },
  {
    path: 'products/:productId',
    loadComponent: () =>
      import('./product/product-details/product-details.component').then(m => m.ProductDetailsComponent)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'cart/checkout',
    loadComponent: () =>
      import('./cart/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'cart/order-summary',
    loadComponent: () =>
      import('./cart/order-summary/order-summary.component').then(m => m.OrderSummaryComponent)
  },
  {
    path: 'cart/order-confirmation/:orderId',
    loadComponent: () =>
      import('./cart/order-confirmation/order-confirmation.component').then(m => m.OrderConfirmationComponent)
  },
  {
    path: 'order-history',
    loadComponent: () =>
      import('./order-history/order-history.component').then(m => m.OrderHistoryComponent)
  }
];
