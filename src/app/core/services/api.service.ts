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

  // Simple product mapping – returns API data with price in COP
  private mapProduct(p: Product): Product {
    return { ...p, price: Math.round(p.price * 4000) };
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
   * Fetches all categories directly from the API
   */
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('/products/categories');
  }

  /**
   * Fetches products in a specific category
   */
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/products/category/${encodeURIComponent(category)}`).pipe(
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
