import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appFlowslider]'
})
export class FlowsliderDirective {
  @Output() slided = new EventEmitter<string>();
  private pos1:number = 0;
  private pos2:number = 0;
  constructor(
    private el:ElementRef,
  ) {}

  @HostListener('touchstart', ['$event'])
  onStart(ev:TouchEvent):void {
    this.pos1 = ev.changedTouches[0].pageX;
  }
  @HostListener('touchmove', ['$event'])
  onMove(ev:TouchEvent):void {

  }
  @HostListener('touchend', ['$event'])
  onEnd(ev:TouchEvent):void {
    this.pos2 = ev.changedTouches[0].pageX;
    const divide = this.pos2 - this.pos1;
    if(divide < -50) {
        this.slided.emit('next');
      } else if(divide > 50) {
        this.slided.emit('prev');
      }
      
   
  }

}
