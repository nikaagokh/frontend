import { Component, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  @Input() reviews:Array<any>;
  public starArray:Array<any> = [0,1,2,3,4];
  private rating:number = 3;
  public loaded:boolean = true;
  public auth:boolean = false;
  public comments = [{name:'გელა გოხაძე', date:'20.11.2024', comment:'არ მომეწონა ეს პროდუქტი, ნაგავია', rate:3}, {name:'ნიკა გოხაძე', date:'2.08.2024', comment:'ძალიან კარგი პროდუქტი იყო, მომეწონა', rate:2}, {name:'გოხაწე აესაე', date:'2.11.2014', comment:'პროდუქტს დახვეწა სჭირდება', rate:5},{name:'გელა გოხაძე', date:'20.11.2024', comment:'არ მომეწონა ეს პროდუქტი, ნაგავია', rate:3}, {name:'ნიკა გოხაძე', date:'2.08.2024', comment:'ძალიან კარგი პროდუქტი იყო, მომეწონა', rate:2}, {name:'გოხაწე აესაე', date:'2.11.2014', comment:'პროდუქტს დახვეწა სჭირდება', rate:5},{name:'გელა გოხაძე', date:'20.11.2024', comment:'არ მომეწონა ეს პროდუქტი, ნაგავია', rate:3}, {name:'ნიკა გოხაძე', date:'2.08.2024', comment:'ძალიან კარგი პროდუქტი იყო, მომეწონა', rate:2}, {name:'გოხაწე აესაე', date:'2.11.2014', comment:'პროდუქტს დახვეწა სჭირდება', rate:5}]
  constructor(private overlay:OverlayService, private authService:AuthService) {}

  private write:Subject<void> = new Subject<void>();
  public write$:Observable<void> = this.write.asObservable();
  private close:Subject<void> = new Subject<void>();
  public close$:Observable<void> = this.close.asObservable();
  ngOnInit() {
    this.authService.isAuthenticated().subscribe(x => {
      this.auth = x;
      console.log(this.auth)
    })
  }
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
