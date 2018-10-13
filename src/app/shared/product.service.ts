import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(){

  	return this.http.get("https://faker-api-yczfsfkfcd.now.sh/api/products");
  }

}
