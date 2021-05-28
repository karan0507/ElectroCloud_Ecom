import { Component } from '@angular/core';
import { Address } from '../../../../shared/interfaces/address';
import { addresses } from '../../../../../data/account-addresses';
import { AuthService } from 'src/app/modules/shop/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { HomeCommonService } from 'src/app/shared/services/home-common.service';

@Component({
    selector: 'app-page-addresses-list',
    templateUrl: './page-addresses-list.component.html',
    styleUrls: ['./page-addresses-list.component.sass']
})
export class PageAddressesListComponent {
    addresses: any;
    log_user:any;
    constructor(private auth:AuthService, private fb:FormBuilder, private common:HomeCommonService) { 
        this.getCustInfo();
    }
    getCustInfo(){
        // console.log('Get Customer Info');
        this.auth.getCustInfo().subscribe(user=>{
          // console.log(user);
          this.log_user = user.customer;
          
          if(typeof user.customer.CustomerAddresses !== undefined &&  user.customer.CustomerAddresses.length > 0){
            // console.log('Into If Cust address');
            console.log(this.log_user);
            this.addresses = user.customer.CustomerAddresses;
            console.log(this.addresses);
            // this.address.patchValue(this.user_adr);
            // this.isAddress = true;
            
          }
          else{
            this.addresses = null;
          }
        //   this.editInfo.patchValue(this.log_user);
        //  this.editInfo.patchValue({email:this.log_user.User.email});
        })
      }
}
