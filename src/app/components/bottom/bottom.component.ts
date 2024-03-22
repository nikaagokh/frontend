import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.css']
})
export class BottomComponent {
  private activated:number = 1;
  public cartNumber:number = 0;
  constructor(
    private httpService:HttpService,
    private overlayService:OverlayService) {}

  ngOnInit():void {
    this.httpService.getCartProducts().subscribe();
    this.httpService.cart$.subscribe(x => {
      this.cartNumber = x.products?.reduce((acc, curr) => acc + curr.quantity, 0);
    })
  }
  routerLink():void {
    this.overlayService.routerLink()
  }
  menuOpen():void {
    this.overlayService.openMenu();
  }
  searchOpen():void {
    this.overlayService.openSearchMob();
  }
  cartOpen():void {
    this.overlayService.mobCart();
  }
  authOpen():void {
    this.overlayService.openAuth();
  }
  favOpen():void {
    this.overlayService.openMiniFavorites();
  }
}
