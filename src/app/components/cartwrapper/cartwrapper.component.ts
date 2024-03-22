import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { url } from '../searchdesktop/searchdesktop.component';

@Component({
  selector: 'app-cartwrapper',
  templateUrl: './cartwrapper.component.html',
  styleUrls: ['./cartwrapper.component.css']
})
export class CartwrapperComponent {
  public number:number = 0;
  public cartArray:Product[] = [];
  public total:number = 0;
  public discount:number = 0;
  public url:string;
  constructor(
    private httpService:HttpService,
    private overlay:OverlayService) {}
  minus(product:Product):void {
    this.httpService.removeFromCart(product, false).subscribe();
  }
  plus(product:Product):void {
    this.httpService.addToCart(product).subscribe();
  }
  ngOnInit():void {
    this.url = url;
    this.httpService.getCartProducts().subscribe();
    this.httpService.cart$.subscribe(x => {
      this.cartArray = x.products;
    })
    
  }
  removeItem(product:Product) {
    this.httpService.removeFromCart(product, true).subscribe();
  }
  oldPrice(price:number, discount:number) {
    return Math.floor((price / ((100-discount)/100)));
  }
  zoomImage(img:string) {
    this.overlay.openZoom(img);
  }
  
}
