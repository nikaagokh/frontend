import { Component } from '@angular/core';
import { catchError, forkJoin, of } from 'rxjs';
import { Category } from 'src/app/interfaces/root-categories.interface';
import { TagProduct } from 'src/app/interfaces/tag-product.interface';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';

export type Tag = {
  id:number;
  name:string;
  category:number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public loaded:boolean = false;
  public homeProducts:TagProduct[] = [];
  public categories:Category[] = [];
  public cars:any = [];
  public tag:Tag;

  constructor(
    private overlay:OverlayService,
    private httpService:HttpService) {}

  ngOnInit():void {
    forkJoin({
      products: this.httpService.getHomePageProducts(),
      categories: this.httpService.getRootCategories(),
      cars:this.httpService.getCarProducts(1)
    }).pipe(catchError(err => of(err))).subscribe(home => {
      console.log(home)
      this.loaded = true;
      this.homeProducts = home.products;
      this.categories = home.categories;
      this.cars = home.cars;
    })
  }
}
