import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, Product } from '../../core/services/api.service';
import { CartService } from '../../core/services/cart.service';
import { FavoriteService } from '../../core/services/favorite.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, SkeletonComponent, DecimalPipe],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class DetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  
  cartService = inject(CartService);
  favoriteService = inject(FavoriteService);

  // States
  product = signal<Product | null>(null);
  relatedProducts = signal<Product[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');
  
  // Selection Quantity
  quantity = signal<number>(1);

  ngOnInit(): void {
    // Watch parameters changes dynamically
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadProductDetails(id);
      } else {
        this.errorMessage.set('Identificador de producto no válido.');
        this.isLoading.set(false);
      }
    });
  }

  loadProductDetails(id: number): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.quantity.set(1);

    this.apiService.getProductById(id).subscribe({
      next: (data) => {
        if (data) {
          this.product.set(data);
          this.loadRelatedProducts(data.category, data.id);
        } else {
          this.errorMessage.set('El producto solicitado no existe.');
          this.isLoading.set(false);
        }
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Error al obtener los detalles del producto.');
        this.isLoading.set(false);
      }
    });
  }

  loadRelatedProducts(category: string, currentId: number): void {
    this.apiService.getProductsByCategory(category).subscribe({
      next: (data) => {
        // Filter out current product and take top 4 related
        const filtered = data
          .filter(p => p.id !== currentId)
          .slice(0, 4);
        this.relatedProducts.set(filtered);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error related products:', err);
        this.isLoading.set(false);
      }
    });
  }

  incrementQuantity(): void {
    this.quantity.update(q => q + 1);
  }

  decrementQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  toggleFavorite(): void {
    const currentProduct = this.product();
    if (currentProduct) {
      this.favoriteService.toggleFavorite(currentProduct);
    }
  }

  isFavorite(): boolean {
    const currentProduct = this.product();
    return currentProduct ? this.favoriteService.isFavorite(currentProduct.id) : false;
  }

  addToCart(): void {
    const currentProduct = this.product();
    if (currentProduct) {
      this.cartService.addToCart(currentProduct, this.quantity());
      // Reset quantity to 1 after adding to cart
      this.quantity.set(1);
    }
  }
}
