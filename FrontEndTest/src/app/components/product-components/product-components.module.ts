import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonComponentsModule } from '../common-components/common-components.module';
import { CommonModule } from '@angular/common';
import { FormProductComponent } from './form-product/form-product.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    FormProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonComponentsModule
  ],
  exports: [
    FormProductComponent
  ]
})
export class ProductComponentsModule { }
