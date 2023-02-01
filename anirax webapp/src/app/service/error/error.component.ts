import { Component, Input } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  @Input() field: FormGroup | undefined;
  @Input() message: string = ''
  @Input() error: string = ''
  
  constructor() {

  }
  shouldwork() {
    if (this.field?.dirty && this.field.errors?.[this.error]) {
      return true
    }
    return false
  }
}



