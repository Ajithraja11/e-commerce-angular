import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkOutFormGroup:FormGroup;
  totalPrice:number=0;
  totalQuantity:number=0;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.checkOutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']    
      }),
      shippingAddress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']

      }),
      billingAddress:this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']

      }),
      creditCard:this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:['']

      })
    });
  }

  onSubmit(){
    console.log("Form Submitted");
    console.log(this.checkOutFormGroup.get('customer').value.firstName);
  }

  copyShippingAddressToBillingAddress(event)
  {
    if(event.target.checked){
      this.checkOutFormGroup.controls.billingAddress.setValue(this.checkOutFormGroup.controls.shippingAddress.value);
    }
    else{
      this.checkOutFormGroup.controls.billingAddress.reset();
    }
  }

}
