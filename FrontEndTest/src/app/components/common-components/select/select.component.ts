import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: SelectComponent
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() items: Array<any> = [];

  @Input() bindLabel: string = '';
  @Input() bindValue: string = '';

  @Input() submit: boolean = false;
  @Input() errors: any;

  public value: string | number = '';

  //#region Properties for ControlValueAccessor
  onChange = (value: any) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;
  //#endregion

  onChangeValue(event: any): void {
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
