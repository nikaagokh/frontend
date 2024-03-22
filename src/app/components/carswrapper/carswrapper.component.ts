import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { url } from '../searchdesktop/searchdesktop.component';


@Component({
  selector: 'app-carswrapper',
  templateUrl: './carswrapper.component.html',
  styleUrls: ['./carswrapper.component.css']
})
export class CarswrapperComponent {
  @Input() products:any = [];
  public admin:boolean = false;
  public view:boolean = false;
  public mobsize:boolean = true;
  public favArray:any = [];
  public animate:number | undefined = undefined;
  public url:string;
  constructor(
    private overlay:OverlayService,
    private breakpoint:BreakpointObserver,
    private httpService:HttpService) {}
  ngOnInit():void {
    this.url = url;
    this.httpService.getFavoritedProducts().subscribe();
    this.httpService.fav$.subscribe(x => {
      this.favArray = x;
    })
    this.breakpoint.observe(['(min-width:992px)']).subscribe((state:BreakpointState) => {
      if(state.matches) {
        this.mobsize = false;
      } else {
        this.mobsize = true;
      }
    })
   
  }
 
  addFavorite(item:any) {
    if(!this.isFavorite(item)) {
      this.animate = item.id;
    } else {
      this.animate = undefined;
    }
    this.httpService.manageFavorites(item).subscribe();
    
  }
  isFavorite(item:any):boolean {
    const index = this.favArray.find((obj) => obj.id === item.id);
    if(index) {
      return true;
    }
    else {
      return false;
    }
    
  }
  categories(val:string):void {
    if(val === 'price') {
      this.products = this.products.sort((a,b) => {
        return a.price - b.price
      })
    } else if(val === 'alpha') {
      this.sortByName();
    }
  }

  zoomIn(imagePath:string):void {
    this.overlay.openZoom(imagePath);
  }
  addCart(item:any):void {
    this.httpService.addToCart(item).subscribe();
  }
  sortByName():void {
    /*
    this.products = this.products.sort((a,b) => {
      //let fa = a.title.toLowerCase();
      //let fb = b.title.toLowerCase();
      if(fa < fb) {
        return -1;
      } 
      if(fa > fb) {
        return 1
      }
      return 0;
    })
    console.log(this.products)
    */
  }
  edit(s) {

  }

  oldPrice(price:number, discount:number) {
    return Math.floor(price / ((100-discount)/100));
  }
}
