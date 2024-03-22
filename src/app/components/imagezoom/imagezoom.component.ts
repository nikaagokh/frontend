import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { url } from '../searchdesktop/searchdesktop.component';


@Component({
  selector: 'app-imagezoom',
  templateUrl: './imagezoom.component.html',
  styleUrls: ['./imagezoom.component.css']
})
export class ImagezoomComponent {
  private fullScreen = new Subject<boolean>();
  public fullScreen$ = this.fullScreen.asObservable();
  private closed = new Subject<void>();
  public closed$ = this.closed.asObservable();
  public fullscreen:boolean = true;
  public active:number = 0;
  public imageArray:any = [];
  private fullzoom:boolean = false;
  public url:string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private rend:Renderer2) {
      if(typeof this.data.image === 'string') {
        this.imageArray = [this.data.image];
      } else {
        this.imageArray = this.data.image;
      }
      
    }
  listenerFn = () => {};
  listenerFn2 = () => {}
  public zoom:number = 1.1;
  private img:HTMLElement;
  @ViewChild('img', {read:ElementRef, static:true})
  private el:ElementRef;
  ngOnInit():void {
    this.url = url;
    console.log(this.imageArray)
    this.img = this.el.nativeElement as HTMLElement;
    this.listenerFn2 = this.rend.listen(window, 'keydown', (ev:KeyboardEvent) => {
      
      if(ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
        this.handle(ev);
      } 
      if(ev.key === '+') {
        this.zoomIn();
      }
      if(ev.key === '-') {
        this.zoomOut();
      }
    })
  }
  handle(ev:KeyboardEvent):void {
    if(ev.key === 'ArrowLeft') {
      this.left();
    } else {
      this.right();
    }
  }
  mouseMove(e:MouseEvent):void {
   
    this.img.style.setProperty('--x',(100*e.offsetX/this.img.offsetWidth)+'%');
    this.img.style.setProperty('--y',(100*e.offsetY/this.img.offsetHeight)+'%');
    this.img.style.setProperty('--zoom', `${this.zoom}`); 
    if(this.img.classList.contains('wiggle')) {
      this.rend.removeClass(this.img, 'wiggle');
    }
  }
  zoomIn():void {
    if(this.zoom < 4) {
      this.zoom+=0.1
      this.img.style.setProperty('--zoom', `${this.zoom}`);
      if(this.img.classList.contains('wiggle')) {
        this.rend.removeClass(this.img, 'wiggle');
      }
    } else {
      this.rend.addClass(this.img, 'wiggle');
    }
    
  }
  zoomOut():void {
    if(this.zoom > 1) {
      this.zoom-=0.1
      this.img.style.setProperty('--zoom', `${this.zoom}`);
      if(this.img.classList.contains('wiggle')) {
        this.rend.removeClass(this.img, 'wiggle');
      }
    } else {
      this.rend.addClass(this.img, 'wiggle');
    }
  }
  mouseLeave(e:MouseEvent):void {
    
    //img.style.setProperty('--zoom', `${this.zoom}`);
    this.img.style.setProperty('--x', '50%');
    this.img.style.setProperty('--y', '50%');
    this.listenerFn();
    if(this.img.classList.contains('wiggle')) {
      this.rend.removeClass(this.img, 'wiggle');
    }
  }
  mouseEnter(e:MouseEvent):void {
    
    this.listenerFn = this.rend.listen(this.img, 'wheel', (ev:WheelEvent) => {
      ev.preventDefault();
      const wh = (ev.deltaY * -0.001);
      
     
     
      if((this.zoom > 1.09 && this.zoom < 3.99) || (this.zoom <=1.09 && wh > 0  || this.zoom >=3.99 && wh < 0 )) {
        this.zoom+=wh;
        this.img.style.setProperty('--zoom', `${this.zoom}`);
        
        if(this.img.classList.contains('wiggle')) {
          this.rend.removeClass(this.img, 'wiggle');
        }
      }
      else {
        this.rend.addClass(this.img, 'wiggle');
      }
    })
  }
  dblClick(val:MouseEvent):void {
    if(this.fullzoom || this.zoom >= 3) {
      this.zoom = 1;
    } else {
      this.zoom = 4;
    }
    this.img.style.setProperty('--zoom', `${this.zoom}`);
    this.fullzoom = !this.fullzoom;
  }
  full():void {
    this.fullScreen.next(true);
    this.fullscreen = false;
  }
  rotate():void {
    
  }
  close():void {
    this.closed.next();
  }
  min():void {
    this.fullScreen.next(false);
    this.fullscreen = true;
  }
  left():void {
    if(this.active !== 0) {
      this.active--;
    } else {
      this.active = this.imageArray.length - 1;
    }
  }
  right():void {
    if(this.active < this.imageArray.length - 1) {
      this.active++;
    } else {
      this.active = 0;
    }
  }
  ngOnDestroy():void {
    this.listenerFn2();
    
  }
}
