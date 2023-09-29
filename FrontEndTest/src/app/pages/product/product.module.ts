import { AdminComponent } from './admin/admin.component';
import { CommonComponentsModule } from 'src/app/components/common-components/common-components.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OperatorComponent } from './operator/operator.component';
import { ProductComponentsModule } from 'src/app/components/product-components/product-components.module';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    AdminComponent,
    OperatorComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    CommonComponentsModule,
    ProductComponentsModule
  ]
})
export class ProductModule { }
