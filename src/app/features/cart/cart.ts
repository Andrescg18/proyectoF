import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../core/services/cart.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, EmptyStateComponent, DecimalPipe],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  cartService = inject(CartService);

  // States
  isCheckingOut = signal<boolean>(false);
  checkoutSuccess = signal<boolean>(false);
  orderNumber = signal<string>('');

  // Tax rates and shipping mockup
  shippingCost = 60000;

  updateQty(item: CartItem, increment: boolean): void {
    const newQty = increment ? item.quantity + 1 : item.quantity - 1;
    this.cartService.updateQuantity(item.product.id, newQty);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  simulateCheckout(): void {
    if (this.cartService.cartItems().length === 0) return;

    this.isCheckingOut.set(true);

    // Simulate server request delay
    setTimeout(() => {
      // Generate random order ID
      const randNum = Math.floor(100000 + Math.random() * 900000);
      this.orderNumber.set(`AM-${randNum}`);
      
      this.isCheckingOut.set(false);
      this.checkoutSuccess.set(true);
      
      // Clear cart state
      this.cartService.clearCart();
    }, 2000);
  }

  resetCheckout(): void {
    this.checkoutSuccess.set(false);
    this.orderNumber.set('');
  }
}
