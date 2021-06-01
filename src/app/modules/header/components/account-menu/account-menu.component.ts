import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/shop/services/auth.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {
  log_user: any;
  @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();
  @Output() loginevent: EventEmitter<void> = new EventEmitter<void>();
  isLogin = JSON.parse(localStorage.getItem('loggedIn'));
  isVerified = false;
  user;
  isEdit: boolean;
  account_login: FormGroup;


  constructor(private root: Router, private fb: FormBuilder, private auth: AuthService, private toast: ToastrService, private changeDetect: ChangeDetectorRef) {
    this.account_login = this.fb.group({
      phone_no: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      otp: ['', [Validators.required]]
    });
    this.getCustInfo();

  }
  emit() {
    this.toast.success('Success', 'Register Page');
  }


  edit_phone_no() {
    this.isEdit = true;
    console.log('Edit works perfect');
  }


  confirm_phone_no() {
    if (this.account_login.get('phone_no').valid) {
      this.auth.getOTP(this.account_login.value.phone_no).subscribe(otp => {
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
      console.log(this.account_login.value);
      this.toast.error('Mobile Number Invalid', 'Error');
      this.root.navigateByUrl('/account/register');
    }

  }


  clear() {
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
  login() {

    if (this.account_login.value.otp !== "") {

      console.log(this.account_login.value);
      // this.registerForm.get('firstname').value;
      this.auth.login(this.account_login.value).subscribe(auth => {
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
            this.account_login.reset();
            this.toast.success('Login Completed Successfully', 'Success');
            this.root.navigateByUrl('/');
            this.changeDetect.detectChanges();
            this.loginevent.emit();
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
  logout() {
    this.isLogin = false;
    localStorage.removeItem('token');
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('customer_id');
    localStorage.removeItem('user_id');
    this.changeDetect.detectChanges();

  }
  getCustInfo() {
    // console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== 'null' && localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') {
      this.auth.getCustInfo().subscribe(user => {
        // console.log(user);
        this.log_user = user.customer;
        // this.isLogin = false;
      })
    }

  }

  resend() {
    if (this.account_login.value.phone_no) {
      alert('Confirm your Mobile number' + this.account_login.value.phone_no);
    }
  }

  getOTP() {
    if (this.account_login.get('phone_no').valid) {
      this.auth.getOTP(this.account_login.value.phone_no).subscribe(otp => {
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
      console.log(this.account_login.value);
      this.toast.error('Mobile Number Invalid', 'Error');
      this.root.navigateByUrl('/account/register');
    }

  }

}

