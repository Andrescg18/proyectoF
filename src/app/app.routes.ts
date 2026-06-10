import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { SearchComponent } from './features/search/search';
import { FavoritesComponent } from './features/favorites/favorites';
import { DetailsComponent } from './features/details/details';
import { CartComponent } from './features/cart/cart';
import { NotFoundComponent } from './features/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];
