import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ApiService, Product } from '../../core/services/api.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ProductCardComponent, SkeletonComponent, EmptyStateComponent, DecimalPipe],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent implements OnInit {
  private apiService = inject(ApiService);

  // States
  allProducts = signal<Product[]>([]);
  categories = signal<string[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  // Filters (Signals)
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('all');
  maxPrice = signal<number>(1000);
  sortBy = signal<string>('default');

  // computed signals for calculations
  minProductPrice = computed(() => {
    const products = this.allProducts();
    if (products.length === 0) return 0;
    return Math.min(...products.map(p => p.price));
  });

  maxProductPrice = computed(() => {
    const products = this.allProducts();
    if (products.length === 0) return 1000;
    return Math.max(...products.map(p => p.price));
  });

  // Reactive filtering using computed Signal
  filteredProducts = computed(() => {
    let products = [...this.allProducts()];
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();
    const limitPrice = this.maxPrice();
    const sort = this.sortBy();

    // 1. Text Search
    if (query) {
      products = products.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    // 2. Category Filter
    if (category !== 'all') {
      products = products.filter(p => p.category === category);
    }

    // 3. Price Filter
    products = products.filter(p => p.price <= limitPrice);

    // 4. Sorting
    if (sort === 'priceAsc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'priceDesc') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      products.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return products;
  });

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    // Fetch categories
    this.apiService.getCategories().subscribe({
      next: (data) => this.categories.set(data),
      error: (err) => console.error('Error fetching categories:', err)
    });

    // Fetch all products for local reactive filtering (catalog has 50 items)
    this.apiService.getProducts(100).subscribe({
      next: (data) => {
        this.allProducts.set(data);
        // Set default max price based on actual items
        if (data.length > 0) {
          const maxVal = Math.max(...data.map(p => p.price));
          this.maxPrice.set(Math.ceil(maxVal));
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message || 'Error al cargar productos para la búsqueda.');
        this.isLoading.set(false);
      }
    });
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedCategory.set(select.value);
  }

  onPriceChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.maxPrice.set(Number(input.value));
  }

  onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortBy.set(select.value);
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedCategory.set('all');
    this.maxPrice.set(this.maxProductPrice());
    this.sortBy.set('default');
    
    // Reset search inputs in DOM
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) searchInput.value = '';
    const catSelect = document.getElementById('category-select') as HTMLSelectElement;
    if (catSelect) catSelect.value = 'all';
    const sortSelect = document.getElementById('sort-select') as HTMLSelectElement;
    if (sortSelect) sortSelect.value = 'default';
    const priceRange = document.getElementById('price-range') as HTMLInputElement;
    if (priceRange) priceRange.value = String(this.maxProductPrice());
  }
}
