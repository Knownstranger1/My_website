import { ApiServiceService } from './../../service/Api/api-service.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { YourComponent } from 'src/app/service/notification/notification.service';
import { backend_api } from 'src/environments/api_url';
import { DialogBoxComponentComponent } from '../../service/dialog-box-component/dialog-box-component.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  public form: any;
  public errorcounter: number = 3;
  public EmailError:string | undefined;
  constructor(
    private fb: FormBuilder,
    private service: ApiServiceService,
    private router: Router,
    private noti: YourComponent,
    private dialog: MatDialog
  ) {
    this.form = fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
    })
  }


  ngOnInit(): void {
    this.loginget();
  }

  get f(){
    return this.form.controls
  }


  loginget() {
    let url = backend_api.base_login
  this.service.login(url)
  }



  data() {
    let url = backend_api.base_login
    let body = {
      email: this.form.value.email,
      password: this.form.value.password
    }
 this.service.loginpost(url, body).then(res => {
      let token = JSON.parse(JSON.stringify(res)).token
      localStorage.setItem('token', token)
      this.router.navigate(['Dashboard'])
    }).catch(err => {
      let message = JSON.parse(JSON.stringify(err)).error.message
      this.noti.showError(message, `Attempts left ${this.errorcounter}`)
      this.errorcounter--
      if (this.errorcounter == -1) {
     const forget = this.dialog.open(DialogBoxComponentComponent, {
          width: "830px",
          height: "530px",
          autoFocus: true,
          data: {
            fogetpassword: true
          }
        })
        forget.afterClosed().subscribe(result=>{})
        this.errorcounter = 3
      }
    })
  }


}
