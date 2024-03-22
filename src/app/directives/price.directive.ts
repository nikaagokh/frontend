import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[fixedPrice]'
})
export class PriceDirective {
  private scrolled:number = 0;
  private parent;
  constructor(
    private el:ElementRef,
    private rend:Renderer2
  ) {}
  ngOnInit():void {
    this.parent = (this.el.nativeElement as HTMLElement).parentElement;
    console.log(this.parent)
  }
  @HostListener('window:scroll', ['$event'])
  onScr(event:Event) {
    const scr = window.scrollY;
    const divide = scr - this.scrolled;
    //scr > this.scrolled
    if(divide > 10) {
      console.log(13);
      this.rend.addClass(this.parent, 'bottom');
      
    }
    else if (divide < -5){
      console.log(12);
      this.rend.removeClass(this.parent, 'bottom');
    }
    this.scrolled = scr;
  }


}
