import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {
  private closed = new Subject<void>();
  public closed$ = this.closed.asObservable();

  close():void {
    this.closed.next();
  }
}
