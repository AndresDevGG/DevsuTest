import { BehaviorSubject, Observable, Subject, debounceTime, delay, of, switchMap, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { SearchResult } from './data-table.model';
import { SortDirection } from './data-table-sort.directive.directive';

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}


function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort<T>(tables: Array<T>, column: string, direction: string): Array<any> {
  if (direction === '') {
      return tables;
  } else {
      return [...tables].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
      });
  }
}

function matches<T>(tables: T, term: string): boolean {

let match: boolean = false;

let properties: Array<String> = Object.getOwnPropertyNames(tables).filter(x => x !== "logo");

properties.forEach( row => {
  if(!match)
    match = String(tables[`${row}`]).toLowerCase().includes(term.toLowerCase())
});
return match;
}

@Injectable({
  providedIn: 'root'
})
export class DataTableService<T> {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tables$ = new BehaviorSubject<T[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
      page: 1,
      pageSize: 5,
      searchTerm: '',
      sortColumn: '',
      sortDirection: '',
      startIndex: 1,
      endIndex: 10,
      totalRecords: 0
  };

  private _data: Array<T> = [];

  constructor() {
      this._search$.pipe(
          tap(() => this._loading$.next(true)),
          debounceTime(200),
          switchMap(() => this._search()),
          delay(200),
          tap(() => this._loading$.next(false))
      ).subscribe(result => {
          this._tables$.next(result.tables);
          this._total$.next(result.total);
      });

      this._search$.next();
  }

  get tables$() { return this._tables$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get startIndex() { return this._state.startIndex; }
  get endIndex() { return this._state.endIndex; }
  get totalRecords() { return this._state.totalRecords; }
  get data() { return this._data; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize: Number(pageSize) }); }
  set startIndex(startIndex: number) { this._set({ startIndex: Number(startIndex) }); }
  set endIndex(endIndex: number) { this._set({ endIndex: Number(endIndex) }); }
  set totalRecords(totalRecords: number) { this._set({ totalRecords }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }
  set data(data: Array<T>) { this._data = data }
  private _set(patch: Partial<State>) {
      Object.assign(this._state, patch);
      this._search$.next();
  }

  private _search(): Observable<SearchResult<T>> {
      const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
      let tables = sort<any>(this.data, sortColumn, sortDirection);

      tables = tables.filter(table => matches(table, searchTerm));
      const total = tables.length;

      this.totalRecords = tables.length;
      this._state.startIndex = (page - 1) * this.pageSize + 1;
      this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
      if (this.endIndex > this.totalRecords) {
          this.endIndex = this.totalRecords;
      }
      tables = tables.slice(this._state.startIndex - 1, this._state.endIndex);

      return of(
          { tables, total }
      );
  }
}
