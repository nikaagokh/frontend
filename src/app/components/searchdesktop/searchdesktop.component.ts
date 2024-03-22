import { Component, ElementRef, Inject, Input, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { HttpService } from 'src/app/services/http.service';

//export const url = 'http://localhost:3000/api/uploads/product/';
export const url = 'http://192.168.0.107:4200/api/uploads/product/'
@Component({
  selector: 'app-searchdesktop',
  templateUrl: './searchdesktop.component.html',
  styleUrls: ['./searchdesktop.component.css']
})
export class SearchdesktopComponent {
  @Input() filteredList:any = [];
  @Input() word:string; 
  listenerFn = () => {};
  @ViewChild('list') private list:ElementRef;
  @ViewChildren('listitem') private listitem:QueryList<any>;
  public hovered:number = 0;
  private selected:Subject<number> = new Subject<number>();
  public selected$ = this.selected.asObservable();
  public loaded:boolean = false;
  public url:string;
  constructor(
    private rend:Renderer2, 
    private httpService:HttpService,
    ) {}

  ngOnInit():void {
    this.url = url;
    this.listenerFn = this.rend.listen(window, 'keydown', (ev:KeyboardEvent) => {
      if(ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
        this.handleArrowUpAndDown(ev);
      }
      if(ev.key === 'Enter') {
        //this.select(this.hovered);
      }
    })
  }

  ngOnChanges(changes:SimpleChanges) {
    const word = changes['word'];
    if(word.currentValue === '') {
      console.log(1)
      this.filteredList = [];
    }
    this.httpService.searchProductsByWord(word.currentValue).subscribe(prod => {
      console.log(prod)
      this.filteredList = prod;
      this.loaded = true;
    });
  }

  selectProduct(id:number):void {
    //
  }

  handleArrowUpAndDown(ev:KeyboardEvent) {
    ev.preventDefault();
    const toarr = this.listitem.toArray();
    if(ev.key === 'ArrowDown' &&  this.hovered === this.filteredList.length - 1) {
      this.hovered = 0;
      const el = (toarr[this.hovered].nativeElement as HTMLElement);
      el.focus();
    }
    else if(ev.key === 'ArrowUp' &&  this.hovered === 0) {
      this.hovered = this.filteredList.length - 1;
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

  ngOnDestroy():void {
    this.listenerFn();
  }
}



