import { FocusMonitor, FocusMonitorDetectionMode } from '@angular/cdk/a11y';
import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { url } from '../menudesktop/menudesktop.component';

@Component({
  selector: 'app-categorymob',
  templateUrl: './categorymob.component.html',
  styleUrls: ['./categorymob.component.css']
})
export class CategorymobComponent {
  public categories:Array<any>;
  public foc:boolean = false;
  public hovered:number = 0;
  public carousel:number = 0;
  private arr:any = [];
  public url:string;
  listenerFn = () => {};
  @ViewChild('list') list:ElementRef<HTMLElement>;
  @ViewChildren('listitem') listitem:QueryList<any>;
  constructor(
    private rend:Renderer2,
    private focus:FocusMonitor,
    private httpService:HttpService) {}

  ngOnInit():void {
    this.url = url;
    this.httpService.getRootCategories().subscribe(x => {
      this.categories = x;
      
      console.log(x)
    })
  }
  changeDot(index:number):void {
    this.carousel = this.hovered = index;
  }
  

}
