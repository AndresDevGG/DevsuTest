import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/store/core/models/app-state.model';
import { DateValidator } from 'src/app/common/Validators/date-validator';
import { ProductDTO } from 'src/app/models/product/data';
import { ProductPayload } from 'src/app/models/product/payload';
import { Store } from '@ngrx/store';
import { formatDate } from 'src/app/common/utils/formatDate.util';
import { productRoot } from 'src/app/store/product/product-state.index';

export type FormAction = 'create' | 'edit';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  @Input() action: 'create' | 'edit' = 'create';

  get create(): boolean { return this.action === 'create' };
  get edit(): boolean { return this.action === 'edit' };
  get form() { return this.productForm.controls }

  @Input() actionForm: FormAction;
  public productForm: FormGroup;
  public isSubmit: boolean;
  private _destroySubject: Subject<void> = new Subject();

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.actionForm === 'edit') {
      this.getProduct();
    } else
      this.initForm();
  }

  public getProduct(): void {
    this.store.select(productRoot.selectProduct)
    .pipe(takeUntil(this._destroySubject))
    .subscribe(res => {
      this.initForm(res);
    });
  }

  public submit(): void {
    this.isSubmit = true;
    console.log(this.productForm);
    console.log('entró');

    if (this.productForm.invalid)
      return;
    let data = this.productForm.getRawValue();
    const payload: ProductPayload = {
      ...data,
      date_release: formatDate(data.date_release),
      date_revision: formatDate(data.date_revision),
    };

    console.log('entró');
    if (this.actionForm === 'create')
      this.store.dispatch(productRoot.VERIFICATION_PRODUCT_ID({ payload, redirect: true}))
    else
      this.store.dispatch(productRoot.UPDATE_PRODUCT({payload, redirect: true}))

  }

  public cancel(): void {
    if (this.actionForm === 'create') {
      this.initForm();
    } else
      this.router.navigateByUrl('/product')
  }

  public initForm(product?: ProductDTO): void {
    this.isSubmit = false;
    this.productForm = new FormGroup({
      id: new FormControl({ value: product?.id ?? "", disabled: this.actionForm === 'edit' }, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      name: new FormControl(product?.name ?? "", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      description: new FormControl(product?.description ?? "", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      logo: new FormControl(product?.logo ?? "", [Validators.required]),
      date_release: new FormControl(new Date(product?.date_release) ?? new Date, [Validators.required, DateValidator.NotPreviousDate]),
      date_revision: new FormControl({ value: new Date(product?.date_revision) ?? null, disabled: true }, Validators.required)
    });
    this.calculateDateRevision();
  }

  public calculateDateRevision(): void {
    let date_release_value = this.form['date_release'].value;
    let date_revision = new Date(date_release_value);
    date_revision.setFullYear(date_revision.getFullYear() + 1);
    this.form['date_revision'].setValue(date_revision);
  }

}

