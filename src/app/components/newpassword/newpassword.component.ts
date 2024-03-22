import { ConfigurableFocusTrap } from '@angular/cdk/a11y';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, timer } from 'rxjs';
import { ActionsService } from 'src/app/services/actions.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent {
  private closed = new Subject<void>()
  public closed$ = this.closed.asObservable();
  private renewed = new Subject<void>()
  public renewed$ = this.renewed.asObservable();
  public formGroup:FormGroup;
  public toaster:boolean = true;
  private otp:number;
  constructor(
    private authService:AuthService,
    private fb:FormBuilder,
    private actionService:ActionsService) 
  {
    this.otp = localStorage.getItem('otp') ? Number(localStorage.getItem('otp')) : 0;
  }

  ngOnInit():void {
    this.formGroup = this.fb.group({
      password:['', [Validators.required, Validators.minLength(8)]],
      confirmPassword:['', Validators.required]
    }, {validator: this.passwordMatcherValidator})
  }

  passwordMatcherValidator(formGroup:FormGroup) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;
    console.log(password)
    return password === confirmPassword ? null : { mismatch: true };
  }


  close():void {
    this.closed.next();
  }

  renew():void {
    const password = this.formGroup.controls['password'].value;
    this.actionService.createSpinner();
    this.authService.changePassword(password, this.otp).subscribe({
      next: (val) => {
        localStorage.removeItem('otp');
        this.actionService.closeSpinner();
        this.actionService.createSuccessOverlay('პაროლი აღდგენილია');
        timer(300).subscribe(_ => {
          window.location.reload();
        })
      },
      error: (err) => {
        localStorage.removeItem('otp');
        this.actionService.closeSpinner();
        this.actionService.createFailureOverlay('პაროლის აღდგენა ვერ მოხდა');
        timer(300).subscribe(_ => {
          window.location.reload();
        })
      }
    })
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnter(ev:KeyboardEvent) {
    this.renew();
  }
}
