import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { ConnectedPosition, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Component, ElementRef, Input, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { RootAndChildren } from 'src/app/interfaces/root-and-children.interface';
import { OverlayService } from 'src/app/services/overlay.service';
import { CategoryYear } from '../submenudesktop/submenudesktop.component';

export const url:string = 'http://localhost:3000/api/uploads/logos';

@Component({
  selector: 'app-menudesktop',
  templateUrl: './menudesktop.component.html',
  styleUrls: ['./menudesktop.component.css']
})
export class MenudesktopComponent {
  constructor(
    private overlay:OverlayService, 
    public scroll:ScrollStrategyOptions,
    private focus:FocusMonitor,
    private rend:Renderer2) {}
  @Input('sub') menu:RootAndChildren[];
  private subscription:Subscription;
  listenerFn = () => {};
  public hovered:number = 0;
  private focused:boolean = false;
  @ViewChildren('listitem') inputs!:QueryList<any>;
  @ViewChild('list') list:ElementRef<HTMLElement>;
  //public carArray = [[{title:'Audi A4', image:'../../../assets/audi1.png', year:'2011-2014'},{image:'../../../assets/audi2.png', title:'Audi A4', year:'2012-2015'}, {image:'../../../assets/audi3.png', title:'Audi Q5', year:'2008-2012'}], [{image:'../../../assets/bmw1.png', title:'F30', year:'2012-2017'}, {image:'https://vgparts.ge/uploads/manufacturers/models/x5-e70-b.png', title:'X5-E70', year:'2007-2010'}, {image:'../../../assets/bmw3.png', year:'2010-2013', title:'X5-E70'}], [{title:'4Runner', year:'2011-2013', image:'https://vgparts.ge/uploads/manufacturers/models/avalon-2022.png'}, {title:'Camry', year:'2015-2017', image:'https://vgparts.ge/uploads/manufacturers/models/camry-2015-2017.png'}, {title:'Camry', year:'2018-2024', image:'https://vgparts.ge/uploads/manufacturers/models/camry-2018.png'}, {title:'Prius III', year:'2009-2011', image:'https://vgparts.ge/uploads/manufacturers/models/2011-toyota-prius-ii-hatchback-angular-front.png'}, {title:'Prius IV', year:'2019-2022', image:'https://vgparts.ge/uploads/manufacturers/models/toyota-prius-2019.png'}, {title:'Rav4', year:'2006-2009', image:'https://vgparts.ge/uploads/manufacturers/models/toyota-rav4-2009.png'}, {title:'Highlander', year:'2017-2019', image:'https://vgparts.ge/uploads/manufacturers/models/Toyota%20Highlander%202017%20-%202019.png'}]];
  //public subMenu:number | undefined;
  public show:boolean = true;
  private closed = new Subject<CategoryYear>();
  public closed$ = this.closed.asObservable();
  private sub = new Subject<number>();
  public sub$ = this.sub.asObservable();
  public pos:ConnectedPosition[] = [
    {
      originX:'end',
      originY:'top',
      overlayX:'start',
      overlayY:'top'
    }
  ];
  public items:Array<any>;
  public submenu:Array<any>;
  public url:string;
  ngOnInit():void {
    this.url = url;
    console.log(this.menu)
  }

  subClasses(id:number) {
    console.log(id)
   this.submenu = this.menu[id].subcategories;
   console.log(this.submenu)
  }
  close():void {
    this.closed.next(null);
  }
  submited(catYear:CategoryYear):void {
    this.closed.next(catYear);
  }
  
  hover(val:number):void {
    //this.subMenu = val;
    this.hovered = val;

  }
  ngAfterViewInit():void {
    
    
    this.focus.monitor(this.list, true).subscribe((x:FocusOrigin) => {
      if(x && !this.focused) {
       
        this.focused = true;
        this.listenerFn = this.rend.listen(window, 'keydown', (ev:KeyboardEvent) => {
          if(ev.key === 'ArrowDown' || 'ArrowUp') {
            this.handle(ev);
          }
          if(ev.key === 'Enter') {
            //this.subMenu = this.hovered;
          }
        })
      } else if (x === null){
        
        this.listenerFn();
        this.focused = false;
      }
    })
  }
  handle(ev:KeyboardEvent) {
    ev.preventDefault();
    const toarr = this.inputs.toArray();
    
    if(ev.key === 'ArrowDown' &&  this.hovered === 7) {
      this.hovered = 0;
      const el = (toarr[this.hovered].nativeElement as HTMLElement);
      el.focus();
    
      
    }
    else if(ev.key === 'ArrowUp' &&  this.hovered === 0) {
      this.hovered = 7;
      const el = (toarr[this.hovered].nativeElement as HTMLElement);
      el.focus();
     
    }
    else if (ev.key === 'ArrowDown') {
      this.hovered++;
      
      
      const el = (toarr[this.hovered].nativeElement as HTMLElement);
      el.focus();
    }
    else if(ev.key === 'ArrowUp') {
      this.hovered--;
     
      const el = (toarr[this.hovered].nativeElement as HTMLElement);
      el.focus();
      
    }
    
  }
}
