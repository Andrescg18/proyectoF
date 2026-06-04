import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from './api.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signal containing the cart items array
  private itemsSignal = signal<CartItem[]>([]);

  // Public read-only signals
  readonly cartItems = this.itemsSignal.asReadonly();
  
  readonly totalItems = computed(() => {
    return this.itemsSignal().reduce((acc, item) => acc + item.quantity, 0);
  });

  readonly totalPrice = computed(() => {
    return this.itemsSignal().reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  });

  constructor() {
    // Load initial cart state from localStorage
    const savedCart = localStorage.getItem('aura_cart');
    if (savedCart) {
      try {
        this.itemsSignal.set(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error loading cart from localStorage', e);
      }
    }

    // Effect to automatically save cart state whenever it changes
    effect(() => {
      localStorage.setItem('aura_cart', JSON.stringify(this.itemsSignal()));
    });
  }

  /**
   * Adds a product to the cart, increments quantity if already exists
   */
  addToCart(product: Product, quantity: number = 1): void {
    this.itemsSignal.update(items => {
      const existingItemIndex = items.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex > -1) {
        // Increment quantity of existing item
        const updatedItems = [...items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new item
        return [...items, { product, quantity }];
      }
    });
  }

  /**
   * Removes a product from the cart by its ID
   */
  removeFromCart(productId: number): void {
    this.itemsSignal.update(items => items.filter(item => item.product.id !== productId));
  }

  /**
   * Updates the quantity of a product in the cart
   */
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.itemsSignal.update(items => 
      items.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  /**
   * Clears all items in the cart
   */
  clearCart(): void {
    this.itemsSignal.set([]);
  }
}
