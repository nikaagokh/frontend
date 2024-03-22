import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { PriceObject } from '../cart/cart.component';

@Component({
  selector: 'app-price-cart',
  templateUrl: './price-cart.component.html',
  styleUrls: ['./price-cart.component.css']
})
export class PriceCartComponent {
  public number:number = 0;
  constructor(private overlay:OverlayService) {}
  public cartArray:Product[] = [];
  public total:number = 0;
  public discount:number = 0;
  @Input() price:PriceObject;
  ngOnInit() {
    
  }

  buy():void {
    console.log(123)
    this.overlay.openBuyOption()
  }
  
}

