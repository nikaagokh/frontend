import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[head]'
})
export class HeaderDirective {
  private scrolled:number = 0;
  constructor(
    private el:ElementRef,
    private rend:Renderer2
  ) {}

  @HostListener('window:scroll', ['$event'])
  onScr(event:Event) {
    const scr = window.scrollY;
    const divide = scr - this.scrolled;
    //scr > this.scrolled
    if(divide > 15) {
      this.rend.addClass(this.el.nativeElement, 'fixed-scrolled');
    }
    else if(divide < - 10){
      this.rend.removeClass(this.el.nativeElement, 'fixed-scrolled');
    }
    this.scrolled = scr;
  }

}
