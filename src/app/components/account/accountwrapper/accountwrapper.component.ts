import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
import { CartProduct } from 'src/app/interfaces/cart-product.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { User } from 'src/app/interfaces/user.interface';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-accountwrapper',
  templateUrl: './accountwrapper.component.html',
  styleUrls: ['./accountwrapper.component.css']
})
export class AccountwrapperComponent {
  public urls:string[] = ['about', 'password', 'favorites', 'cart'];
  public loaded:boolean = false;
  public information:any;
  public favorites:Product[];
  public cart:CartProduct;
  public user:User;
  listenerFn = () => {};
  public active:number = 0;
  public hovered:number = 0;
  public size:boolean | null;
  private focused:boolean = false;
  @ViewChildren('listitem') listitem:QueryList<any>;
  @ViewChild('list') list:ElementRef<HTMLElement>;
  private el:ElementRef;
  constructor(
    private focus:FocusMonitor,
    private rend:Renderer2,
    private overlayService:OverlayService,
    private httpService:HttpService,
    private router:Router) {}

  ngOnInit():void {
    //this.httpService.getCartProducts();
    //this.httpService.getUserInformation().subscribe(console.log)
    //this.httpService.getFavoritedProducts().subscribe(console.log)
    //this.httpService.getAccountCartProducts().subscribe(console.log)
    forkJoin({
      user: this.httpService.getUserInformation(),
      favorites: this.httpService.getFavoritedProducts(),
      cart: this.httpService.getAccountCartProducts()
    }).pipe(catchError((err) => this.handleUnauthorized(err))).subscribe(account => {
      this.loaded = true;
      this.cart = account.cart;
      this.favorites = account.favorites;
      this.user = account.user;
    })
  }
  handleUnauthorized(err:HttpErrorResponse) {
    this.router.navigate(['/'])
    return [];
  }
  logout():void {
    this.overlayService.openLogout();
    this.clicked(5);
  }
  selected(val:any) {
   
  }
  ngAfterViewInit():void {
    this.focus.monitor(this.list, true).subscribe((x:FocusOrigin) => {
     
      if(x === 'mouse' && !this.focused) {
     
        this.focused = true;
        this.listenerFn = this.rend.listen(window, 'keydown', (ev:KeyboardEvent) => {
          if(ev.key === 'ArrowDown' || 'ArrowUp') {
            this.handle(ev);
          }
          if(ev.key === 'Enter') {
            this.active = this.hovered;
            if(this.hovered === 5) {
              this.logout();
            }
          }
        })
      } else if(x === null) {
        this.focused = false;

        this.listenerFn();
      }
    })
    
  }
  handle(ev:KeyboardEvent) {
    ev.preventDefault();
    const toarr = this.listitem.toArray();
   
    if(ev.key === 'ArrowDown' &&  this.hovered === 5) {
      this.hovered = 0;
      const el = (toarr[this.hovered].nativeElement as HTMLElement);
      el.focus();
    
      
    }
    else if(ev.key === 'ArrowUp' &&  this.hovered === 0) {
      this.hovered = 5;
      const el = (toarr[this.hovered].nativeElement as HTMLElement);
      el.focus();
      
    }
    else if (ev.key === 'ArrowDown') {
      this.hovered++;
      
     
      const el = (toarr[this.hovered].nativeElement as HTMLElement);
      el.focus();
    }
    else if(ev.key === 'ArrowUp') {
      this.hovered--;
      
      const el = (toarr[this.hovered].nativeElement as HTMLElement);
      el.focus();
      
    }
  }
  clicked(val:number):void {
    this.active = val;
    this.hovered = val;
  }
}
