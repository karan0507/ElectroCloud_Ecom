import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) {
  
   }
   getOTP(phone_no):Observable<any>{
    return this.http.post(environment.apiUrl + 'customer/resend/otp',{phone_no:phone_no});
   }
   verifyCustomer(verification):Observable<any>{
     return this.http.post(environment.apiUrl + 'customer/register/verify',verification);
   }

   register(user):Observable<any>{
return this.http.post(environment.apiUrl + 'customer/register',user);
   }
   login(user):Observable<any>{
     return this.http.post(environment.apiUrl + 'customer/login', user);
   }
   getCustInfo():Observable<any>{
     return this.http.get(environment.apiUrl + 'customer/info');

   }
   sendContactUsClick(notification):Observable<any>{
    return this.http.post(environment.apiUrl + 'customer/info/merchant' , {merchantId:notification.merchant_id, productId:notification.product_id});
    }
}
