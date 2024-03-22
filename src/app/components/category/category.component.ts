import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, forkJoin, map, switchMap } from 'rxjs';
import { CategoryChildren } from 'src/app/interfaces/children-categories.interface';
import { ProductCategory } from 'src/app/interfaces/product-category-paginator.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { Category } from 'src/app/interfaces/root-categories.interface';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  public visible:boolean = true;
  public productObject:any = {products:[], totalCount:0, totalPages:[]};
  public filter:boolean = false;
  public loaded:boolean = false;
  public breadcrumb:any = [];
  public subcategories:CategoryChildren[];
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
    private router:Router
    ) {}
  ngOnInit():void {
    this.route.queryParamMap.pipe(
      map(params => {
        this.currentPage = 1;
        return params;
      }),
      map(params => ({yearId:params.get('yearId'), categoryId:params.get('categoryId')})),
      switchMap(yearCategory => forkJoin({
        result:this.httpService.getProductsByCategoryYear(Number(yearCategory.yearId), this.currentPage),
        breadcrumb:this.httpService.getBreadcrumbCategories(Number(yearCategory.categoryId))
      }))
    ).subscribe(prod => {
      console.log(prod)
      this.productObject = prod.result;
      this.breadcrumb = prod.breadcrumb;
      this.pages = prod.result.totalPages;
      this.loaded = true;
    })
    /*
    this.route.paramMap.pipe(
      map((params:ParamMap) => params.get('id')),
      switchMap(id => forkJoin({
        products:this.httpService.getProductsByCategory(Number(id)),
        breadcrumb: this.httpService.getBreadcrumbCategories(Number(id)),
        subcategories: this.httpService.getChildrenOfCategory(Number(id))
      }))
    ).subscribe(prod => {
      console.log(prod)
      this.productObject = prod.products;
      this.breadcrumb = prod.breadcrumb;
      this.subcategories = prod.subcategories
      this.loaded = true;
    })
    */
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
    const yearId = this.route.snapshot.queryParams['yearId'];
    this.httpService.getProductsByCategoryYear(yearId, this.currentPage).pipe(
      catchError(er => [])
    ).subscribe(x => {
      console.log(x)
      this.productObject = x;
      scrollTo({top:0, behavior:'instant'});
    })
  }
  
}
