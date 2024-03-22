import { Component, HostListener, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ActionsService } from 'src/app/services/actions.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-writereview',
  templateUrl: './writereview.component.html',
  styleUrls: ['./writereview.component.css']
})
export class WritereviewComponent {
  @Input('mob') mobsize:boolean = true;
  @Input('productId') productId:number;
  public starArray:Array<any> = [1,2,3,4,5];
  private rating:number = 0;
  public loaded:boolean = true;
  public toaster:boolean = true;
  private backed:Subject<void> = new Subject<void>();
  public back$:Observable<void> = this.backed.asObservable();
  private submited:Subject<any> = new Subject<any>();
  public submit$:Observable<any> = this.submited.asObservable();
  private closed:Subject<void> = new Subject<void>();
  public close$:Observable<void> = this.closed.asObservable();
  public txtAreafc:FormControl = new FormControl('');
  public error:boolean = false;
  public send:boolean = false;
  constructor(
    private httpService:HttpService,
    private actionService:ActionsService) {}
  ngOnInit():void {
    console.log(this.productId)
  }
  showIcon(val:number):string {
    if(this.rating>= val) {
      return 'star';
    }
    else {
      return 'star_border'
    }
  }
  stars(star:number) {
    console.log(star)
    this.rating = star;
  }
  back():void {
    this.backed.next();
  }
  close():void {
    this.closed.next();
  }
  submit():void {
    if(!this.send && this.txtAreafc.value !== '' && this.rating !== 0) {
      this.send = true;
      const comment = this.txtAreafc.value;
      this.actionService.createSpinner();
      this.httpService.writeComment(this.productId, comment, this.rating).subscribe({
        next: comm => {
          this.actionService.closeSpinner();
          this.actionService.createSuccessOverlay('პროდუქტის შეფასება დამატებულია')
          this.error = false;
          this.closed.next();
          this.send = false;
        },
        error: err => {
          this.actionService.closeSpinner();
          this.error = true;
          this.send = false;
        }
      })
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnter(ev:KeyboardEvent) {
    console.log(1234444)
    this.submit();
  }

}
