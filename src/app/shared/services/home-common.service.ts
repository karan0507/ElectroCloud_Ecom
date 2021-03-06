import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {map, publishReplay, refCount, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeCommonService {

  constructor(private http:HttpClient){
    
  }
  getBanner():Observable<any>{

  return this.http.get(environment.apiUrl + 'customer/banner').pipe(publishReplay(),refCount()); 
  }
getCategory():Observable<any>{
  return this.http.get(environment.apiUrl + 'customer/categories'+'?size=8&basic=true').pipe(shareReplay());
}
getCategories():Observable<any>{
  return this.http.get(environment.apiUrl + 'customer/categories'+'?basic=true').pipe(shareReplay());
}
getSubBanner():Observable<any>{
  return this.http.get(environment.apiUrl + 'subbanner');
}
updateCustomerAddress(id,address):Observable<any>{
  return this.http.put(environment.apiUrl + 'customer/address/' + id,address);
}
addCustomerAddress(addr):Observable<any>{
  return this.http.post(environment.apiUrl + 'customer/address', addr);
}
// ,    pageChange?+ '&page=' + pageChange
getProducts(slug?, currentPage? ):Observable<any>{
  return this.http.get(environment.apiUrl + 'customer/products' + '?slug=' + slug  + '&page=' + currentPage);
}
getSearchProducts(query):Observable<any>{
return this.http.get(environment.apiUrl + '/customer/products' + '?search=true&query=' + query)
}
getLatestProducts():Observable<any>{
  return this.http.get(environment.apiUrl + 'customer/products' + '?page=0&latest=true&size=5');
}

getBrands():Observable<any>{
  return this.http.get(environment.apiUrl + 'customer/brands');
}
getSingleProduct(slug):Observable<any>{
  return this.http.get(environment.apiUrl + 'customer/product/' + slug);
}

}
