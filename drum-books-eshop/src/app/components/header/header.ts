import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CartService } from '../services/cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule], 
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  private cartService = inject(CartService);

  public totalCount$ = this.cartService.cartItems$.pipe(
    map(items => items.length)
  );

  onLogoClick(event: Event) {
    event.preventDefault(); 
    if (this.router.url === '/') {
      window.location.reload();
    } else {
      this.router.navigate(['/']);
    }
  }
}