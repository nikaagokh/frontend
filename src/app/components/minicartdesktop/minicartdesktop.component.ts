import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { url } from '../searchdesktop/searchdesktop.component';

@Component({
  selector: 'app-minicartdesktop',
  templateUrl: './minicartdesktop.component.html',
  styleUrls: ['./minicartdesktop.component.css']
})
export class MinicartdesktopComponent {
  private close:Subject<void> = new Subject<void>();
  public close$ = this.close.asObservable();
  private navigate = new Subject<void>();
  public navigate$ = this.navigate.asObservable();
  public cartArray:any = [];
  public newPrice:number;
  public oldPrice:number;
  public loaded:boolean = false;
  constructor(private httpService:HttpService) {}
  private destroy$ = new Subject<void>();
  public url:string;
  ngOnInit():void {
    this.url = url;
    this.httpService.getCartProducts();
    this.httpService.cart$.pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.cartArray = val.products;
      console.log(this.cartArray)
      const {newPrice, oldPrice} = val.products.reduce((acc, item) => {
        acc.newPrice += item.price * item.quantity;
        acc.oldPrice += ((item.price / ((100-item.discount)/100))) * item.quantity;
        return acc;
      }, {newPrice:0, oldPrice:0})
      this.newPrice = newPrice;
      this.oldPrice = Math.floor(oldPrice);
    })
    /*
    this.serv.cart$.subscribe((val:Array<any>) => {
      this.cartArray = val;
      this.total = Math.floor(val.reduce((acc, curr) => acc + curr.total, 0));
      
    })
    */
  }
  closed():void {
    this.close.next();
  }
  removeItem(item:any):void {
    this.httpService.removeFromCart(item, true).subscribe()
  }
  detailedCart():void {
    this.navigate.next();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
