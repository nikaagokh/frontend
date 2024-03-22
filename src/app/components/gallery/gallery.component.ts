import { Component, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Position } from '../slider/slider.component';import { FocusMonitor } from '@angular/cdk/a11y';
import { BreakpointObserver } from '@angular/cdk/layout';
import { OverlayService } from 'src/app/services/overlay.service';
import { HttpService } from 'src/app/services/http.service';
import { Product } from 'src/app/interfaces/product.interface';
import { url } from '../searchdesktop/searchdesktop.component';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  public maximize:boolean = false;
  public carousel:number = 0;
  public slide:Position;
  public galleryArray:any = [];
  public galleryActive = 0;
  public favClicked:boolean = false;
  private focused:boolean = false;
  public url:string;
  @Output() favorited = new EventEmitter<void>();
  public favArray:any = [];
  public animate:number | undefined = undefined;
  listenerFn = () => {};
  @Input() images:any;
  @Input() product:any;
  @ViewChild('list') list:ElementRef;
  @ViewChildren('listitem') listitem:QueryList<any>;
  constructor(
    private focus:FocusMonitor,
    private rend:Renderer2,
    private breakpoint:BreakpointObserver,
    private overlay:OverlayService,
    private httpService:HttpService
  ) {}

  ngOnInit():void {
    console.log(this.galleryArray)
    this.httpService.getFavoritedProducts().subscribe();
    this.httpService.fav$.subscribe(x => {
      this.favArray = x;
    })
    this.favClicked = this.product.isFavorited;
    this.url = url;
    this.slide = {
      position:0,
      change:true
    };
    this.carousel = 0;
  }

  zoomImage(val:any):void {
    const images = this.images.map(img => img.path);
    this.overlay.openZoom(images)
    //this.overlay.openZoom(val.path)
  }
  changePos(val:number) {
    this.carousel = val;
  }
  changeArrows(id:number) {
    this.carousel = id;
    this.slide = {...this.slide, position:this.carousel};
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
   addFavorites(item:any):void {
      if(!this.isFavorite(item)) {
        this.animate = item.id;
      } else {
        this.animate = undefined;
      }
      this.httpService.manageFavorites(item).subscribe();
      
    }

    openEdit():void {
      this.overlay.editProduct(this.product.id)
    }
  
}
