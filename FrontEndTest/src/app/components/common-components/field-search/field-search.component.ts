import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Component } from '@angular/core';

@Component({
  selector: 'app-field-search',
  templateUrl: './field-search.component.html',
  styleUrls: ['./field-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: FieldSearchComponent
    }
  ]
})
export class FieldSearchComponent implements ControlValueAccessor {


  public value: string | number = '';

  //#region Properties for ControlValueAccessor
  onChange = (value: any) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;
  //#endregion

  onChangeValue(event: any): void {
    console.log('disparo');
    this.registerOnTouched(null);
    if (!this.disabled) {
      this.onChange(this.value);
    }
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
