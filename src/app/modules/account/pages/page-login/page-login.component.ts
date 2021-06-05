import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { timeInterval } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/shop/services/auth.service';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit{
  isVerified: boolean;
  loginForm: FormGroup;
  phone_number: any;
  log_user: any;
  isLogin: boolean;
  otp;
  passcode_wrapper: FormGroup;
  isEdit:boolean;

  constructor(private root: Router,private changeDetect: ChangeDetectorRef,
              private fb: FormBuilder, private auth: AuthService, private toast: ToastrService) {
    this.loginForm = this.fb.group({
      phone_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      otp: ['', [Validators.required]]
    });
   
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  // concatinate(){
  //     this.otp = JSON.stringify(this.passcode_wrapper.get('one').value) + JSON.stringify(this.passcode_wrapper.get('two').value) + JSON.stringify(this.passcode_wrapper.get('three').value) + JSON.stringify(this.passcode_wrapper.get('four').value);
  //   return this.otp;
  //   }
  clear() {

  } edit_phone_no() {
    this.isEdit = true;
    console.log('Edit works perfect');
  }


  confirm_phone_no() {
    if (this.loginForm.get('phone_no').valid) {
      this.auth.getOTP(this.loginForm.value.phone_no).subscribe(otp => {
        console.log(otp);
        if (otp.status) {
          this.toast.success('OTP sent', 'Success');
          this.isVerified = true;
        } else {
          this.toast.error('UnSucessful', 'You have enterd wrong number');
          this.root.navigateByUrl('/account/register');
        }
      });
    }
    else {
      console.log(this.loginForm.value);
      this.toast.error('Mobile Number Invalid', 'Error');
      this.root.navigateByUrl('/account/register');
    }

  }




  login() {

    if (this.loginForm.value.otp !== "") {

      console.log(this.loginForm.value);
      // this.registerForm.get('firstname').value;
      this.auth.login(this.loginForm.value).subscribe(auth => {
        console.log(auth);
        console.log(typeof (auth.user));

        if (typeof (auth.user) === 'undefined') {
          console.log(typeof (auth.user));
          if (auth.access_token !== null) {
            console.log(typeof (auth.user));
            localStorage.setItem('customer_id', auth.customer_id);
            localStorage.setItem('user_id', auth.id);
            localStorage.setItem('token', auth.access_token);
            localStorage.setItem('loggedIn', 'true');
            this.isLogin = JSON.parse(localStorage.getItem('loggedIn'));
            this.isVerified = false;
            this.getCustInfo();
            this.loginForm.reset();
            this.toast.success('Login Completed Successfully', 'Success');
            this.ngOnInit();     
            //******** Remove ngOnIt for refreshing page on login button for showing value on accountMenu (Dashboard) (4 June 2021)
            this.changeDetect.detectChanges();
            this.root.navigateByUrl('/');
           
          }
          else {
            this.toast.error('Login Failed', 'You Need to Register on Vidyut Cloud');
            this.root.navigateByUrl('/account/register');
          }
        } else {
          this.toast.error('Login Failed', 'You Need to Register on Vidyut Cloud');
          this.root.navigateByUrl('/account/register');
        }




      });

    }
    else {
      this.toast.error('Invalid Verification Code', 'Error');
    }
  }

  getCustInfo() {
    console.log('Get Customer Info');
    this.auth.getCustInfo().subscribe(user => {
      console.log(user);
      this.log_user = user;
    })
  }

  resend() {
    if (this.loginForm.value.phone_no) {
      alert('Confirm your Mobile number ' + this.loginForm.value.phone_no);
      this.getOTP();
    }
  }
  // getOTP(){
  //     console.log(this.loginForm.value);
  //     if(this.loginForm.value.phone_no !== ""){
  //         console.log('Into GetOTP');
  //         // this.isVerified=true;

  //         this.phone_number = this.loginForm.value.phone_no;
  //         this.auth.getOTP(this.loginForm.value).subscribe(otp => {

  //             console.log(otp);
  //             if(otp.status){

  //                 this.isLogin = true;

  //             }
  //         });
  //     }
  //     else{
  //         this.toast.error('Mobile Number Invalid','Error');
  //     }

  // }
  getOTP() {
    if (this.loginForm.get('phone_no').valid) {
      this.auth.getOTP(this.loginForm.value.phone_no).subscribe(otp => {
        console.log(otp);
        if (otp.status) {
          this.toast.success('OTP sent', 'Success');
          this.isLogin = true;
          this.isVerified = true;
          this.changeDetect.detectChanges();
        } else {
          this.toast.error('UnSucessful', 'You have enterd wrong number');
        }
      });
    }
    else {
      console.log(this.loginForm.value);
      this.toast.error('Mobile Number Invalid', 'Error');
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
