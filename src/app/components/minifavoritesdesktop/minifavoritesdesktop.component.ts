import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { url } from '../searchdesktop/searchdesktop.component';

@Component({
  selector: 'app-minifavoritesdesktop',
  templateUrl: './minifavoritesdesktop.component.html',
  styleUrls: ['./minifavoritesdesktop.component.css']
})
export class MinifavoritesdesktopComponent {
  private close:Subject<void> = new Subject<void>();
  public close$ = this.close.asObservable();
  private route = new Subject<void>();
  public route$ = this.route.asObservable();
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
  closed():void {
    this.close.next();
  }
  removeItem(item:any):void {
    this.httpService.manageFavorites(item).subscribe();
  }
  routerLink():void {
    this.route.next();
  }
}
