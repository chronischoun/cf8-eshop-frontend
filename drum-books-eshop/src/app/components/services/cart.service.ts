import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(book: any) {
    const currentItems = this.cartItemsSubject.value;
    this.cartItemsSubject.next([...currentItems, book]);
  }
}