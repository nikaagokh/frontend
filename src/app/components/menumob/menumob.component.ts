import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { OverlayService } from 'src/app/services/overlay.service';


export const url = 'http://192.168.0.107:4200/api/uploads/logos/'

@Component({
  selector: 'app-menumob',
  templateUrl: './menumob.component.html',
  styleUrls: ['./menumob.component.css']
})
export class MenumobComponent {
  @Input() Menu:Array<any>;
  constructor(private overlay:OverlayService) {}
  private closed = new Subject<void>();
  public closed$ = this.closed.asObservable();
  private sub = new Subject<number>();
  public sub$ = this.sub.asObservable();
  public url:string;
  ngOnInit():void {
    this.url = url;
    console.log(this.Menu)
  }
  close():void {
    this.closed.next();
  }
  submenu(val:any):void {
    this.sub.next(val);
  }
}
