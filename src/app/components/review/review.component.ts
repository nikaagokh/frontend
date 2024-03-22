import { Component, Input } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  @Input() comments:any = [];
  @Input() productId:number;
  public starArray:any = [1,2,3,4,5];
  constructor(private overlay:OverlayService) {}
  ngOnInit() {
    console.log(this.comments)
  }
  showIcon(star:number, rate:number) {
    if(rate>= star) {
      return 'star';
    }
    else {
      return 'star_border'
    }
  }
  writeReview():void {
    this.overlay.openWriteReview(this.productId);
  }
  openReviews():void {
    this.overlay.openReview(this.productId);
  }
}
