import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, Input, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { url } from '../searchdesktop/searchdesktop.component';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-similars',
  templateUrl: './similars.component.html',
  styleUrls: ['./similars.component.css']
})
export class SimilarsComponent {
  public slide:any;
  private pos:number;
  public favArray:any = [];
  private focused:boolean = false;
  public url:string;
  listenerFn = () => {};
  @ViewChild('list') list:ElementRef;
  @ViewChildren('listitem') listitem:QueryList<any>;
  @Input() category:string = '';
  @Input() products:any = [];
  public animate:number | undefined = undefined;
  constructor(
    private focus:FocusMonitor,
    private rend:Renderer2,
    private httpService:HttpService,
    private overlay:OverlayService
  ) {}

  ngOnInit():void{
    console.log(this.products)
    this.httpService.getFavoritedProducts().subscribe();
    this.httpService.fav$.subscribe(x => {
      this.favArray = x;
    })
    this.url = url;
    this.slide = {
      position:0,
      change:true
    };
    this.pos = 0;
  }
  
  changePos(val:number):void {
    this.pos = val;
  }
  previous():void {
    if(this.pos !== 0) {
      this.pos--;
      this.slide = {...this.slide, position:this.pos};
    }
  }
  next():void {
    
    if(this.pos < this.products.length - 2) {
      
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
  oldPrice(price:number, discount:number) {
    return Math.floor(price / ((100-discount)/100))
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
  addToCart(item:any) {
    this.httpService.addToCart(item).subscribe()
  }
}
