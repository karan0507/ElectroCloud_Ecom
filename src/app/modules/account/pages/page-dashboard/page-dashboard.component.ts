import { ChangeDetectorRef, Component } from '@angular/core';
import { Order } from '../../../../shared/interfaces/order';
import { orders } from '../../../../../data/account-orders';
import { Address } from '../../../../shared/interfaces/address';
import { addresses } from '../../../../../data/account-addresses';
import { AuthService } from 'src/app/modules/shop/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeCommonService } from 'src/app/shared/services/home-common.service';
import { getLocaleWeekEndRange } from '@angular/common';

@Component({
    selector: 'app-page-dashboard',
    templateUrl: './page-dashboard.component.html',
    styleUrls: ['./page-dashboard.component.scss']
})
export class PageDashboardComponent {
    log_user:any;
    editInfo:FormGroup;
    address: FormGroup;
 
    orders: Partial<Order>[] = orders.slice(0, 3);
    isAddress = false;
    isEdit = true;
  user_adr: any;
  email: any;
    constructor(private auth:AuthService, private fb:FormBuilder, private common:HomeCommonService, private changeDetect:ChangeDetectorRef) {

      this.editInfo = this.fb.group({
        firstName:['',[Validators.required]],
        lastName:['',[Validators.required]],
        phone_no:['',[Validators.required]],
        email:['',[Validators.required]],
         
      });
      this.address = this.fb.group({
        city:['',[Validators.required]],
        pincode:['',[Validators.required]],
        address_line:['',[Validators.required]],
        address_line_2:['',[Validators.required]],
        state:['',[Validators.required]]
        //  address:this.fb.group({
      //    ,
      //  })
      })

       setTimeout(()=>{
        this.getCustInfo();
       }) 
     }
     editProfile(){
       this.isEdit = false;
      //  console.log(this.log_user.User.email);
     }
     save(){
        console.log(this.address.value);
        const id = localStorage.getItem('customer_id');
        // console.log(id);
        this.common.addCustomerAddress(this.address.value).subscribe(addr=>{
          // console.log("hello");
          // console.log(addr);
        })
      this.getCustInfo();
      this.close();
     }
     close(){
      this.isEdit = true;
     }
     ngOnInIt(){
      this.changeDetect.detectChanges();
     }
     getCustInfo(){
        // console.log('Get Customer Info');
        this.auth.getCustInfo().subscribe(user=>{
          // console.log(user);
          this.log_user = user.customer;
          if(typeof user.customer.CustomerAddresses !== undefined &&  user.customer.CustomerAddresses.length > 0){
            // console.log('Into If Cust address');
            this.user_adr = user.customer.CustomerAddresses[0];
            this.address.patchValue(this.user_adr);
            this.isAddress = true;
            
          }
          else{
            this.user_adr = null;
          }
          this.editInfo.patchValue(this.log_user);
         this.editInfo.patchValue({email:this.log_user.User.email});
        })
      }
}
