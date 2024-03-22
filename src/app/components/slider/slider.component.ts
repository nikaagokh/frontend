import { FocusMonitor } from '@angular/cdk/a11y';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, ElementRef, Input, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { url } from '../searchdesktop/searchdesktop.component';
import { OverlayService } from 'src/app/services/overlay.service';

export type Position = {
  position:number;
  change:boolean;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  @Input() category:string;
  @Input() categoryId:number;
  @Input() productslice:Product[];
  public admin:boolean = false;
  public favClicked:boolean = false;
  public slide:Position;
  private pos:number;
  public productArray:any = [];
  public favArray:Product[] = [];
  public animate:number | undefined = undefined;
  public mobsize:boolean = true;
  @ViewChild('list') list:ElementRef<any>;
  @ViewChildren('listitem') listitem:QueryList<any>;
  private focused:boolean = false;
  public addToCartButtoActive:boolean = true;
  listenerFn = () => {};
  public url:string;
  constructor(
    private focus:FocusMonitor,
    private rend:Renderer2,
    private breakpoint:BreakpointObserver,
    private httpService:HttpService,
    private authService:AuthService,
    private overlay:OverlayService
  ) {}

  ngOnInit():void{
    this.url = url;
    this.productArray = this.productslice;
    console.log(this.productArray)
    this.httpService.getFavoritedProducts().subscribe(console.log);
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
    this.slide = {
      position:0,
      change:true
    };
    this.pos = 0;
    
  }

  previous():void {
    if(this.pos !== 0) {
      this.pos--;
      this.slide = {...this.slide, position:this.pos};
    }
  }
  next():void {
    if(this.pos < this.productArray.length - 5) {
      this.pos++;
      this.slide = {...this.slide, position:this.pos};
    }
  }
  addFavorites(item:any):void {
    if(!this.isFavorite(item)) {
      this.animate = item.id;
    } else {
      this.animate = undefined;
    }
    this.httpService.manageFavorites(item).subscribe();
    
  }
  addCart(product:Product):void {
    this.httpService.addToCart(product).subscribe();
  }
  isFavorite(item:Product):boolean {
    const index = this.favArray.find((obj) => obj.id === item.id);
    if(index) {
      return true;
    }
    else {
      return false;
    }
  }

  zoomIn(imageurl:string):void {
    console.log(imageurl)
    this.overlay.openZoom(imageurl)
  }

  changePos(val:number):void {
    console.log(val)
    this.pos = val;
  }

  oldPrice(price:number, discount:number) {
    return Math.floor(price / ((100-discount)/100));
  }



}
