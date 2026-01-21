import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Book[]>(this.apiUrl);
  }
}