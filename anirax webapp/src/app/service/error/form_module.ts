import {FormBuilder, FormGroup, Validators } from '@angular/forms';
export class formModulechecker {
    constructor(private fb: FormBuilder) { }
    forsignup(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.required, Validators.min(8), Validators.max(20)]]
        })
    }
    forlogin(): FormGroup {
        return this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.required, Validators.min(8), Validators.max(20)]]
        })
    }
    forgetform(): FormGroup {
        return this.fb.group({
            email: ['', [Validators.email, Validators.required]]
        })
    }
    
}