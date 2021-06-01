import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shop/services/auth.service';

@Component({
  selector: 'app-merchantcontact',
  templateUrl: './merchantcontact.component.html',
  styleUrls: ['./merchantcontact.component.scss']
})
export class MerchantcontactComponent implements OnInit {
@Input() merchantinfo:any;
@Input() product:any;
notification:any;
  constructor(private auth:AuthService) { 
    setTimeout(() => {
      console.log('This is Product Info',this.product);
      console.log('Merchant Info is Here', this.merchantinfo);
    this.notification = {product_id : this.product.id , merchant_id : this.merchantinfo.id};
    console.log('here is your notify details',this.notification);
    this.sendContactUsClick();
    });

  
  }
  sendContactUsClick(){
    console.log(this.notification.product_id,this.notification.merchant_id);
  this.auth.sendContactUsClick(this.notification).subscribe(res=>{
    console.log('This Works',res);
  })
}
  ngOnInit(): void {
   
  }

}
