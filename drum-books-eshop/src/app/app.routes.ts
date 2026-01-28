import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { BookListComponent } from './components/book-list/book-list'; 
import { CartComponent } from './components/cart/cart'; 

export const routes: Routes = [
  { 
    path: '', 
    component: BookListComponent,
    //runGuardsAndResolvers: 'always' 
  }, 
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent }]