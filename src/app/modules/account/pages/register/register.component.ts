import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/shop/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isVerify = false;
  registerForm:FormGroup;
  user:any;
  constructor(private fb:FormBuilder, private auth:AuthService) { 
   this.registerForm = this.fb.group({
     firstName:['',[Validators.required]],
     lastName:['',[Validators.required]],
     email:['',[Validators.required]],
     phone_no:['',[Validators.required]]
   })
   
  }
  ngOnInit(): void {

  }

  register(){
    console.log(this.registerForm.value);
    // this.registerForm.get('firstname').value;
    this.auth.register(this.registerForm.value).subscribe(user=>{
      console.log(user);
      console.log(user.user.id)
      localStorage.setItem('customer_id',user.customer.id);
      localStorage.setItem('user_id',user.user.id);      
    });


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
