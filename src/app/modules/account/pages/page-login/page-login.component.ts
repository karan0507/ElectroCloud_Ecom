import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/shop/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {
isVerify = false;
loginForm:FormGroup;

constructor(private fb:FormBuilder, private auth:AuthService) { 
    this.loginForm = this.fb.group({
        number:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
    })
}

login(){
    console.log(this.loginForm.value);
    this.auth.getOTP(this.loginForm.value.number).subscribe(login => {
        console.log(login);
        if(login.status)
        {
            this.isVerify=true;
        }
    });
}

}
