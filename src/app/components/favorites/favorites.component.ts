import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { url } from '../searchdesktop/searchdesktop.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  @Input() favorites:Product[];
  public auth;
  public loaded:boolean = false;
  public visible:boolean = false;
  public mobsize:boolean = false;
  public url:string;
  constructor(
    private httpService:HttpService,
    private breakpoint:BreakpointObserver,
    private authService:AuthService) {}
  ngOnInit():void {
    this.url = url;
    this.authService.isAuthenticated().subscribe(x => {
      console.log(x)
      this.auth = x;
    });
    this.httpService.fav$.subscribe(x => {
      this.favorites =x;
      this.loaded = true
    })
    this.breakpoint.observe(['(min-width:992px)']).subscribe((state:BreakpointState) => {
      if(state.matches) {
        this.mobsize = false;
      } else {
        this.mobsize = true;
      }
    })
  }
  hov(val:number):void {
    this.visible = true;
  }
  removeItem(product:Product) {
    this.httpService.manageFavorites(product).subscribe();
  }
}
