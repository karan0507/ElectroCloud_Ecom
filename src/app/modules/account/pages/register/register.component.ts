import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/shop/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isVerify = true;
  registerForm: FormGroup;
  verification: FormGroup;
  user: any;
  constructor(private fb: FormBuilder, private auth: AuthService, private toast: ToastrService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone_no: ['', [Validators.required]]
    });

    this.verification = this.fb.group({
      otp: ['', [Validators.required]],
      phone_no: ['', [Validators.required]]
    });

  }
  ngOnInit(): void {

  }
  verify() {
    this.auth.verifyCustomer(this.verification.value).subscribe(reguser => {

      console.log(reguser);
      this.router.navigateByUrl('/');
    });
  }
  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // this.registerForm.get('firstname').value;
      this.auth.register(this.registerForm.value).subscribe(user => {
        // console.log(user);
        if (user.status) {
          console.log(user);
          console.log(user.user.id);
          localStorage.setItem('customer_id', user.customer.id);
          localStorage.setItem('user_id', user.user.id);
          this.isVerify = false;
          console.log(this.registerForm.value.phone_no);
          this.verification.setValue({
            phone_no: this.registerForm.value.phone_no,
            otp: ''
          });
        } else {
          this.toast.error('Already a user', 'Please login');
        }
      });
    }
    else {
      this.toast.error('Please fill all the fields');
    }





  }

  // registerForm = new FormGroup(
  // {
  //   firstname: new FormControl(''),
  //   lastname: new FormControl(''),
  //   email: new FormControl(''),
  //   mobile_number: new FormControl(''),
  //   verification: new FormControl('')
  // }
  // );
}
