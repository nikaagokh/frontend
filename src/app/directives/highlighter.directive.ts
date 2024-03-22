import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[bg]'
})
export class HighlighterDirective {
  private els:Element;
  constructor(
    private el:ElementRef,
    private rend:Renderer2) {}

  ngOnInit():void {
    this.els = this.el.nativeElement as HTMLElement;
  }
  @HostListener('touchstart', ['$event'])
  onStart():void {
    this.rend.addClass(this.els, 'bg');
  }
  @HostListener('touchend', ['$event'])
  onEnd():void {
    this.rend.removeClass(this.els, 'bg');
  }

}
