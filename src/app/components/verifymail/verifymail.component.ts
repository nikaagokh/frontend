import { Component, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActionsService } from 'src/app/services/actions.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-verifymail',
  templateUrl: './verifymail.component.html',
  styleUrls: ['./verifymail.component.css']
})
export class VerifymailComponent {
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
    const mail = this.fc.value;
    this.actionService.createSpinner();
    this.authService.mailOtp(mail).subscribe({
      next: (val:any) => {
        this.error = false;
        console.log(val)
        this.actionService.closeSpinner();
        localStorage.setItem('otp', val.pin);
        this.verified.next()
      },
      error: (err) => {
        this.error = true;
        
        this.actionService.closeSpinner()
      }
    })
  }
  @HostListener('document:keydown.enter', ['$event'])
  onEnter(ev:KeyboardEvent) {
    this.verify();
  }
}
