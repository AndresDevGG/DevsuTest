import { Component, ContentChild, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChildren } from '@angular/core';
import { DataTableSortDirective, SortEvent } from './data-table-sort.directive.directive';

import { DataTableConfig } from './data-table.model';
import { DataTableService } from './data-table.service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T> implements OnInit, OnChanges {

  @Input() data: Array<T> = [];
  @Input() config: DataTableConfig;

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
  @ViewChildren(DataTableSortDirective) headers: QueryList<DataTableSortDirective>;

  // Table data
  tableData: Array<T>;
  tables$: Observable<Array<T>>
  total$: Observable<number>
  hideme: boolean[] = []

  constructor(public service: DataTableService<T>) {}

  ngOnInit(): void {
    this.initData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.initData();
  }

  changeSelect() {
    this.service.page = 1;
  }

  private initData(): void {

    if (!this.data) {
      this.data = [];
    }

    this.service.data = this.data;
    this.tables$ = this.service.tables$
    this.total$ = this.service.total$

    if (this.config.pageSize) {
      this.service.pageSize = this.config.pageSize;
    }
    /**
     * fetch data
     */
    this._fetchData()
  }

  public get colspan(): number {
    let columns = this.config.columns.length;
    this.config.tools.actions ? columns++ : columns;

    return columns;
  }

  _fetchData() {
    this.tableData = this.data;
    for (let i = 0; i <= this.tableData.length; i++) {
      this.hideme.push(true)
    }
  }

  public editData(row: T): void {
    this.edit.emit(row);
  }

  public deleteData(data: T): void {
    this.delete.emit(data);
  }

  changeValue(i) {
    this.hideme[i] = !this.hideme[i]
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = ''
      }
    })
    this.service.sortColumn = column
    this.service.sortDirection = direction
  }
}
