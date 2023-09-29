import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() page: number;
  @Input() pageSize: number;
  @Input() collectionSize: number;

  @Output() pageChange = new EventEmitter<number>();

  public pagination: Array<number> = [1];

  ngOnInit(): void {
    this.configPages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.configPages();
  }

  public configPages(): void {
    const cantidadTotalDePaginas = Math.ceil(this.collectionSize / this.pageSize);
    this.pagination = Array(cantidadTotalDePaginas).fill(0).map((x, i) => i + 1);
  }

  public setPage(page: number): void {
    this.page = page;
    this.pageChange.emit(this.page);
  }

  public leftPage(): void {
    if(this.page !== 1)
      this.setPage(this.page - 1);
  }

  public rightPage(): void {
    if(this.page !== this.pagination.length)
      this.setPage(this.page + 1);
  }

}
