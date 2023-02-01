import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class YourComponent {
  constructor(private toastr: ToastrService) {}
  showSuccess(text: string | undefined,title: string | undefined) {
    this.toastr.success(text,title, {timeOut: 2000});
  }
  showError(text: string | undefined,title: string | undefined) {
    this.toastr.error(text, title, {timeOut: 2000});
  }
  showWarning(text: string | undefined,title: string | undefined) {
    this.toastr.warning(text,title, {timeOut: 2000});
  }
  showinfo(text: string | undefined,title: string | undefined) {
    this.toastr.info(text,title, {timeOut: 2000});
  }
  }
