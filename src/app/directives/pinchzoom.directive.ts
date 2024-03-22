import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { Scale } from '../components/mobilezoom/mobilezoom.component';

@Directive({
  selector: '[pinchzoom]'
})
export class PinchzoomDirective {
  private imgScale:Element;
  private img:HTMLElement;
  private delta:number = 0;
  private distance:number = 0;
  @Input() scale:Scale;
  private scaled:number;
  @Output() zoom = new EventEmitter<number>();
  @Output() dist = new EventEmitter<number>();
  @Output() delt = new EventEmitter<number>();
  @Output() scal = new EventEmitter<number>();
  @Output() wiggle = new EventEmitter<boolean>();
  constructor(
    private el:ElementRef,
    private rend:Renderer2
  ) {
    this.img = this.el.nativeElement as HTMLElement;
  }
  ngOnChanges(changes:SimpleChanges):void {
    const change = changes['scale'];
    this.scaled = change.currentValue.zoom;
    if(!change.firstChange && !change.currentValue.wiggle) {
      this.img.style.setProperty('--zoom', `${this.scaled}`); 
      this.wiggle.emit(false);
      
    }
    if(change.currentValue.wiggle) {
    }
  }
  ngOnInit():void {
    this.img.style.setProperty('--zoom', `${this.scaled}`);
    this.scaled = this.scale.zoom;
    this.imgScale = this.img.parentElement.previousElementSibling;
  }
  @HostListener('touchstart', ['$event'])
  onStart(ev:TouchEvent):void {
    if(ev.touches.length === 2) {
      
    }
    ev.preventDefault();
    this.distance = this.distanceFull(ev);
   
    
    
    
    
  }
  @HostListener('touchmove', ['$event'])
  onMove(ev):void {
    ev.preventDefault();
    if(ev.touches.length === 2) {
      /*
      let scale;
      if(ev.scale) {
        scale = ev.scale;
      } else {
      */
        const delta = this.distanceFull(ev);
        let scale = delta / this.distance;
        if(this.scaled < 3 && this.delta < delta) {
          
          this.scaled+=scale/100;

        } else if (this.scaled > 1 && this.delta > delta) {
          if(this.distance > this.delta) {
            this.scaled-=scale/50;
          } else {
            this.scaled-=scale/75;
          }
          this.scal.emit(scale);
        } 
        
        this.delt.emit(delta);
        this.zoom.emit(this.scaled);
        this.img.style.setProperty('--zoom', `${this.scaled}`); 
        /*if(this.scaled <=3 && this.scaled > 1) {
          this.delta = delta;
        }*/
      //this.img.style.setProperty('--x','50%');
      //this.img.style.setProperty('--y','50%');
      //this.imgScale = Math.min(Math.max(1,scale), 3);
      //this.scale = Math.min(Math.max(1,scale), 3);
      //this.imgScales.emit(this.imgScale);
      //this.rend.setStyle(this.el.nativeElement, 'scale', this.imgScale);
      this.delta = delta;
      this.dist.emit(this.delta);
      
    }
    
    //ev.preventDefault();
    else {
      
      const rect = (ev.target as HTMLElement).getBoundingClientRect();
      const offsetX = ev.targetTouches[0].pageX - rect.left;
      const offsetY = ev.targetTouches[0].pageY - rect.top;
      console.log(offsetX);
      console.log(offsetY);
      this.img.style.setProperty('--x',(100*offsetX/this.img.offsetWidth)/this.scaled+'%');
      this.img.style.setProperty('--y',(100*offsetY/this.img.offsetHeight)/this.scaled+'%');
      this.img.style.setProperty('--zoom', `${this.scaled}`); 
      
    }
    
    
  }
  @HostListener('touchend', ['$event'])
  onEnd(ev:TouchEvent):void {
    //this.img.style.setProperty('--x','50%');
    //this.img.style.setProperty('--y','50%');
    
  }
  distanceFull(ev:TouchEvent):number {
    return Math.hypot(ev.touches[0].pageX - ev.touches[1].pageX, ev.touches[0].pageY - ev.touches[1].pageY);
  }

}
