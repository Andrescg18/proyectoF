import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  // Signal containing the favorited products array
  private favoritesSignal = signal<Product[]>([]);

  // Public read-only signal
  readonly favorites = this.favoritesSignal.asReadonly();
  
  readonly totalFavorites = computed(() => this.favoritesSignal().length);

  constructor() {
    // Load initial favorites from localStorage
    const savedFavorites = localStorage.getItem('aura_favorites');
    if (savedFavorites) {
      try {
        this.favoritesSignal.set(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Error loading favorites from localStorage', e);
      }
    }

    // Effect to automatically save favorites state whenever it changes
    effect(() => {
      localStorage.setItem('aura_favorites', JSON.stringify(this.favoritesSignal()));
    });
  }

  /**
   * Toggles the favorite status of a product
   */
  toggleFavorite(product: Product): void {
    this.favoritesSignal.update(items => {
      const exists = items.some(item => item.id === product.id);
      if (exists) {
        // Remove it
        return items.filter(item => item.id !== product.id);
      } else {
        // Add it
        return [...items, product];
      }
    });
  }

  /**
   * Helper to check if a product is favorited
   */
  isFavorite(productId: number): boolean {
    return this.favoritesSignal().some(item => item.id === productId);
  }
}
