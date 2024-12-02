import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    // provideStore(),
    // provideState(cartFeature),
    // provideState({name: 'products', reducer: productsReducer}),
    // provideEffects({loadProductsEffect}),
    // provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
