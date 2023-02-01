import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
export function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup):ValidationErrors|any => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      if (matchingControl.errors && !matchingControl.errors["confirmPasswordValidator"]) {
        return
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors({ confirmPasswordValidator: false });
      }
    };
  }

