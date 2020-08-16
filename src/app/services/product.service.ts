import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../commom/product';
import { ProductCategory } from '../commom/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl='http://localhost:8080/api/products';
  private categoryUrl='http://localhost:8080/api/product-category'

  constructor(private httpClient: HttpClient) { }

  //retriving the data with respect to that particular category id
  getProductList(theCategoryId:number): Observable<Product[]>{
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  //retriving the data with respect to that particular category id using pagination (page size)
  getProductListPaginate(thePage:number,thePageSize:number,theCategoryId:number): Observable<GetResponseProducts>{
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  //retrive the product category from the database
  getProductCategories():  Observable<ProductCategory[]>{

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response=>response._embedded.productCategory)
    );
  }


  //retrive the products on the keyword specified
  searchProduct(theKeyword: string):Observable<Product[]> {

    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  //search paginate
  searchProductPaginate(thePage:number,thePageSize:number,theKeyword:String): Observable<GetResponseProducts>{
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  //retrieve the product based on the id provided
  getProduct(theProductId: number): Observable<Product> {
    const productUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);

  }

}

interface GetResponseProducts{
  _embedded:{
    products:Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}
