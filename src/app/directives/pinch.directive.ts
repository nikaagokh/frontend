import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[pinch]'
})
export class PinchDirective {
  private startX:number = 0;
  private startY:number = 0;
  private distance:number = 0;
  private imgScale:number = 0;
  constructor(
    private el:ElementRef,
    private rend:Renderer2
  ) {}

  @HostListener('touchstart', ['$event'])
  onStart(ev:TouchEvent):void {
    
    if(ev.touches.length === 2) {
      ev.preventDefault();
      this.startX = (ev.touches[0].pageX + ev.touches[1].pageX) / 2;
      this.startY = (ev.touches[0].pageY + ev.touches[1].pageY) / 2;
      this.distance = this.distanceFull(ev);
     
    }
    
    
  }
  @HostListener('touchmove', ['$event'])
  onMove(ev):void {
    
    if(ev.touches.length === 2) {
      ev.preventDefault();
      let scale;
      if(ev.scale) {
        scale = ev.scale;
        console.log(scale);
      } else {
        const deltaDistance = this.distanceFull(ev);
        scale = deltaDistance / this.distance;
        console.log(scale);
      }
      this.imgScale = Math.min(Math.max(1,scale), 4);
      
      const deltaX = (((ev.touches[0].pageX + ev.touches[1].pageX) / 2) - this.startX) * 2;
      const deltaY = (((ev.touches[0].pageY + ev.touches[1].pageY) / 2) - this.startY) * 2;

      const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${this.imgScale})`;
      this.rend.setStyle(this.el.nativeElement, 'transform', transform);
      this.rend.setStyle(this.el.nativeElement, 'z-index', 10);
      this.rend.setStyle(this.el.nativeElement, '-webkit-transform', transform);
      this.rend.setStyle(this.el.nativeElement, 'transition', 'all .1s');
    }
    
  }
  @HostListener('touchend', ['$event'])
  onEnd(ev:TouchEvent):void {
    /*
    this.rend.setStyle(this.el.nativeElement, 'transform', '');
    this.rend.setStyle(this.el.nativeElement, 'z-index', '');
    this.rend.setStyle(this.el.nativeElement, '-webkit-transform', '');
    */
  }
  distanceFull(ev:TouchEvent):number {
    return Math.hypot(ev.touches[0].pageX - ev.touches[1].pageX, ev.touches[0].pageY - ev.touches[1].pageY);
  }

}
