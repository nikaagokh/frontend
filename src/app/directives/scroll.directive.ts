import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {
  private els:HTMLElement;
  constructor(
    private el:ElementRef,
    private rend:Renderer2){
      this.els = this.el.nativeElement as HTMLElement;
    }
  observer:IntersectionObserver;
  ngOnInit():void {
   
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
            this.rend.addClass(this.el.nativeElement, 'c-animate');
            this.observer.unobserve(this.el.nativeElement);
          }
        })
      },
      {
        threshold:0.4,
      }
    );
    this.observer.observe(this.el.nativeElement);
    /*const animation = this.els.getAnimations().forEach((x:CSSAnimation) => {
      x.finished.then(() => this.els.remove())
    })
    */
  }

}
