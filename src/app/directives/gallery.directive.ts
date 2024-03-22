import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { SizeService } from '../services/size.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Directive({
  selector: '[gallery]'
})
export class GalleryDirective {
  pos1:number = 0;
  pos2:number = 0;
  mdown:boolean = false;
  loc:number = 0;
  size:number = 0;
  els:HTMLElement;
  child:HTMLElement;
  //_obj:any;
  position:number;
  posy:number = 0;
  private mobsize:boolean = false;
  @Input('gallery') _obj:any;
  @Input() max:number;
  @Input() full:boolean = false;
  @Output() page = new EventEmitter<number>();
  constructor(
    private el:ElementRef,
    private rend:Renderer2,
    private sizeService:SizeService,
    private breakpoint:BreakpointObserver
  ) {
    this.breakpoint.observe(['(min-width:768px)']).subscribe((state:BreakpointState) => {
      if(state.matches) {
        this.mobsize = false;
      } else {
        this.mobsize = true;
      }
    })
    this.els = this.el.nativeElement as HTMLElement;
      window.addEventListener('load', () => {
        this.size = this.els.children[0].firstElementChild.clientWidth;
        console.log(this.size)
      })
      this.rend.listen(window, 'resize', (ev:Event) => {
        this.size = this.els.children[0].firstElementChild.clientWidth;
        this.loc = -(this.size* this.position) - (this.position * 10);
        this.rend.setStyle(this.child, 'transform', `translateX(${this.loc}px)`);
        console.log(this.loc)
    })
  }

  ngOnInit():void {
    /*
    console.log(this.max);
    if(this.full) {
      this.size = (this.els.children[0] as HTMLElement).clientWidth;
      console.log((this.els.children[0] as HTMLElement).offsetWidth)
      console.log(this.size)
    } else {
      this.sizeService.slide$.subscribe(val => {
        this.size = val;
        console.log(val)
      })
     
    }
    */
  
    this.child = (this.els.children[0] as HTMLElement);
    this.position = this._obj.position;
  }
  ngAfterContentInit() {
    
    if(this.mobsize) {
      this.size = (this.els.children[0] as HTMLElement).clientWidth + 13;
    } else {
      this.size = (this.els.children[0] as HTMLElement).clientWidth;
    }
    console.log(this.size)
    
  }

  ngOnChanges(changes:SimpleChanges) {
    const change = changes['_obj'];
    
    this.position = change.currentValue.position;
    if(!change?.firstChange ) {
      
      this.loc = -(this.size* this.position) - (this.position*10)
      console.log(this.loc)
      this.rend.setStyle(this.child, 'transform', `translateX(${this.loc}px)`) 
    }
  }

  @HostListener('touchstart', ['$event'])
    onTouchStart(ev:TouchEvent) {
      this.mdown=true;
      this.pos1 = ev.changedTouches[0].pageX;
      this.posy = ev.touches[0].pageX;
    
    }
    @HostListener('touchmove', ['$event'])
    onTouchMove(ev:TouchEvent) {
      const move = ev.changedTouches[0].pageX;
      
    }
    @HostListener('touchend', ['$event'])
    onTouchEnd(ev:TouchEvent) {
      this.mdown=false;
      this.pos2 = ev.changedTouches[0].pageX;
      const divide = this.pos2 - this.pos1;
      if(divide < -50) {
        if(this.max > this.position) {
          this.position++;
          this.loc = -(this.size* this.position) - (this.position * 10);
          this.rend.setStyle(this.child, 'transform', `translateX(${this.loc}px)`)
          this.page.emit(this.position);
        }
        }
      else if(divide > 50) {
        if(this.position > 0) {
          this.position--;
          this.loc = -(this.size* this.position) - (this.position * 10);
          this.rend.setStyle(this.child, 'transform', `translateX(${this.loc}px)`);
          this.page.emit(this.position);
        }
      }
    }


}
