import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { BookListComponent } from './components/book-list/book-list'; 
import { CartComponent } from './components/cart/cart'; 
import { CheckoutComponent } from './components/checkout/checkout'; 

export const routes: Routes = [
  { 
    path: '', 
    component: BookListComponent,
  }, 
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent } 
];