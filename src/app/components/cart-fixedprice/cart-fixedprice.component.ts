import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PriceObject } from '../cart/cart.component';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-cart-fixedprice',
  templateUrl: './cart-fixedprice.component.html',
  styleUrls: ['./cart-fixedprice.component.css']
})
export class CartFixedpriceComponent {
  @Input() price:PriceObject;
  constructor(private overlay:OverlayService) {}

  buy():void {
    this.overlay.openBuyOption()
  }

}
