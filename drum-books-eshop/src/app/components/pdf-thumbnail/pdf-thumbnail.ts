import { Component, Input, ChangeDetectorRef, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pdf-thumbnail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="thumbnail-wrapper">
      <img *ngIf="thumbnail" [src]="thumbnail" class="thumbnail" alt="PDF Preview" />
      <div *ngIf="!thumbnail" class="placeholder">Φόρτωση...</div>
    </div>
  `,
  styles: [`
    .thumbnail-wrapper { 
      width: 100%; 
      height: 100%; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      min-height: 180px; 
      background-color: #f0f0f0;
      border-radius: 8px;
    }
    .thumbnail { width: 100%; height: 100%; object-fit: contain; }
    .placeholder { font-size: 12px; color: #888; }
  `]
})
export class PdfThumbnailComponent {
  @Input() pdfUrl!: string;
  thumbnail: string | null = null;

  constructor(private cdr: ChangeDetectorRef) {
    // Εκτέλεση μόνο στον browser για αποφυγή του ReferenceError
    afterNextRender(() => {
      this.generateThumbnail();
    });
  }

  async generateThumbnail() {
    if (!this.pdfUrl || this.pdfUrl.includes('undefined')) {
      return;
    }

    try {
      // 1. Δυναμικό import της βιβλιοθήκης
      const pdfjsLib: any = await import('pdfjs-dist');
      
      // 2. Χρήση του unpkg CDN που είναι πιο συμβατό με την έκδοση 5.x
      // Αυτό θα λύσει το σφάλμα 404 που βλέπεις στην κονσόλα
      pdfjsLib.GlobalWorkerOptions.workerSrc = 
        `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

      const loadingTask = pdfjsLib.getDocument(this.pdfUrl);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 0.5 });
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // 3. Rendering με όλες τις απαραίτητες παραμέτρους για την έκδοση 5.x
      // Το (page as any) αφαιρεί τις κόκκινες γραμμές (Type Errors)
      await (page as any).render({ 
        canvasContext: ctx, 
        canvas: canvas, 
        viewport: viewport 
      }).promise;

      this.thumbnail = canvas.toDataURL('image/png');
      
      // Ενημέρωση του UI
      this.cdr.detectChanges();
    } catch (e) {
      console.error('PDF Thumbnail Generation Error:', e);
    }
  }
}