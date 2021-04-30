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
   getOTP(number):Observable<any>{
    return this.http.post(environment.apiUrl + 'customer/resend/otp',number);
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
}
