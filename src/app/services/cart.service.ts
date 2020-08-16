import { Injectable } from '@angular/core';
import { CartItem } from '../commom/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  cartItem: CartItem[]=[];
  //subject is sub-class of observable and also it is used to publish events.
  totalPrice:Subject<number>=new Subject<number>();
  totalQuantity:Subject<number>=new Subject<number>();

  constructor() { }

  addToCart(thecartItem:CartItem)
  {
    //check is we already have that item on the cart
    let alreadyExistsInCart:boolean=false;
    let existingCartItem:CartItem=undefined;

    if(this.cartItem.length>0)
    {
    
      //find the item in the cart based on the id
      /*
      for(let temp of this.cartItem)
      {
        if(temp.id==thecartItem.id)
        {
          existingCartItem=temp;
          break;
        }
      }
      */
      
      existingCartItem=this.cartItem.find(temp=>temp.id==thecartItem.id);

      alreadyExistsInCart=(existingCartItem!=undefined);
   }
   if(alreadyExistsInCart)
   {
     //increment the quantity
     existingCartItem.quantity++;
   }
   else{
     //add the item to array
     this.cartItem.push(thecartItem);
   }
   this.computeCartTotals();

  }

  decrementQuantity(theCartItem: CartItem) {
   theCartItem.quantity--;
   if(theCartItem.quantity===0)
   {
     this.remove(theCartItem);
   }
   else{
     this.computeCartTotals();
   }
  }
  remove(theCartItem: CartItem) {
    const itemIndex=this.cartItem.findIndex(temp=>temp.id==temp.id);
    if(itemIndex>=0)
    {
      this.cartItem.splice(itemIndex,1);
      this.computeCartTotals();
    }
  }

  computeCartTotals() {
    let totalPrice:number=0;
    let totalQuantity:number=0;

    for(let temp of this.cartItem)
    {
      totalPrice+=temp.quantity*temp.unitPrice;
      totalQuantity+=temp.quantity;
    }

    //publish the value-subscribers will receive the new data
    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    

  }
}
