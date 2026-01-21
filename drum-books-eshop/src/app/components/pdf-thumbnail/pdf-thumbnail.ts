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
    .thumbnail-wrapper { width: 100%; height: 250px; display: flex; align-items: center; justify-content: center; background: #f0f0f0; border-radius: 8px; }
    .thumbnail { width: 100%; height: 100%; object-fit: contain; }
    .placeholder { color: #888; }
  `]
})
export class PdfThumbnailComponent {
  @Input() pdfUrl!: string;
  thumbnail: string | null = null;

  constructor(private cdr: ChangeDetectorRef) {
    afterNextRender(() => {
      this.generateThumbnail();
    });
  }

  async generateThumbnail() {
    if (!this.pdfUrl || this.pdfUrl.includes('undefined')) return;

    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

      const loadingTask = pdfjsLib.getDocument(this.pdfUrl);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 0.6 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext: any = {
        canvasContext: context,
        viewport: viewport,
      };

     
      await (page as any).render(renderContext).promise;

      this.thumbnail = canvas.toDataURL('image/png');
      this.cdr.detectChanges();
    } catch (e) {
      console.error('Thumbnail error:', e);
    }
  }
}