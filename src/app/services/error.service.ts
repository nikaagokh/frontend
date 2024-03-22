import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snack:MatSnackBar) {}

  unAuthorizedErrorHandler(err:HttpErrorResponse) {
    console.log(12);
    if(err.status === 401) {
      this.snack.open('გაიარეთ რეგისტრაცია')
    }
    return of(null)
  }
}
