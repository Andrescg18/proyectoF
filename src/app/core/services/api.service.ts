import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  // Simple product mapping – no brand-specific overrides
  private mapProduct(p: Product): Product {
    // Directly return the product with price adjusted to local currency
    return { ...p, price: Math.round(p.price * 4000) };
  }

  private mapCategoryToFakeStore(category: string): string {
    switch (category) {
      case 'Protecciones': return 'electronics';
      case 'Accesorios': return 'jewelery';
      case 'Ropa': return "men's clothing";
      case 'Equipamiento': return "women's clothing";
      default: return category;
    }
  }

  /**
   * Fetches initial list of products (default limit is 20)
   */
  getProducts(limit: number = 20): Observable<Product[]> {
    return this.http.get<Product[]>(`/products?limit=${limit}`).pipe(
      map(products => products.map(p => this.mapProduct(p)))
    );
  }

  /**
   * Fetches a single product details by ID
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`/products/${id}`).pipe(
      map(p => this.mapProduct(p))
    );
  }

  /**
   * Fetches all categories mapped to Alpinestars categories
   */
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('/products/categories').pipe(
      map(() => ['Accesorios', 'Ropa', 'Protecciones', 'Equipamiento'])
    );
  }

  /**
   * Fetches products in a specific category
   */
  getProductsByCategory(category: string): Observable<Product[]> {
    const fakeCat = this.mapCategoryToFakeStore(category);
    return this.http.get<Product[]>(`/products/category/${encodeURIComponent(fakeCat)}`).pipe(
      map(products => products.map(p => this.mapProduct(p)))
    );
  }

  /**
   * Searches products by matching title or description locally
   */
  searchProducts(query: string): Observable<Product[]> {
    return this.getProducts(100).pipe(
      map(products => {
        if (!query || query.trim() === '') {
          return products;
        }
        const term = query.toLowerCase().trim();
        return products.filter(p => 
          p.title.toLowerCase().includes(term) || 
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
        );
      })
    );
  }
}
