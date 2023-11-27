import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiBaseUrl=environment.apiBaseUrl

  constructor(private http : HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(`${this.apiBaseUrl}/api/product/all`)
  }
  addProduct(product:Product){
    return this.http.post<Product>(`${this.apiBaseUrl}/api/product/add`,product)
  }

}
