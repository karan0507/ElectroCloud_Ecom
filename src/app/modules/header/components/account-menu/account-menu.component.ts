import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    isVerify = false;
    constructor(private fb:FormBuilder, private auth:AuthService) { }

    getOTP(){
        console.log('Into GetOTP');
        this.auth.getOTP('7040179326').subscribe(otp => {

            console.log('Get OTP here');
        });
    }
}

