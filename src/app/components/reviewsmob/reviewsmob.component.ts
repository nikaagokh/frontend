import { Component, Inject, Input } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reviewsmob',
  templateUrl: './reviewsmob.component.html',
  styleUrls: ['./reviewsmob.component.css']
})
export class ReviewsmobComponent {
  public starArray:Array<any> = [0,1,2,3,4];
  private rating:number = 3;
  public comments = [{name:'გელა გოხაძე', date:'20.11.2024', comment:'არ მომეწონა ეს პროდუქტი, ნაგავია', rate:3}, {name:'ნიკა გოხაძე', date:'2.08.2024', comment:'ძალიან კარგი პროდუქტი იყო, მომეწონა', rate:2}, {name:'გოხაწე აესაე', date:'2.11.2014', comment:'პროდუქტს დახვეწა სჭირდება', rate:5}, {name:'გელა გოხაძე', date:'20.11.2024', comment:'არ მომეწონა ეს პროდუქტი, ნაგავია', rate:3}, {name:'ნიკა გოხაძე', date:'2.08.2024', comment:'ძალიან კარგი პროდუქტი იყო, მომეწონა', rate:2}, {name:'გოხაწე აესაე', date:'2.11.2014', comment:'პროდუქტს დახვეწა სჭირდება', rate:5}, {name:'გელა გოხაძე', date:'20.11.2024', comment:'არ მომეწონა ეს პროდუქტი, ნაგავია', rate:3}, {name:'ნიკა გოხაძე', date:'2.08.2024', comment:'ძალიან კარგი პროდუქტი იყო, მომეწონა', rate:2}, {name:'გოხაწე აესაე', date:'2.11.2014', comment:'პროდუქტს დახვეწა სჭირდება', rate:5}]
  private write:Subject<void> = new Subject<void>();
  public write$:Observable<void> = this.write.asObservable();
  private close:Subject<void> = new Subject<void>();
  public close$:Observable<void> = this.close.asObservable();
  constructor(
    private authService:AuthService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public reviews:any) {}
  
  writeReview():void {
    this.write.next();
  }
  closed():void {
    this.close.next();
  }

  showIcon(val:number, rate:number):string {
    if(rate>= val) {
      return 'star';
    }
    else {
      return 'star_border'
    }
  }
}
