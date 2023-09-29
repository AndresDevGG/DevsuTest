import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

  public toogleDrop: boolean = false;

  @Output() edit = new EventEmitter<boolean>();
  @Output() delete = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {}

  public onEdit = () => this.edit.emit(true);
  public onDelete = () => this.delete.emit(true);


  public toggle(): void {
    this.toogleDrop = !this.toogleDrop;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.toogleDrop = false;
    }
  }

}
