import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/shop/services/auth.service';

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();
    isLogin = false;
    isVerified = false;
    phone_number;
    user;
    // isVerify = false;
    account_login:FormGroup;
    constructor(private fb:FormBuilder, private auth:AuthService, private toast:ToastrService) { 
        this.account_login = this.fb.group({
            phone_no:['',[Validators.required,Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern("[0-9]{0-10}")]],
            otp:['',[Validators.required]]
        });
    }
    emit(){
        this.toast.success('Success','Register Page');
    }
   
    clear(){
        // console.log('Cleared Value');
        // this.account_login.reset();
    }
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
    
      }
      login(){
          if(this.account_login.value.otp !== ""){

            console.log(this.account_login.value.otp);
            // this.registerForm.get('firstname').value;
            this.auth.login(this.account_login.value).subscribe(auth=>{
            //   console.log(auth);
            //   console.log(user.user.id)

              localStorage.setItem('customer_id',auth.customer_id);
              localStorage.setItem('user_id',auth.id);      
              localStorage.setItem('token',auth.access_token);  
              this.account_login.reset();  
              this.isLogin = true;
                  
            });

          }     else{
            this.toast.error('Invalid Verification Code','Error');
        }
      }
    
      resend(){
        if(this.account_login.value.phone_no)
        {
            alert('Confirm your Mobile number '+this.account_login.value.phone_no);
        }
      }
    getOTP(){
        console.log(this.account_login.value);
        if(this.account_login.value.phone_no !== ""){
            console.log('Into GetOTP');
            this.isVerified=true;

            // this.phone_number = this.account_login.value.phone_no;
            // this.auth.getOTP(this.account_login.value).subscribe(otp => {
                
            //     console.log(otp);
            //     if(otp.status){
            //         // this.isLogin = true;
            //         this.isVerified = true;
                   
            //     }
            // });
        }
        else{
            this.toast.error('Mobile Number Invalid','Error');
        }
       
    }
}

