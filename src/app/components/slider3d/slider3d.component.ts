import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { Component, ElementRef, Input, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-slider3d',
  templateUrl: './slider3d.component.html',
  styleUrls: ['./slider3d.component.css']
})
export class Slider3dComponent {
  @Input() comments;
  public middle:number = 1;
  public arrSlider:any;
  public carouselArray:any = [1,2,3,4,5];
  @ViewChildren('carouselitem') 
  private el:QueryList<any>;
  @ViewChild('list')
  private list:ElementRef;
  private focused:boolean = false;
  listenerFn = () => {};
  public position:any;
  public pos:string;
  public starArray:any = [0,1,2,3,4];
  public rating:number = 0;
  constructor(
    private overlay:OverlayService, 
    private rend:Renderer2,
    private focus:FocusMonitor,
    private httpService:HttpService) {}
  ngOnInit():void {
    
    this.arrSlider = {
      arr:this.carouselArray,
      change:false,
    }
    
  }
  activated(index:number):void {
    console.log(index)
    const arr = this.el.toArray();
    arr.map((obj) => {
      this.rend.removeClass(obj.nativeElement, 'activated-fromleft');
      this.rend.removeClass(obj.nativeElement, 'activated-fromright');
      this.rend.removeClass(obj.nativeElement, 'middled-fromleft');
      this.rend.removeClass(obj.nativeElement, 'middled-fromright');
    })

      if(this.middle > index) {
        this.rend.addClass(arr[index].nativeElement, 'activated-fromleft');
        this.rend.addClass(arr[this.middle].nativeElement, 'middled-fromleft');
        const lastel = this.comments.pop();
        this.comments.unshift(lastel);
        
      } else {
        this.rend.addClass(arr[index].nativeElement, 'activated-fromright');
        this.rend.addClass(arr[this.middle].nativeElement, 'middled-fromright');
        const firstel = this.comments.shift();
        this.comments.push(firstel)
      }
    
    

  }
  /*
  getClass(index:number):string {
    if(index === 0) {
      return 'back-left'
    } else if(index === 1) {
      return 'middle-left'
    } else if(index === 2) {
      return 'active'
    } else if(index === 3) {
      return 'middle-right'
    } else {
      return 'back-right'
    }
  }
  */
  getClass(index:number):string {
    if(index === 0) {
      return 'middle-left';
    } else if(index === 1) {
      return 'active';
    } else {
      return 'middle-right'
    }
  }
  openReviews():void {
    //this.overlay.openReview();
  }
  slided(value:string):void {
    if(value === 'next') {
      this.activated(2);
    } else {
      this.activated(0);
    }
  }
  ngAfterViewInit():void {

    this.focus.monitor(this.list, true).subscribe((x:FocusOrigin) => {
        
      if(x === 'mouse' && !this.focused) {
       
        this.focused = true;
        this.listenerFn = this.rend.listen(window, 'keydown', (ev:KeyboardEvent) => {
          if(ev.key === 'ArrowLeft' || 'ArrowRight') {
            
            this.handle(ev);
          }
          if(ev.key === 'Enter') {
            //routerlink
            //this.listenerFn();
          }
        })
      } else if(x === null){
        
        this.listenerFn();
        this.focused = false;
      }
    })
  }
handle(ev:KeyboardEvent) {
  ev.preventDefault();
  const arr = this.el.toArray();
  if (ev.key === 'ArrowRight') {
    this.next();
  }
  else if(ev.key === 'ArrowLeft') {
    this.prev();
  }
}
prev():void {
  this.pos = 'left';
  this.position = {...this.position, pos:this.pos};
}
next():void {
  this.pos = 'right';
  this.position = {...this.position, pos:this.pos};
}
stars(val:number) {
  this.rating = val;
}
showIcon(val:number, rate:number):string {
  if(rate >= val) {
    return 'star';
  }
  else {
    return 'star_border'
  }
}
}
