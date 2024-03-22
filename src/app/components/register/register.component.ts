import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, last } from 'rxjs';
import { CustomValidators } from './validators/Validators';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';
import { Register } from 'src/app/interfaces/register.interface';
import { ActionsService } from 'src/app/services/actions.service';

export const SUCCESS_AUTHORIZATION = 'თქვენ წარმატებით გაიარეთ აუტორიზაცია';
export const SUCCESS_REGISTRATION = 'თქვენ წარმატებით გაიარეთ რეგისტრაცია';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private closed = new Subject<boolean>();
  public closed$ = this.closed.asObservable();
  private verify = new Subject<void>();
  public verify$ = this.verify.asObservable();
  public reactiveForm:FormGroup;
  public ptype:boolean = false;
  public toaster:boolean = true;
  public error:boolean = false;
  back():void {
    this.closed.next(false);
  }
  close():void {
    this.closed.next(true);
  }
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private actionService:ActionsService) {}

  ngOnInit():void {
    this.reactiveForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.minLength(8), Validators.email]],
      phone: ['', [Validators.required]],
      pass: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]],
        repassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')],]
      }, {validators: CustomValidators.passChecker})
      
    })
  }
  register():void {
    
    const {firstName, lastName, email, pass} = this.reactiveForm.value;
    const registerUser = {firstName, lastName, email, password:pass.password};
    this.actionService.createSpinner();
    this.authService.register(registerUser).subscribe({
      next: res => {
        this.error = false;
        this.actionService.closeSpinner();
        this.verify.next()
        //this.closed.next(true);
        //this.actionService.createSuccessOverlay(SUCCESS_REGISTRATION);
      },
      error: er => {
        
        this.actionService.closeSpinner();
        this.error = true;
      }
    });
    
  }
  @HostListener('document:keydown.enter', ['$event'])
  onEnter(ev:KeyboardEvent) {
    this.register();
  }
}
