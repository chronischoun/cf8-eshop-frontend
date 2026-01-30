import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service'; 
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './checkout.html'
})
export class CheckoutComponent implements OnInit {
  public cartService = inject(CartService);
  cartItems = this.cartService.cartItems;

  private backendApiUrl = 'http://localhost:3000/api/pdf'; 

  ngOnInit() {
    console.log('Current Cart Items:', this.cartItems());
  }

  downloadFile(title: string | undefined) {
    if (!title) {
      alert('File name missing. Cannot trigger download.');
      return;
    }

    const encodedFileName = encodeURIComponent(title.trim());
    const fileUrl = `${this.backendApiUrl}/download/${encodedFileName}`;
    
    console.log('Redirecting to download URL:', fileUrl);
    
    window.open(fileUrl, '_blank');
  }

  clearAll() {
    this.cartService.clearCart();
  }
}