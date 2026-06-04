import { Component, inject, signal, effect } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { FavoriteService } from '../../../core/services/favorite.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  cartService = inject(CartService);
  favoriteService = inject(FavoriteService);

  isDarkMode = signal<boolean>(false);
  isMobileMenuOpen = signal<boolean>(false);

  constructor() {
    // Load default theme
    const savedTheme = localStorage.getItem('aura_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode.set(savedTheme === 'dark' || (!savedTheme && prefersDark));

    // Effect to toggle the class on the body
    effect(() => {
      if (this.isDarkMode()) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('aura_theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('aura_theme', 'light');
      }
    });
  }

  toggleTheme() {
    this.isDarkMode.update(dark => !dark);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(open => !open);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
