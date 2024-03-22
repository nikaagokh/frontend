import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { timer } from 'rxjs';

@Directive({
  selector: '[right]'
})
export class SlideRightDirective {
  @Output() wiggle = new EventEmitter<boolean>();
  private mdown:boolean = false;
  private pos1:number = 0;
  private loc:number = 0;
  private pos2:number = 0;
  private move1Y:number = 0;
  private parent:Element;
  @Input() rights:boolean = true;
  constructor(
    private el:ElementRef,
    private rend:Renderer2
  ) {}
  ngOnInit():void {
    this.parent = (this.el.nativeElement as HTMLElement).parentElement.parentElement;
    console.log(this.parent);
  }
  ngOnChanges(changes:SimpleChanges):void {
  }
  @HostListener('touchstart', ['$event'])
  onTouchStart(ev:TouchEvent) {
    this.mdown = true;
    this.pos1 = ev.changedTouches[0].clientX;
    this.loc = 0.01;
    this.move1Y = ev.changedTouches[0].clientY;
    this.rend.setStyle(this.parent, 'left', '0px');
    this.rend.removeClass(this.parent, 'wiggle-right');
    this.rend.removeClass(this.parent, 'slide-menu');
   }
  @HostListener('touchmove', ['$event'])
  onTouchMove(ev:TouchEvent) {
    
  }
  @HostListener('touchend', ['$event'])
  onTouchEnd(ev:TouchEvent) {
    this.mdown = false;
    this.pos2 = ev.changedTouches[0].clientX;
    const divide = this.pos2 - this.pos1;
    console.log(divide);
    if(divide <= 55 && this.rights) {
     
      //this.rend.setStyle(this.parent, 'left', '100%');
      this.rend.addClass(this.parent, 'slide-menu');
      this.wiggle.emit(false);
      timer(200).subscribe(_ => {
        this.rend.removeClass(this.parent, 'slide-menu');
      })
      return;
    } else if (divide < 20 && this.rights){
      //this.rend.setStyle(this.parent, `left`, `0px`);
      this.rend.addClass(this.parent, 'wiggle-right');

    }  

  }

}
