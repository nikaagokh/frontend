import { Directive, ElementRef } from '@angular/core';
import { OverlayService } from '../services/overlay.service';
import { SizeService } from '../services/size.service';

@Directive({
  selector: '[size]'
})
export class SizeDirective {
  private els:Element;
  constructor(
    private el:ElementRef,
    private sizeService:SizeService
  ) {
    this.els = this.el.nativeElement as HTMLElement;
  }
  ngOnInit():void {
    this.sizeService.updateSlideSize(this.els.clientWidth);
  }

}
