import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

export const url = 'http://192.168.0.107:4200/api/uploads/subcategories/'

@Component({
  selector: 'app-submenumob',
  templateUrl: './submenumob.component.html',
  styleUrls: ['./submenumob.component.css']
})
export class SubmenumobComponent {
  private closed = new Subject<boolean>();
  public closed$ = this.closed.asObservable();
  private wiggle = new Subject<boolean>();
  public wiggle$ = this.wiggle.asObservable();
  private submit = new Subject<any>();
  public submit$ = this.submit.asObservable();
  public url:string;
  @Input() submenu:any;
  ngOnInit():void {
    this.url = url;
    console.log(this.submenu)
  }
  back():void {
    this.closed.next(false);
  }
  close():void {
    this.closed.next(true);
  }
  categoryChanged(yearId:number, categoryId:number):void {
    this.submit.next({yearId, categoryId});
  }
}
