import { Component } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public animation:boolean = false;
  constructor(private overlay:OverlayService) {}
  animate():void {
   
    this.animation = true;
  }
  openAuth():void {
    this.overlay.openAuth();
  }

  openReg():void {
    this.overlay.openReg();
  }
}
