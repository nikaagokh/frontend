import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private overlay:OverlayService,
    private httpService:HttpService
    ) {}
  public searchDesktopForm:FormControl = new FormControl('');
  public searchedInput:string ='';
  public cartNumber:number = 0;
  public favNumber:number = 0;
  public inputMaximize:boolean = true;
  public filtered:any = [];
  public drop:boolean = true;

  ngOnInit():void {
    this.httpService.getCartProducts().subscribe(console.log);
    this.httpService.cartNumber$.subscribe(val => {
      this.cartNumber = val;
    })
    this.httpService.fav$.subscribe(val => {
      this.favNumber = val.length;
    })
    
    this.searchDesktopForm.valueChanges.pipe(debounceTime(150)).subscribe(val => {
      this.searchedInput = val;
    })
    this.httpService.cart$.subscribe(val => {
      console.log(val);
    })
  }

  menuMob():void {
    this.overlay.openMenu();
  }

  menuDesktop():void {
    this.overlay.openMenuDesktop();
  }

  miniFavorites():void {
    this.overlay.openMiniFavorites();
  }

  miniCart():void {
    this.overlay.mobCart();
  }
  openSearchMob():void {
    this.overlay.openSearchMob();
  }
  openAuthentication():void {
    this.overlay.openAuth();
  }
  closeInputDesktop():void {
    this.searchDesktopForm.setValue('');
  }
}
