import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[hov]'
})
export class HoverDirective {
  @Output() hovered = new EventEmitter<number>();
  @Input('hov') ind:number;
  constructor(
    private el:ElementRef
  ) {}
  @HostListener('mouseenter', ['$event'])
  onHover(ev:Event) {
    this.hovered.emit(this.ind);
  }

}
