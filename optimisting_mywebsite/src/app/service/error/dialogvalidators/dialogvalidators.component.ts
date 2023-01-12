import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialogvalidators',
  templateUrl: './dialogvalidators.component.html',
  styleUrls: ['./dialogvalidators.component.css']
})
export class DialogvalidatorsComponent {
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
