import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.sass']
})
export class PageProfileComponent {
    edit_profile:any;
    constructor(private fb:FormBuilder) {
        this.edit_profile = this.fb.group({
            profile_img:['',[Validators.required]],
            firstName:['',[Validators.required]],
            lastName:['',[Validators.required]],
            phone_no:['',[Validators.required,Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern("[0-9]{0-10}")]],
            email:['',[Validators.required]]
        });
     }
   
    setProfile(){
        console.log(this.edit_profile.value);
    }
}
