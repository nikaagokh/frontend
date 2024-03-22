import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PriceObject } from '../cart/cart.component';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent {
  @Input() priceObj:PriceObject;
  @Input() type:number = 0;
  @Output() addToCart = new EventEmitter<void>();
  public number:number = 1;
  public cartArray:any = [];
  public total:number = 0;

  addQuantity():void {
    this.number++;
  }
  reduceQuantity():void {
    if(this.number !== 0) {
      this.number--;
    }
  }
  addCart() {
    this.addToCart.next();
  }
}
