import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { OperatorComponent } from './operator/operator.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'operator',
    component: OperatorComponent
  },
  {
    path: 'operator/edit',
    component: OperatorComponent,
    data: {
      action: 'edit'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
