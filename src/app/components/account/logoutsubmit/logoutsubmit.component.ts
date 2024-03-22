import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-logoutsubmit',
  templateUrl: './logoutsubmit.component.html',
  styleUrls: ['./logoutsubmit.component.css']
})
export class LogoutsubmitComponent {
  private closed = new Subject<boolean>();
  public closed$ = this.closed.asObservable();
  constructor(){}
  close(val:boolean):void {
    this.closed.next(val);
  }
  clicked():void {
    
  }
}
