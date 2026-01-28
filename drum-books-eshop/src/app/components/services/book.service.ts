import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  imageUrl?: string;
  pdfUuid?: string;
  filename?: string;
  pdfUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/products';

  getBooks(): Observable<Book[]> {
    // Δημιουργούμε headers που λένε στον browser και στον server 
    // να μην χρησιμοποιήσουν αποθηκευμένα (cached) δεδομένα.
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    return this.http.get<Book[]>(this.apiUrl, { headers });
  }
}