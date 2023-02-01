import { ApiServiceService } from './../Api/api-service.service';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/Components/login/login.component';
import { backend_api } from 'src/environments/api_url';
import { YourComponent } from '../notification/notification.service';
import { formModulechecker } from '../error/form_module';
import { ConfirmPasswordValidator } from '../error/validators/password_confirm_validators';

@Component({
  selector: 'app-dialog-box-component',
  templateUrl: './dialog-box-component.component.html',
  styleUrls: ['./dialog-box-component.component.css']
})
export class DialogBoxComponentComponent {
  public ForgetForm: any;
  public forgetpassword:any;
  public otp:any = new FormControl('',Validators.required)
  public Submited: boolean = false;
  public OtpValidator:boolean=false;
  public dialogpostunsubscribe:any;
  public reset_password_error:boolean | undefined;
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: ApiServiceService,
    private noti:YourComponent
  ) {
    this.ForgetForm = new formModulechecker(this.fb).forgetform();
    this.forgetpassword = fb.group({
      password: ["",Validators.required],
      confirmPassword: ["",Validators.required ]
    },
    {
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    })
  }



  get f() {
    return this.ForgetForm.controls;
  }

  submit() {
    this.Submited = true;
    const body = {
      email: this.ForgetForm.value.email,
    };
    let url = backend_api.base_ResetPass;
    this.dialogpostunsubscribe = this.service.resetpassword(url, body).then((res: any)=>{
      localStorage.setItem('email',body.email)
      this.dialogRef.close()
      this.noti.showSuccess("Otp to Your Email","Successfully Sent")
      const otpform = this.dialog.open(DialogBoxComponentComponent,{
        panelClass:'otp_pannel',
           autoFocus: true,
           width: "375px",
           height: "200px",
           data: {
             otp: true
           }
      })

    }).catch((err: { error: { message: any; }; })=>{
      let message = err.error.message
       this.noti.showError(message,'Try again')
    })
  }
  otpSubmit(){
    this.OtpValidator = true
    let otp=this.otp.value
    let url = backend_api.base_otp
    let email = localStorage.getItem('email')
    let body:any = {
      otp:otp,
      email:email
    }
    this.service.otpsend(url,body).then((res: any)=>{
      let message = JSON.parse(JSON.stringify(res)).message
      console.log(message);
      this.noti.showSuccess(message,'Successfull Now')
      this.dialogRef.close()
      const changepassword = this.dialog.open(DialogBoxComponentComponent,{
        autoFocus: true,
        width: "375px",
        height: "200px",
        data: {
          Changepassword: true
        }
      })
    }).catch((err: { error: { message: any; }; })=>{
       let message = err.error.message
       this.noti.showError(message,'Try again')
    })
  }
  resendotp(){
    let url = backend_api.base_ResetPass
   let email = localStorage.getItem('email')
   const body = {
    email: email,
  };
    this.dialogpostunsubscribe = this.service.resetpassword(url, body).then((res: any)=>{
      this.noti.showSuccess("Otp to Your Email","Successfully Sent")
    }).catch((err: any)=>{
       this.noti.showError("Something Happended","Try again")
    })
  }
  resetpassword(){
    this.reset_password_error =true
    const password = this.forgetpassword.value.password
    const cpasword = this.forgetpassword.value.confirmPassword
    const email = localStorage.getItem('email')
    const body:any = {
      password: password,
      email:email
    }
    let url = backend_api.base_update_password
    if(password == cpasword){
     this.service.updatepassword(body,url).then((res: any)=>{
      this.dialogRef.close()
      let message = JSON.parse(JSON.stringify(res)).message
      this.noti.showSuccess(message,'Successfully')
     }).catch((err: { error: { message: any; }; })=>{
      let message = err.error.message
      this.noti.showError(message,'Try again')
     })
    }else{
      this.noti.showError('Password didnt match','Try Again')
    }
  }
}
