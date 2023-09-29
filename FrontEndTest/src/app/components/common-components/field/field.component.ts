import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { formatDate } from 'src/app/common/utils/formatDate.util';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: FieldComponent
    }
  ]
})
export class FieldComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() type: 'text' | 'date' = 'text';

  public value: string | Date = '';


  //#region Properties for ControlValueAccessor
  onChange = (value: any) => {};

  onTouched = () => {};

  touched = false;
  touchedFirst = false;

  disabled: boolean = false;
  @Input() submit: boolean = false;
  @Input() errors: any;
  //#endregion

  onChangeValue(): void {
    this.registerOnTouched(null);
    if (!this.disabled) {
      if (this.type === 'date') {
        let value = new Date(this.value);
        value.setDate(value.getDate() + 1);
        this.onChange(value);
      } else
        this.onChange(this.value);


    }
  }

  writeValue(obj: any): void {
    if (this.type === 'date' && typeof(obj) === 'object' && obj !== null) {
      this.value = formatDate(obj);
    }else
      this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    if (this.touchedFirst && !this.touched) {
      this.onTouched();
      this.touched = true;
    }
    this.touchedFirst = true;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
