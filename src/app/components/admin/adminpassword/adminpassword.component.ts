import { Component, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordChange } from 'src/app/interfaces/password-change.interface';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { CustomValidators } from '../../register/validators/Validators';
import { ActionsService } from 'src/app/services/actions.service';

@Component({
  selector: 'app-adminpassword',
  templateUrl: './adminpassword.component.html',
  styleUrls: ['./adminpassword.component.css']
})
export class AdminpasswordComponent {
  public formGroup:FormGroup;
  constructor(
    private actionService:ActionsService,
    private fb:FormBuilder,
    private authService:AuthService) {}
  ngOnInit():void {
    this.authService.isAuthenticated().subscribe();
    this.formGroup = this.fb.group({
      oldPassword: ['', Validators.required],
      pass: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]],
        repassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')],]
      }, {validators: CustomValidators.passChecker})
    });
    console.log(this.formGroup)
  }
  changePassword() {
    const enable = this.formGroup.controls['oldPassword'].value !== '' && !this.formGroup.controls['pass'].hasError('errorMatch')
    if(enable) {
      const {oldPassword, pass} = this.formGroup.value;
      const passwordChange:PasswordChange = {
        oldPassword:oldPassword,
        newPassword:pass.password     
        };
        this.actionService.createSpinner();
        this.authService.updatePassword(passwordChange).subscribe({
          next: (_) => {
            this.actionService.closeSpinner();
            this.actionService.createSuccessOverlay('თქვენ წარმატებით აღადგინეთ პაროლი');
          }, 
          error: (_) => {
            this.actionService.closeSpinner();
            this.actionService.createFailureOverlay('მოცემული პაროლი არასწორია');
          }
        })
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
    onEnter(ev:KeyboardEvent) {
    this.changePassword();
  }
    
}
