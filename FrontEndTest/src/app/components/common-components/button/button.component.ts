import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() navigate: string = '';

  @Output() onClick = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  onClickEvent(): void {
    if(this.navigate) {
      this.router.navigateByUrl(this.navigate);
    } else {
      this.onClick.emit(true);
    }
  }

}
