import { Component, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-welldone',
  templateUrl: './welldone.component.html',
  styleUrls: ['./welldone.component.css']
})
export class WelldoneComponent {
  @Input() text:string;

  public toaster:boolean = true;
  private closed:Subject<void> = new Subject<void>();
  public closed$:Observable<void> = this.closed.asObservable();

  close():void {
    this.closed.next();
  }
}
