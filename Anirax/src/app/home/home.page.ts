import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { backend_api } from '../../environments/api_url';
import { BackendConnectService } from '../service/backend-connect.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public checker: boolean | undefined = false;
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private service: BackendConnectService, private toast: ToastController) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  login(type: string) {
    if (type == 'Login') {
      this.checker = false
    } else {
      this.checker = true
    }
  }
  ngOnInit() {

  }
  submit(data: any, type: string) {
    if (type == 'Login') {
      let url = backend_api.base_login
      let email = data.controls.email.value
      let password = data.controls.password.value
      let obj = {
        email,
        password
      }
      this.service.login(url, obj).then(async r => {
        const successtoast = await this.toast.create({
          message: 'Welcome',
          color: 'success',
          duration: 1000,
          position: 'top',
          cssClass: 'Success-toast'
        });
        await successtoast.present();
      }).catch(async error => {
        console.log(error);
        const errortoast = await this.toast.create({
          message: error.error.message,
          color: 'danger',
          duration: 1000,
          position: 'top',
          cssClass: 'my-custom-toast'
        });
        await errortoast.present();
      })
    } else {
      let url = backend_api.base_singup
      let email = data.controls.email.value
      let password = data.controls.password.value
      let name = data.controls.name.value
      let body = {
        email,
        password,
        name
      }
      this.service.register(url, body).then(async r => {
        const successtoast = await this.toast.create({
          message: 'Created',
          color: 'success',
          duration: 1000,
          position: 'top',
          cssClass: 'Success-toast'
        });
        await successtoast.present();
      }).catch(async error => {
        const errortoast = await this.toast.create({
          message: error.error.details[0].message,
          color: 'danger',
          duration: 1000,
          position: 'top',
          cssClass: 'my-custom-toast'
        });
        await errortoast.present();
      });
    }

  }
}
