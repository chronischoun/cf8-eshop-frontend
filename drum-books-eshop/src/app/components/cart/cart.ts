import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; 
import { CartService } from '../services/cart.service'; 

@Component({
  selector: 'app-cart',
  standalone: true,           
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss'] 
})
export class CartComponent {
  public cartService = inject(CartService);
  private router = inject(Router); // Χρήση του Router για πλοήγηση

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

  clearCart() {
    if (confirm('Are you sure you want to clear the cart?')) {
      this.cartService.clearCart();
    }
  }

  // Μέθοδος για σίγουρη επιστροφή στην αρχική
  goBack() {
    this.router.navigate(['/']); // Πλοήγηση στο path ''
  }
}