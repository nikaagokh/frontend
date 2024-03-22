import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[touch]'
})
export class TouchDirective {
  private pos1!:number;
  private pos2!:number;
  private loc!:number;
  private mdown:boolean = false;
  private els:HTMLElement;
  private parent!:HTMLElement | null;
  private middle!:number;
  private max!:number;
  private state:string = '';
  @Output() closed = new EventEmitter<void>();
  constructor(
    private el:ElementRef,
    private rend:Renderer2) {
      this.els = this.el.nativeElement as HTMLElement;
    }

  ngOnInit():void {
    this.parent = this.els.parentElement;
  }
  
  @HostListener('touchstart', ['$event'])
  onTouchStart(ev:TouchEvent) {
    this.mdown = true;
    this.pos1 = innerHeight - ev.changedTouches[0].pageY;
    console.log(this.pos1);
    this.loc = this.pos1;
    console.log(this.loc);
    this.middle = (innerHeight * 50)/100;
    this.max = (innerHeight * 80)/100;
   
  }
  @HostListener('touchmove', ['$event'])
  onTouchMove(ev:TouchEvent) {
    
    if(this.mdown) {
      console.log(ev)
      ev.preventDefault();
      const move = ev.changedTouches[0].pageY;
      this.loc = innerHeight - move;
      console.log(move);
      console.log(this.loc);
      this.rend.setStyle(this.parent, 'height', `${this.loc}px`)
    }
  }
  @HostListener('touchend', ['$event'])
  onTouchEnd(ev:TouchEvent) {
    const moved = (this.max - this.middle)/2;
    this.pos2 = innerHeight - ev.changedTouches[0].pageY;
    const div = this.pos2 - this.pos1;
    console.log(this.pos2)
    console.log(div);
    console.log(this.loc);
    if(this.state === 'max') {
      if(moved > div) {
        this.rend.setStyle(this.parent, 'height', `${this.middle}px`)
        this.state = 'middle';
        return;
      } else if ( moved < div) {
        this.closed.emit();
        this.state = 'below';
        return;
      }
    }
    else if(this.state !=='max') {
      if(div > 10) {
        this.rend.setStyle(this.parent, 'height', `${this.max}px`);
        this.state = 'max';
        return;
      }
      else if(div < -10) {
        this.closed.emit();
        this.state = 'below';
        return;
      }
    }
  }
  
  

}
