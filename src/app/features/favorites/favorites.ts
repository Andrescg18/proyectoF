import { Component, inject } from '@angular/core';
import { FavoriteService } from '../../core/services/favorite.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ProductCardComponent, EmptyStateComponent],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css']
})
export class FavoritesComponent {
  favoriteService = inject(FavoriteService);
}
