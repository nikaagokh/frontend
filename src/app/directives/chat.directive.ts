import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[chatmob]'
})
export class ChatDirective {
  private mobsize:boolean = false;
  private scrolled:number = 0;
  private els:HTMLElement;
  private routes:string[] = ['/product', '/cart']
  constructor(
    private el:ElementRef, 
    private rend:Renderer2, 
    private breakpoint:BreakpointObserver,
    private router:Router) {
      this.els = this.el.nativeElement as HTMLElement
      this.breakpoint.observe(['(min-width:992px)']).subscribe((state:BreakpointState) => {
        if(state.matches) {
          this.mobsize = false;
        } else {
          this.mobsize = true;
        }
      })
    }

    @HostListener('window:scroll', ['$event'])
    onScr(event:Event) {
      const scr = window.scrollY;
      const divide = scr - this.scrolled;
      //scr > this.scrolled
      if(divide > 10) {
        const router = this.router.url;
        const secondSlashIndex = router.indexOf('/', 1);
        let route:string;
        if (secondSlashIndex !== -1) {
          route = router.substring(0, secondSlashIndex);
        } else {
          route = router;
        }
        if(this.mobsize && this.routes.includes(route)) {
          this.rend.removeClass(this.els, 'upper');
        }
        
      }
      else if (divide < -5){
        const router = this.router.url;
        const secondSlashIndex = router.indexOf('/', 1);
        let route:string;
        if (secondSlashIndex !== -1) {
          route = router.substring(0, secondSlashIndex);
        }
        else {
          route = router;
        }
        if(this.mobsize && this.routes.includes(route)) {
          this.rend.addClass(this.els, 'upper')
        }
        
      }
      this.scrolled = scr;
    }


  

}
