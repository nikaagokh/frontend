import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActionsService } from 'src/app/services/actions.service';
import { AuthService } from 'src/app/services/auth.service';
import { SUCCESS_AUTHORIZATION } from '../register/register.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  public error:boolean = false;
  private subj = new Subject<void>();
  public subj$ = this.subj.asObservable();
  private reg = new Subject<void>();
  public reg$ = this.reg.asObservable();
  private renewa = new Subject<void>();
  public renew$ = this.renewa.asObservable();
  public reactiveForm:FormGroup;
  public ptype:boolean = false;
  public toaster:boolean = true;
  @ViewChild('toasterRef') toasterRef:ElementRef<any>;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private actionService:ActionsService,
    private rend:Renderer2) {}
  ngOnInit():void {
    this.reactiveForm = this.fb.group({
      mailnumber: [''],
      password: ['']
    });

  }
  submit():void {
    const mail = this.reactiveForm.get('mailnumber').value;
    const pass = this.reactiveForm.get('password').value;
    if(mail.length > 0 && pass.length > 0) {
      this.authService.login(mail, pass).subscribe({
        next: comp => {
          this.error = false;
          this.subj.next()
          this.actionService.createSuccessOverlay(SUCCESS_AUTHORIZATION);
          
        },
        error: err => {
          this.error = true;
        }
      })
    }
  }
  clicked():void {
    this.subj.next();
  }
  renew():void {
    this.renewa.next();
  }
  register():void {
    this.reg.next();
  }

  @HostListener('document:keydown.enter', ['$event'])
  onEnter(ev:KeyboardEvent) {
    this.submit();
  }
}
