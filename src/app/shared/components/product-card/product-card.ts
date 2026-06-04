import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Product } from '../../../core/services/api.service';
import { CartService } from '../../../core/services/cart.service';
import { FavoriteService } from '../../../core/services/favorite.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  cartService = inject(CartService);
  favoriteService = inject(FavoriteService);

  toggleFavorite(event: Event): void {
    event.stopPropagation(); // Avoid triggering parent navigation
    this.favoriteService.toggleFavorite(this.product);
  }

  isFavorite(): boolean {
    return this.favoriteService.isFavorite(this.product.id);
  }

  addToCart(event: Event): void {
    event.stopPropagation(); // Avoid triggering parent navigation
    this.cartService.addToCart(this.product);
  }
}
