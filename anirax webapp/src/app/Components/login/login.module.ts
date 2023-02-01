import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog'
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { DialogBoxComponentComponent } from '../../service/dialog-box-component/dialog-box-component.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { MatButtonModule } from '@angular/material/button';
import { DialogvalidatorsComponent } from '../../service/error/dialogvalidators/dialogvalidators.component'


@NgModule({
  declarations: [
    LoginComponent,
    DialogBoxComponentComponent,
    DialogvalidatorsComponent,
    
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    NgOtpInputModule,
    MatButtonModule
  ]
})
export class LoginModule { }
