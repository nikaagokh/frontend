import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { url } from '../searchdesktop/searchdesktop.component';

@Component({
  selector: 'app-minifavorites',
  templateUrl: './minifavorites.component.html',
  styleUrls: ['./minifavorites.component.css']
})
export class MinifavoritesComponent {
  private subj = new Subject<void>();
  public subj$ = this.subj.asObservable();
  private navigate = new Subject<boolean>();
  public navigate$ = this.navigate.asObservable();
  public favArray: any = [];
  public url:string;
  constructor(private httpService:HttpService) {}
  ngOnInit():void {
    this.url = url;
    this.httpService.getFavoritedProducts().subscribe();
    this.httpService.fav$.subscribe((val:any) => {
      this.favArray = val;
    })
  }
  clicked():void {
    this.subj.next();
  }
  
  removeItem(item:any):void {
    this.httpService.manageFavorites(item).subscribe()
  }

  detailedFavorites():void {
    this.navigate.next(true);
  }

  routerLink():void {
    this.navigate.next(false)
  }

}
