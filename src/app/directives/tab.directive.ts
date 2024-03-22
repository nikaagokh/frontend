import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[tab]'
})
export class TabDirective {

  private pos1:number = 0;
  private pos2:number = 0;
  private posy:number = 0;
  private mdown:boolean = false;
  @Output() slide = new EventEmitter<boolean>();
  constructor(private el:ElementRef) {}

  @HostListener('touchstart', ['$event'])
  onStart(ev:TouchEvent) {
    console.log(12);
    this.pos1 = ev.changedTouches[0].pageX;
    this.posy = ev.changedTouches[0].pageY;
    this.mdown = true;
  }
  @HostListener('touchmove', ['$event'])
  onMove(ev:TouchEvent) {
    const y = Math.abs(this.posy - ev.changedTouches[0].pageY);
    const x = Math.abs(this.pos1 - ev.changedTouches[0].pageX);
    console.log(y);
    if(this.mdown &&  x > 10) {
      ev.preventDefault();
    }
  }
  @HostListener('touchend', ['$event'])
  onEnd(ev:TouchEvent) {
    console.log(14);
    this.mdown = false;
    this.pos2 = ev.changedTouches[0].pageX;
    const divide = this.pos2 - this.pos1;
    if(divide < -55) {
      this.slide.emit(true);
    }
    else if(divide > 55) {
      this.slide.emit(false);
    }
  }

}
