import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { CategoryChildren } from 'src/app/interfaces/children-categories.interface';

@Component({
  selector: 'app-categoryfilter',
  templateUrl: './categoryfilter.component.html',
  styleUrls: ['./categoryfilter.component.css']
})
export class CategoryfilterComponent {
  @Input('subcategory') subcategory:CategoryChildren[];
  @Output() visible = new EventEmitter<void>();
  public filtered:boolean = false;
  public all:boolean = false;
  public categories:FormControl = new FormControl('');
  public sort:FormControl = new FormControl('');
  public inpstart:number = 5;
  public inpend:number = 1000;
  public categoryList = ['Audi', 'Bmw', 'Chevrolet', 'Ford', 'Hyundai', 'Kia', 'Lexus', 'Toyota'];
  public categoryFilter = [{title:'4Runner', year:'2011-2013', image:'https://vgparts.ge/uploads/manufacturers/models/avalon-2022.png'}, {title:'Camry', year:'2015-2017', image:'https://vgparts.ge/uploads/manufacturers/models/camry-2015-2017.png'}, {title:'Camry', year:'2018-2024', image:'https://vgparts.ge/uploads/manufacturers/models/camry-2018.png'}, {title:'Prius III', year:'2009-2011', image:'https://vgparts.ge/uploads/manufacturers/models/2011-toyota-prius-ii-hatchback-angular-front.png'}, {title:'Prius IV', year:'2019-2022', image:'https://vgparts.ge/uploads/manufacturers/models/toyota-prius-2019.png'}, {title:'Rav4', year:'2006-2009', image:'https://vgparts.ge/uploads/manufacturers/models/toyota-rav4-2009.png'}, {title:'Highlander', year:'2017-2019', image:'https://vgparts.ge/uploads/manufacturers/models/Toyota%20Highlander%202017%20-%202019.png'}];
  public disabled:boolean = true;
  private close = new Subject<void>();
  public close$ = this.close.asObservable();
  changed(val:any) {

  }
  clearselect():void {
    this.categories.setValue('');
  }
  ngOnInit():void {
    this.categories.valueChanges.subscribe(val => {
      
      
    })
    this.sort.valueChanges.subscribe(val => {
      if(val === undefined) {
        this.disabled = true;
      }
      else {
        this.disabled = false;
      }
    })

  }
  closed():void {
    this.close.next();
  }
  filter():void {
    
    this.visible.emit();
  }
}
