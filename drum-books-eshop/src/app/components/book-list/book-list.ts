import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService, Book } from '../services/book.service';
import { PdfThumbnailComponent } from '../pdf-thumbnail/pdf-thumbnail'; 

@Component({
  selector: 'app-book-list',
  standalone: true,

  imports: [CommonModule, PdfThumbnailComponent], 
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss'
})
export class BookListComponent implements OnInit {
  private bookService = inject(BookService); 
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
}