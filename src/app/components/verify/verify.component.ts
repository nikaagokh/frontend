import { Component, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActionsService } from 'src/app/services/actions.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  private closed = new Subject<boolean>();
  public closed$ = this.closed.asObservable();
  private verified = new Subject<void>();
  public verified$ = this.verified.asObservable();
  public toaster:boolean = true;
  public fc:FormControl;
  public error:boolean = false;
  constructor(
    private authService:AuthService,
    private actionService:ActionsService) {}
  ngOnInit():void{
    this.fc = new FormControl('');
  }
  back():void {
    this.closed.next(false);
  }
  close():void {
    this.closed.next(true);
  }
  verify():void {
    this.actionService.createSpinner();
    const number = this.fc.value;
    this.authService.verifyUser(number).subscribe({
      next: val => {
        this.error = false;
        this.verified.next()
        this.actionService.closeSpinner();
        //this.actionService.createSuccessOverlay('თქვენ წარმატებით გაიარეთ რეგისტრაცია');
      },
      error: e => {
        this.error = true;
        this.actionService.closeSpinner();
        this.actionService.createFailureOverlay('პინკოდი არასწორია');
      }
    })
  }
  @HostListener('document:keydown.enter', ['$event'])
  onEnter(ev:KeyboardEvent) {
    this.verify();
  }
}
