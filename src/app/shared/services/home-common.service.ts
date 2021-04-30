import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeCommonService {

  constructor(private http:HttpClient){
    
  }
  getBanner():Observable<any>{

  return this.http.get(environment.apiUrl + 'customer/banner'); 
  }
getCategories():Observable<any>{
  return this.http.get(environment.apiUrl + 'categories');
}
getSubBanner():Observable<any>{
  return this.http.get(environment.apiUrl + 'subbanner');
}
updateCustomerAddress(id,address):Observable<any>{
  return this.http.put(environment.apiUrl + 'customer/address/' + id,address);
}
getProducts():Observable<any>{
  return this.http.get(environment.apiUrl + 'customer/products');
}

getBrands():Observable<any>{
  return this.http.get(environment.apiUrl + 'customer/brands');
}
}
