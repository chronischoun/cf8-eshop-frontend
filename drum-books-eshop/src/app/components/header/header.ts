import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CartService } from '../services/cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  public cartService = inject(CartService);
  private router = inject(Router);

  
  public totalCount$ = this.cartService.cartItems$.pipe(
    map(items => items?.length || 0)
  );

  onLogoClick() {
    this.router.navigate(['/'], { onSameUrlNavigation: 'reload' });
  }
}