import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[dot]'
})
export class DotsliderDirective {
  private els:Element;
  private loc:number = 0;
  private size:number = 0;
  @Input('dot') position = 0;
  constructor(
    private el:ElementRef,
    private rend:Renderer2
  ) {
    this.els = this.el.nativeElement as HTMLElement;
    this.rend.listen(window, 'resize', () => {
      this.size = this.els.firstElementChild.clientWidth;
    })
  }

  ngOnInit():void {
    this.size = (this.el.nativeElement as HTMLElement).clientWidth / 5;
  }

  ngOnChanges(changes:SimpleChanges):void {
    const pos = changes['position'];
    if(!pos?.firstChange) {
      this.loc = -(this.size* this.position) - (this.position * 32);
      console.log(this.loc);
      this.rend.setStyle(this.els, 'transform', `translateX(${this.loc}px)`)
    }
  }

}
