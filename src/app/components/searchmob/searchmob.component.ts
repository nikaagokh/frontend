import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, catchError, debounceTime, filter, map, switchMap } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { HttpService } from 'src/app/services/http.service';
import { url } from '../searchdesktop/searchdesktop.component';

@Component({
  selector: 'app-searchmob',
  templateUrl: './searchmob.component.html',
  styleUrls: ['./searchmob.component.css']
})
export class SearchmobComponent {
  public searched:FormControl = new FormControl('');
  private close:Subject<void> = new Subject<void>();
  public close$ = this.close.asObservable();
  private submit:Subject<any> = new Subject<any>();
  public submit$ = this.submit.asObservable();
  private slide = new Subject<boolean>();
  public slide$ = this.slide.asObservable();
  public productList:any = [];
  public filteredList:any = [];
  public loaded:boolean = false;
  public notexist:boolean = false;
  public url:string;
  constructor(private httpService:HttpService) {}

  ngOnInit():void {
    this.url = url;
    //this.productList = this.serv.getNatsilebi();
    this.filteredList = this.productList;
    this.searched.valueChanges.pipe(debounceTime(100)).pipe(
      filter(val => val !== ''),
      switchMap((word:string) => this.httpService.searchProductsByWord(word).pipe(
        catchError(e => [])
      ))
    ).subscribe(x => {
      this.productList = x;
      
      this.loaded = true;
    })
  }
  closeSearch():void {
    this.close.next();
  }
  slideLeft(val:boolean):void {

  }
  selectProduct(id:number):void {
    this.submit.next(id);
  }
}
