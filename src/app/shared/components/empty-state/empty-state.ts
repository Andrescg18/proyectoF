import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './empty-state.html',
  styleUrls: ['./empty-state.css']
})
export class EmptyStateComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) message!: string;
  @Input() iconType: 'cart' | 'favorites' | 'search' | 'error' = 'search';
  @Input() actionText: string = '';
  @Input() actionRoute: string = '';
}
