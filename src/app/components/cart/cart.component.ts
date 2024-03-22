import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { CartProduct } from 'src/app/interfaces/cart-product.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { url } from '../searchdesktop/searchdesktop.component';

export type PriceObject = {
  newPrice:number;
  oldPrice:number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  public cart:CartProduct;
  public empty:boolean = true;
  public visible:boolean = false;
  public cartArray:Product[] = [];
  public newPrice:number;
  public oldPrice:number;
  public priceObject:PriceObject;
  public loaded:boolean = false;
  public auth:boolean = false;
  public url:string;
  constructor(
    private httpService:HttpService,
    private breakpoint:BreakpointObserver,
    private authService:AuthService) {}
  ngOnInit():void {
    this.url = url;
    this.authService.isAuthenticated().subscribe(x => {
      this.auth = x;
    });
   //this.auth = this.authService.isAuthed();
   //this.httpService.getCartProducts().subscribe();
   this.httpService.cart$.subscribe(x => {
    this.cartArray = x.products;
    const {newPrice, oldPrice} = x.products.reduce((acc, item) => {
      acc.newPrice += item.price * item.quantity;
      acc.oldPrice += ((item.price / ((100-item.discount)/100))) * item.quantity;
      return acc;
    }, {newPrice:0, oldPrice:0})
    this.newPrice = newPrice;
    this.oldPrice = Math.floor(oldPrice);
    this.priceObject = {newPrice:this.newPrice, oldPrice:this.oldPrice};
    
    this.loaded = true;
   })
  }
  hov(val:number):void {
    this.visible = true;
  }

}
