import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { BookListComponent } from './components/book-list/book-list'; 

export const routes: Routes = [
  { 
    path: '', 
    component: BookListComponent,
    runGuardsAndResolvers: 'always' 
  }, 
  { path: 'login', component: LoginComponent }
];