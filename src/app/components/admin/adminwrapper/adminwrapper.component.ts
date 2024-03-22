import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { Component, ElementRef, QueryList, Renderer2, Type, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { AdminaboutComponent } from '../adminabout/adminabout.component';
import { AdminpasswordComponent } from '../adminpassword/adminpassword.component';
import { AddComponent } from '../add/add.component';
import { AdmincategoryComponent } from '../admincategory/admincategory.component';
import { LogoutsubmitComponent } from '../../account/logoutsubmit/logoutsubmit.component';

@Component({
  selector: 'app-adminwrapper',
  templateUrl: './adminwrapper.component.html',
  styleUrls: ['./adminwrapper.component.css']
})
export class AdminwrapperComponent {
  private links:string[] = ['/admin/about','/admin/pass', '/admin/add', '/admin/addMini'];
  private components:Array<any> = [AdminaboutComponent, AdminpasswordComponent, AddComponent, AdmincategoryComponent];
  public filtered:any = [];
  public ctrl = new FormControl('');
  listenerFn = () => {};
  public active:number = 0;
  public hovered:number = 0;
  public size:boolean | null;
  private focused:boolean = false;
  private change = new Subject<any>();
  public change$ = this.change.asObservable();

  @ViewChildren('listitem') listitem:QueryList<any>;
  @ViewChild('list') list:ElementRef<HTMLElement>;
  @ViewChild(MatAutocompleteTrigger)
  private trigger!:MatAutocompleteTrigger;
  private el:ElementRef;
  constructor(
    private overlay:OverlayService, 
    private focus:FocusMonitor,
    private rend:Renderer2, 
    private router:Router,
    private route:ActivatedRoute,
    private httpService:HttpService) {}
  
  logout():void {
    this.overlay.openLogout();
    
  }
  selected(val:any) {
   
  }
  ngOnInit():void {
    this.active = this.links.indexOf(this.router.url);
  }
  ngAfterViewInit():void {
    this.focus.monitor(this.list, true).subscribe((x:FocusOrigin) => {
      
      if(x === 'mouse' && !this.focused) {
        
        this.focused = true;
        this.listenerFn = this.rend.listen(window, 'keydown', (ev:KeyboardEvent) => {
          if(ev.key === 'ArrowDown' || 'ArrowUp') {
            this.handle(ev);
          }
          if(ev.key === 'Enter') {
            if(this.hovered === 5) {
             
              this.logout();
            } else {
              this.clicked(this.hovered);
            }
          }
        })
      } else if(x === null) {
        this.focused = false;

        this.listenerFn();
      }
    })
    
  }
  handle(ev:KeyboardEvent) {
    ev.preventDefault();
    const toarr = this.listitem.toArray();
    if(ev.key === 'ArrowDown' &&  this.hovered === 5) {
      this.hovered = 0;
      const el = (toarr[this.hovered].nativeElement as HTMLElement);
      el.focus();
    }
    else if(ev.key === 'ArrowUp' &&  this.hovered === 0) {
      this.hovered = 5;
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
  clicked(val:number):void {
    this.active = val;
    this.hovered = val;
    this.router.navigate([this.links[this.active]]);
  }

  mobClicked(val:number):void {
    //this.change.next(this.components[val])
  }
  
}
