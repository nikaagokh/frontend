import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap, forkJoin, catchError } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent {
  public visible:boolean = true;
  public productObject:any = {products:[], totalCount:0, totalPages:[]};
  public filter:boolean = false;
  public loaded:boolean = false;
  public breadcrumb:any = [];
  public products:any = [];
  public title:string;
  public notfound:boolean;
  public pages:number[] = [];
  public active:number = 0;
  public currentPage:number = 1;
  constructor(
    //private http:HttpClient, 
    private breakpoint:BreakpointObserver,
    private httpService:HttpService,
    private route:ActivatedRoute,
    ) {}
  ngOnInit():void {
    this.httpService.getCarProducts(1).subscribe(prod => {
      
      this.productObject = prod;
      this.pages = prod.totalPages;
      this.loaded = true;
    });
    this.breakpoint.observe(['(min-width:992px)']).subscribe((state:BreakpointState) => {
      if(state.matches) {
        this.filter = true;
        
      } else {
        this.filter = false;
       ;
      }
    })
    //this.productArray = this.overlay.getNatsilebi();
  }
  filtered():void {
    //this.overlay.openFilter();
  }
  changeVisible(val:boolean) {
    this.visible = val;
  }
  prev():void {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.loadMore();
    }
  }
  next():void {
    if(this.pages.length > this.currentPage) {
      this.currentPage++;
      this.loadMore();
    }
  }

  changePage(page:number) {
    if(page > 0 && page <= this.pages.length) {
      this.currentPage = page;
      this.loadMore()
    }
  }

  loadMore() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.httpService.getProductByTag(id, this.currentPage).pipe(
      catchError(er => [])
    ).subscribe(x => {
      this.products = x.products;
    })
  }
}
