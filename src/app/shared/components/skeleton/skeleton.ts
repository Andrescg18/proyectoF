import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  templateUrl: './skeleton.html',
  styleUrls: ['./skeleton.css']
})
export class SkeletonComponent {
  @Input() type: 'grid' | 'details' | 'list' = 'grid';
  @Input() count: number = 8;

  // Helper to generate loop arrays for modern Angular @for flow
  get itemsArray(): number[] {
    return Array(this.count).fill(0);
  }
}
