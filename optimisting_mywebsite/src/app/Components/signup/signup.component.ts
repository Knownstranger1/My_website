import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { YourComponent } from 'src/app/service/notification/notification.service';
import { backend_api } from 'src/environments/api_url';
import { ApiServiceService } from '../../service/Api/api-service.service';
import {formModulechecker} from '../../service/error/form_module'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public form: any;
  public ValidatorChecker:boolean = false;
  constructor(
    private fb: FormBuilder,
    private service: ApiServiceService,
    private router: Router,
    private noti: YourComponent
  ) {
    this.form = new formModulechecker(this.fb).forsignup();
  }
  ngOnInit(): void {
    this.Signupget();
  }

  get f() {
    return this.form.controls;
  }

  ngOnDestroy(): void {
  }
  data() {
    this.ValidatorChecker = true
    let url = backend_api.base_singup;
    let body = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
    };
  this.service
      .signup(body, url)
      .then((res) => {
        let message = JSON.parse(JSON.stringify(res)).message;
        let title = 'Successfully';
        this.noti.showSuccess(message, title);
        this.router.navigate(['login'])
      })
      .catch((err) => {
        console.log(err);
        let message = err.error.details[0].message;
        let title = 'Try Again';
        this.noti.showError(message, title);
      });
  }
  Signupget() {
    let url = backend_api.base_singup;
 this.service.signupget(url);
  }

  valid(){
   if(this.form.valid){
    return false
   }
   return true
  }
}
