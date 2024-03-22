import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/interfaces/root-categories.interface';
import { Submenu } from 'src/app/interfaces/subcategories.interface';

export const url = 'http://localhost:3000/api/uploads/subcategories/';

export type CategoryYear = {
  yearId:number;
  categoryId:number;
}

@Component({
  selector: 'app-submenudesktop',
  templateUrl: './submenudesktop.component.html',
  styleUrls: ['./submenudesktop.component.css']
})
export class SubmenudesktopComponent {
  @Input() submenu:Submenu[];
  @Output() closed = new EventEmitter<CategoryYear>();
  public url:string;
  ngOnInit() {
    this.url = url;
    console.log(this.submenu)
  }
  changeRoute(yearId:number, categoryId:number):void {
    this.closed.emit({yearId, categoryId});
  }
}
