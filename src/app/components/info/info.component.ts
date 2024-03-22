import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  @Input() product:any;
  @Output() comment = new EventEmitter<string>();
  @Output() review = new EventEmitter<void>();
  public range:string;
  public index:number = 0;
  public rating:number = 0;
  public starArray:any = [0,1,2,3,4];
  public commentFC:FormControl = new FormControl('');
  ngOnInit():void {
    if(this.product.type === 0) {
      this.range = `${this.product.categories[0]?.categoryYear.year.start}-${this.product.categories[0]?.categoryYear.year.end}`;
    }
  }

  slide(val) {
    if(val) {
      this.index = 1;
    } else {
      this.index = 0;
    }
  }
  stars(val:number) {
    this.rating = val;
  }
  showIcon(val:number):string {
    if(this.rating >= val) {
      return 'star';
    }
    else {
      return 'star_border'
    }
  }

  reviews():void {

  }
  
  writeComment():void {
    console.log(this.commentFC.value)
    this.comment.next(this.commentFC.value);
  }
}
