import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, forkJoin, map, switchMap } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { PriceObject } from '../cart/cart.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  public loaded:boolean = false;
  public product:any = [];
  public number:number = 1;
  public mobsize:boolean = false;
  public priceObj:PriceObject;
  public comments:any = [];
  public similars:any = [];
  constructor(
    private route:ActivatedRoute,
    private breakpoint:BreakpointObserver,
    private httpService:HttpService
  ) {}
  ngOnInit():void {
    this.breakpoint.observe(['(min-width:992px)']).subscribe((state:BreakpointState) => {
      if(state.matches) {
        this.mobsize = false;
      } else {
        this.mobsize = true;
      }
    })
    this.route.paramMap.pipe(
      map((params:ParamMap) => params.get('id')),
      switchMap((id) => forkJoin({
        product:this.httpService.getOneProduct(Number(id)),
        similars:this.httpService.getSimilarProducts(Number(id))
      })
    )).subscribe(prod => {
      console.log(prod)
      this.product = prod.product;
      this.similars = prod.similars;
      const oldPrice = Math.floor(this.product.price / ((100-this.product.discount)/100));
      this.priceObj = {newPrice:this.product.price, oldPrice:oldPrice};
      this.loaded = true;
      console.log(this.product)
    })
  }
  addToCart() {
    this.httpService.addToCart(this.product).subscribe();
  }
  
  writeComment(comment:string) {
    console.log(1)
    this.httpService.writeComment(this.product.id, comment, 7).subscribe(x => {
      console.log(x)
    });
  }

  loadReviews() {

  }

  addToFavorites() {
    this.httpService.manageFavorites(this.product).subscribe();
  }

}
