import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/commom/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/commom/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[];
  currentCategoryId:number=1;
  previousCategoryId: number=1;
  searchMode:boolean=false;
  
  //pagination properties
  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;
  
  previousKeyWord:string=null;

  constructor(private productService:ProductService,private route:ActivatedRoute,private cartService:CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
    
  }

  listProducts() {

    this.searchMode=this.route.snapshot.paramMap.has('Keyword');
    if(this.searchMode)
    {
      this.handleSearchProducts();
    }
    else{
    this.handleListProducts();
  }
  }
 

  handleListProducts(){
    
    const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id'); //returns true if there is an id in the parameter

    if(hasCategoryId)
    {
      //get the "id" and convert it to a number
      this.currentCategoryId=+this.route.snapshot.paramMap.get("id");
    }
    else{
      //category is not passed then set it to 1
      this.currentCategoryId=1;
    }
    //check if the previous category is same as current category else reset to 1
    if(this.previousCategoryId!=this.currentCategoryId)
    {
      this.thePageNumber=1;
    }

    this.previousCategoryId=this.currentCategoryId;


    //get the product for the category id under consideration
    this.productService.getProductListPaginate(this.thePageNumber-1,this.thePageSize,this.currentCategoryId)
                                              .subscribe(this.processResult());
  }

  processResult() {
    return data=>{
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    }
  }

  handleSearchProducts() {
    const theKeyword:string=this.route.snapshot.paramMap.get('Keyword');

    //if we have a different keyword than the previous one set pagenumber to 1
    if(this.previousKeyWord!=theKeyword)
    {
      this.thePageNumber=1;
    }

    this.previousKeyWord=theKeyword;

    this.productService.searchProductPaginate(this.thePageNumber-1,this.thePageSize,theKeyword)
                                              .subscribe(this.processResult());
  }

  updatePageSize(pageSize:number)
  {
    this.thePageSize=pageSize;
    this.thePageNumber=1;
    this.listProducts();
  }

  //add the data to cart when add to cart is clicked
  addToCart(theProduct:Product){
    const theCartItem=new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

}






