import { Component, HostListener } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActionsService } from 'src/app/services/actions.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['./renew.component.css']
})
export class RenewComponent {
  private closed = new Subject<boolean>();
  public closed$ = this.closed.asObservable();
  private renew = new Subject<string>();
  public renew$ = this.renew.asObservable();
  public toaster:boolean = true;
  public fc:FormControl;
  public error:boolean = false;
  public sent:boolean = false;
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
  renewPassword() {
    this.sent = true;
    const mail = this.fc.value;
    this.actionService.createSpinner();
    this.authService.mailCheck(mail).subscribe({
      next: (sent) => {
        this.error = false;
        this.actionService.closeSpinner();
        this.renew.next('')
        this.sent = false;
      },
      error : (err) => {
        this.error = true;
        this.actionService.closeSpinner();
        this.sent = false;
      }
    })
  }
  @HostListener('document:keydown.enter', ['$event'])
  onEnter(ev:KeyboardEvent) {
    this.renewPassword();
  }
}
