import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { timeInterval } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/shop/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {
isVerified = false;
loginForm:FormGroup;
phone_number:any;
log_user:any;
isLogin = false;
otp;
passcode_wrapper: FormGroup;

constructor(private fb:FormBuilder, private auth:AuthService, private toast:ToastrService) { 
    this.loginForm = this.fb.group({
        phone_no:['',[Validators.required,Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern("[0-9]{0-10}")]],
        otp:['',[Validators.required]]
    });
    this.passcode_wrapper = this.fb.group({
        one:['',[Validators.required]],
        two:['',[Validators.required]],
        three:['',[Validators.required]],
        four:['',[Validators.required]]
    });
}

numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  concatinate(){
      this.otp = JSON.stringify(this.passcode_wrapper.get('one').value) + JSON.stringify(this.passcode_wrapper.get('two').value) + JSON.stringify(this.passcode_wrapper.get('three').value) + JSON.stringify(this.passcode_wrapper.get('four').value);
    return this.otp;
    }
  clear(){

  }
  login(){
    this.concatinate();
    this.loginForm.get('otp').patchValue(this.otp);
    console.log(this.loginForm.value);

      if(this.loginForm.value.otp !== ""){

        console.log(this.loginForm.value.otp);
        // this.registerForm.get('firstname').value;
        this.auth.login(this.loginForm.value).subscribe(auth=>{
        //   console.log(auth);
        //   console.log(user.user.id)
          localStorage.setItem('customer_id',auth.customer_id);
          localStorage.setItem('user_id',auth.id);      
          localStorage.setItem('token',auth.access_token);
         if(auth.access_token !== null){
          localStorage.setItem('loggedIn','true');

         }  
          this.loginForm.reset();  
          this.toast.success('Login Completed Successfully','Success');

          this.isLogin = JSON.parse(localStorage.getItem('loggedIn'));
          this.isVerified = false;
          this.getCustInfo();
          
              
        });

      }     else{
        this.toast.error('Invalid Verification Code','Error');
    }
  }

  getCustInfo(){
    console.log('Get Customer Info');
    this.auth.getCustInfo().subscribe(user=>{
      console.log(user);
      this.log_user = user;
    })
  }

  resend(){
    if(this.loginForm.value.phone_no)
    {
        alert('Confirm your Mobile number '+this.loginForm.value.phone_no);
    }
  }
getOTP(){
    console.log(this.loginForm.value);
    if(this.loginForm.value.phone_no !== ""){
        console.log('Into GetOTP');
        // this.isVerified=true;

        this.phone_number = this.loginForm.value.phone_no;
        this.auth.getOTP(this.loginForm.value).subscribe(otp => {
            
            console.log(otp);
            if(otp.status){
              
                this.isLogin = true;
               
            }
        });
    }
    else{
        this.toast.error('Mobile Number Invalid','Error');
    }
   
}

// login(){
//     this.toast.success('Login','Login Page');
    
//     console.log(this.loginForm.value);
//     this.auth.getOTP(this.loginForm.value.number).subscribe(login => {
//         console.log(login);
//         if(login.status)
//         {
//             this.isVerify=true;
//         }
//     });
// }

}
