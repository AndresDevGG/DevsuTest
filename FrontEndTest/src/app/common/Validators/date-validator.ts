import { FormControl, ValidationErrors } from "@angular/forms";

export class DateValidator {

  static NotPreviousDate(control: FormControl): ValidationErrors | null {
    let date = new Date(control.value);

    let today: Date = new Date();

    if (date < today)
      return { "notpreviousdate": true };

    return null;
  }
}
