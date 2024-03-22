import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[left]'
})
export class SlideleftDirective {

  constructor() {}
  private pos1:number = 0;
  private pos2:number = 0;
  private max:number = 0;
  @Output() opened = new EventEmitter<boolean>();
}
