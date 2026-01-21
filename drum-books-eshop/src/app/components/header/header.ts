import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  cartCount: number = 0;

  onLogoClick(event: Event) {
    event.preventDefault(); // Σταματάει οποιαδήποτε άλλη ενέργεια του browser
    
    if (this.router.url === '/') {
      window.location.reload();
    } else {
      this.router.navigate(['/']);
    }
  }
}