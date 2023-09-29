export class DataTableConfig {

  public title?: string = '';
  public description?: string = '';
  public columns: Array<DataTableHeader>;
  public tools?: DataTableFunctions;
  public pageSize?: number;
}
export class DataTableHeader {
  public caption: string = '';
  public field: string = '';
  public compare?: string = '';
  public mask?: 'currency' | 'date';
  public type?: 'action' | 'field' | 'avatar' | 'image' = 'field';
  public amount?: boolean = false;
}

export class DataTableFunctions {
  public actions?: DataTableMenuOptions;
  public search?: boolean = true;
  public pages?: boolean = true;
  public paginate?: boolean = true;
}
export class DataTableMenuOptions {
  public edit?: boolean;
  public view?: boolean;
  public delete?: boolean;
}

export interface Table {
  name: string;
  description: string;
}

export interface SearchResult<T> {
  tables: Array<T>;
  total: number;
}


