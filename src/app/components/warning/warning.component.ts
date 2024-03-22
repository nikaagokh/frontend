import { Component, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent {
  @Input() text:string;

  public toaster:boolean = true;
  private closed:Subject<void> = new Subject<void>();
  public closed$:Observable<void> = this.closed.asObservable();

  close():void {
    this.closed.next();
  }
}
