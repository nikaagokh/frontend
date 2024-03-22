import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[intersect]'
})
export class IntersectDirective {
  constructor(
    private el:ElementRef) {
      console.log(this.el.nativeElement);
    }
  @Output() inView = new EventEmitter<boolean>();
  
  observer!:IntersectionObserver;
  ngOnInit():void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting) {
            this.inView.emit(true); 
          }
          else {
            this.inView.emit(false);
            
          }
        })
      },
      
    )
    this.observer.observe(this.el.nativeElement);
  }

}
