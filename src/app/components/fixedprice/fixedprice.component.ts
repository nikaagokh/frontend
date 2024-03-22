import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PriceObject } from '../cart/cart.component';

@Component({
  selector: 'app-fixedprice',
  templateUrl: './fixedprice.component.html',
  styleUrls: ['./fixedprice.component.css']
})
export class FixedpriceComponent {
  @Input() price:number;
  @Input() type:boolean = true;
  @Input() discount:number;
  @Input() priceObj:PriceObject;
  @Output() addToCart = new EventEmitter<void>();
  public _price:number;
  public number:number = 1;
  ngOnInit():void {
    this._price = this.price;
  }
  cart():void {
    this.addToCart.emit()
  }
  
}
