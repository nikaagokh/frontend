import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent {
  private closed:Subject<void> = new Subject<void>();
  public closed$:Observable<void> = this.closed.asObservable();

  private submitted:Subject<void> = new Subject<void>();
  public submitted$:Observable<void> = this.submitted.asObservable();

  close():void {
    this.closed.next();
  }
  submit():void {
    this.submitted.next();
  }
}
