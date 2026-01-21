import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/auth/login'; 

  login(credentials: any): Observable<any> {
    
    return this.http.post(this.apiUrl, credentials);
  }


isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}


logout() {
  localStorage.removeItem('token');
}}