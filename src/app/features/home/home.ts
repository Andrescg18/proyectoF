import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService, Product } from '../../core/services/api.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, SkeletonComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  private apiService = inject(ApiService);

  products = signal<Product[]>([]);
  categories = signal<string[]>([]);
  selectedCategory = signal<string>('all');
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    
    const category = this.selectedCategory();
    const fetchObs = category === 'all' 
      ? this.apiService.getProducts() 
      : this.apiService.getProductsByCategory(category);

    fetchObs.subscribe({
      next: (data) => {
        this.products.set(data);
        this.isLoading.set(false);
        console.log("⚡ [Día 2 Hito] Conexión Core - Fetching de datos de la API exitoso! Datos recibidos:", data);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Error al cargar los productos.');
        this.isLoading.set(false);
        console.error("❌ [Día 2 Hito] Conexión Core - Error al obtener datos:", err);
      }
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.loadProducts();
  }
}
