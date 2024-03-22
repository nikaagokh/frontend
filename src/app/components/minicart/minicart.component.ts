import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { url } from '../searchdesktop/searchdesktop.component';

@Component({
  selector: 'app-minicart',
  templateUrl: './minicart.component.html',
  styleUrls: ['./minicart.component.css']
})
export class MinicartComponent {
  private close:Subject<void> = new Subject<void>();
  public close$ = this.close.asObservable();
  private navigate = new Subject<boolean>();
  public navigate$ = this.navigate.asObservable();
  public cartArray:Product[] = [];
  public newPrice:number;
  public oldPrice:number;
  public url:string;
  @ViewChild('minicart', {read:ElementRef, static:true})
  private el:ElementRef;
  constructor(private httpService:HttpService, private rend:Renderer2) {}
  ngOnInit():void {
    this.url = url
    const parent = (this.el.nativeElement as HTMLElement).parentElement.parentElement;
    this.rend.setStyle(parent, 'max-height', 'unset');
    this.httpService.getCartProducts().subscribe();
    this.httpService.cart$.subscribe(x => {
      this.cartArray = x.products;
      const {newPrice, oldPrice} = x.products.reduce((acc, item) => {
        acc.newPrice += item.price * item.quantity;
        acc.oldPrice += ((item.price / ((100-item.discount)/100))) * item.quantity;
        //(item.price * item.quantity) * (item.discount / 100);
        return acc;
      }, {newPrice:0, oldPrice:0})
      this.newPrice = newPrice;
      this.oldPrice = oldPrice;
    })
    
  }
  closed():void {
    this.close.next();
  }
  removeItem(item:Product):void {
    this.httpService.removeFromCart(item,true).subscribe();
  }
  detailedCart():void {
    this.navigate.next(true);
  }
  routerLink():void {
    this.navigate.next(false)
  }
}
