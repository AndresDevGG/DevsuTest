import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() title: string = null;
  @Input() size: 'sm' | 'md' = 'md';
  @Input() description: string = null;

}
