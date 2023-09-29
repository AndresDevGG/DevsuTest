import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';
import { ProductDTO } from 'src/app/models/product/data';
import { DataTableService } from './data-table.service.service';
import { DataTableSortDirective } from './data-table-sort.directive.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DataTableComponent', () => {
  let component: DataTableComponent<ProductDTO>;
  let fixture: ComponentFixture<DataTableComponent<ProductDTO>>;
  let service: DataTableService<ProductDTO>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableComponent, DataTableSortDirective],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [DataTableService]
    });
    fixture = TestBed.createComponent(DataTableComponent<ProductDTO>);
    component = fixture.componentInstance;

    component.config = {
      columns: [
        {
          caption: 'Logo',
          field: 'logo',
          type: 'image'
        },
        {
          caption: 'Nombre del producto',
          field: 'name'
        },
        {
          caption: 'Descripcion',
          field: 'description'
        },
        {
          caption: 'Fecha de liberación',
          field: 'date_release',
          mask: 'date'
        },
        {
          caption: 'Fecha de reestructuración',
          field: 'date_revision',
          mask: 'date'
        }
      ],
      tools: {
        actions: {
          edit: true,
          delete: true
        }
      }
    }

    service = TestBed.inject(DataTableService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería recibir el servicio', () => {
    expect(component.service).toBe(service);
  });
});
