import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Subject } from 'rxjs';
import { url } from '../searchdesktop/searchdesktop.component';


export type Scale = {
  zoom:number;
  wiggle?:boolean;
}

@Component({
  selector: 'app-mobilezoom',
  templateUrl: './mobilezoom.component.html',
  styleUrls: ['./mobilezoom.component.css']
})
export class MobilezoomComponent {
  private subj = new Subject<void>();
  public subj$ = this.subj.asObservable();
  public scale:number = 1.1;
  public scaleObj:Scale;
  public active:number = 0;
  public wiggle:boolean = false;
  public imageArray:any = [];
  public url:string;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data:any) {
    if(typeof this.data.image === 'string') {
      this.imageArray = [this.data.image];
    } else {
      this.imageArray = this.data.image;
    }
  }
  ngOnInit():void {
    this.url = url
    this.scaleObj = {
      zoom:this.scale,
      
    };
  }
  close():void {

  }
  zoomIn():void {
    if(this.scale < 2.99) {
      
      this.scale +=0.1;
      this.scaleObj = {...this.scaleObj, zoom:this.scale, wiggle:false};

    } else {
      
      this.scaleObj = {...this.scaleObj, wiggle:true};
    }
  }
  zoomOut():void {
    if(this.scale > 1.1) {
      
      this.scale-=0.1;
      this.scaleObj = {...this.scaleObj, zoom:this.scale, wiggle:false};
    } else {
      
      this.scaleObj = {...this.scaleObj, wiggle:true};
    }
  }
  right():void {
    console.log('r');
    if(this.active < this.imageArray.length - 1) {
      console.log('r')
      this.active++;
    } else {
      this.active = 0;
    }
  }
  left():void {
    if(this.active !==0) {
      this.active--;
    } else {
      this.active = this.imageArray.length - 1;
    }
  }
  zoom(val:number):void {
    this.scale = val;
  }
  closed():void {
    this.subj.next();
  }
  
}
