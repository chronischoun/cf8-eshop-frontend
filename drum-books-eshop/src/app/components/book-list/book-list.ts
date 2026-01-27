import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService, Book } from '../services/book.service';
import { PdfThumbnailComponent } from '../pdf-thumbnail/pdf-thumbnail'; 
import { CartService } from '../services/cart.service'; 

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, PdfThumbnailComponent], 
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss'
})
export class BookListComponent implements OnInit {
  private bookService = inject(BookService); 
  private cartService = inject(CartService); 
  
  books: Book[] = []; 

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        console.log('Books received:', this.books);
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }

 
  addToCart(book: Book): void {
    console.log('🚀 Προσθήκη στο καλάθι από τη λίστα:', book);
    this.cartService.addToCart(book);
  }
}