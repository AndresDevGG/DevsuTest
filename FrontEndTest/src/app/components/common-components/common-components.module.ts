import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableSortDirective } from './data-table/data-table-sort.directive.directive';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FieldComponent } from './field/field.component';
import { FieldSearchComponent } from './field-search/field-search.component';
import { LogoComponent } from './logo/logo.component';
import { ModalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { PaginatorComponent } from './paginator/paginator.component';
import { SelectComponent } from './select/select.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    DataTableComponent,
    ButtonComponent,
    FieldComponent,
    SelectComponent,
    DatePickerComponent,
    CardComponent,
    LogoComponent,
    FieldSearchComponent,
    PaginatorComponent,
    DataTableSortDirective,
    DropdownComponent,
    ModalComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DataTableComponent,
    ButtonComponent,
    FieldComponent,
    SelectComponent,
    DatePickerComponent,
    CardComponent,
    LogoComponent,
    FieldSearchComponent,
    PaginatorComponent,
    DropdownComponent,
    ModalComponent,
    ToolbarComponent
  ]
})
export class CommonComponentsModule { }
