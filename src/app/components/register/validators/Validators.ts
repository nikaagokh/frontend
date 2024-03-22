import { AbstractControl, FormControl } from "@angular/forms";

export class CustomValidators{
    static noSpaceAllowed(control: FormControl){
        if(control.value != null && control.value.indexOf(' ') != -1){
            return {noSpaceAllowed: true}
        }
        return null;
    }

    static checkUserName(control: AbstractControl): Promise<any>{
        return userNameAllowed(control.value);
    }
    static checkEmail(control:AbstractControl) {
        const mailPattern = ['@gmail.com', '@yahoo.com', '@mail.ru'];
        const ind = control.value.indexOf('@');
        if(ind !== -1) {
            
            const after = control.value.substring(ind);
            console.log(after);
            if(mailPattern.includes(after)) {
                return null;
            }
            else {
                return {mailMessage: '* თქვენი მეილი უნდა იყოს რეალური'}
            }
            
        }
        else {
            console.log(control);
            return {mailMessage: '* თქვენი მეილი უნდა შეიცავდეს @ სიმბოლოს'}
        }  
        
    }
    static passChecker(control:AbstractControl) {
        const pass = control.get('password').value;
        const repass = control.get('repassword').value;
        if(pass !== '' && repass !== '') {
            if(pass === repass) {
                
                return null;
            }
            else {
                return {errorMatch: '* პაროლები არ ემთხვევა ერთმანეთს'}
            }
        }
        return null;
        
    }
    static 
}

function userNameAllowed(username: string){
    const takenUserNames = ['johnsmith', 'manojjha', 'sarahking'];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(takenUserNames.includes(username)){
                resolve({checkUsername: true});
            }
            else{
                resolve(null);
            }
        }, 5000);
    });
}