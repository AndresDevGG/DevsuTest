import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AppState } from 'src/app/store/core/models/app-state.model';
import { DataTableConfig } from 'src/app/components/common-components/data-table/data-table.model';
import { ModalService } from 'src/app/services/common/modal/modal.service';
import { ProductDTO } from 'src/app/models/product/data';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { productRoot } from 'src/app/store/product/product-state.index';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  public workListConfig: DataTableConfig = {
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

  public products: Array<ProductDTO> = [];
  public selectedProduct: ProductDTO = null;

  private destroySubject: Subject<void> = new Subject();

  constructor(
    private store: Store<AppState>,
    private modalService: ModalService,
    private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(productRoot.GET_PRODUCTS());
    this.store.select(productRoot.selectProducts)
    .pipe(takeUntil(this.destroySubject))
    .subscribe(res => {
      this.products = cloneDeep(res);
    });
  }

  public onDelete(e: ProductDTO): void {
    this.selectedProduct = e;
    this.modalService.open();
  }

  public onEdit(e: ProductDTO): void {
    this.selectedProduct = e;
    this.store.dispatch(productRoot.GET_PRODUCT_BY_ID_SUCCESS({data: this.selectedProduct}));
    this.router.navigateByUrl('/product/operator/edit')
  }

  public cancel(): void {
    this.modalService.close();
  }

  public confirmDelete(): void {
    this.store.dispatch(productRoot.DELETE_PRODUCT({id: this.selectedProduct.id}));
  }
  ngOnDestroy(): void {
    this.destroySubject.next();
  }

}
