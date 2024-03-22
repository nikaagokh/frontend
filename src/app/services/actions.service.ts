import { HttpErrorResponse } from '@angular/common/http';
import { ComponentRef, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WelldoneComponent } from '../components/welldone/welldone.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { timer } from 'rxjs';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { WarningComponent } from '../components/warning/warning.component';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  private overlaySpinner:OverlayRef;

  constructor(
    private snackbar:MatSnackBar,
    private dialog:MatDialog,
    private overlay:Overlay
  ) {}

  unAuthorizedErrorHandler(err?:HttpErrorResponse) {
    console.log(123);
    this.snackbar.open('თქვენ არ ხართ ავტორიზებული, გაიარეთ რეგისტრაცია ან ავტორიზაცია', 'დახურვა', {
      verticalPosition:'top',
      duration:5000,
      panelClass:'authorization-snack'
    });
    return [];
  }

  createSuccessOverlay(success:string):void {
    const overlay = this.overlay.create({
      hasBackdrop:false,
      panelClass:'success-message'
      
    })
    const outlet = new ComponentPortal(WelldoneComponent);
    const comp = overlay.attach(outlet);
    comp.instance.text = success;
    comp.instance.closed$.subscribe(_ => {
      overlay.detach();
    })
    timer(5000).subscribe(_ => {
      overlay.detach();
    })
  }

  createFailureOverlay(message:string) {
    const overlay = this.overlay.create({
      hasBackdrop:false,
      panelClass:'success-message'
      
    })
    const outlet = new ComponentPortal(WarningComponent);
    const comp = overlay.attach(outlet);
    comp.instance.text = message;
    comp.instance.closed$.subscribe(_ => {
      overlay.detach();
    })
    timer(5000).subscribe(_ => {
      overlay.detach();
    })
  }

  createSpinner():void {
    
    this.overlaySpinner = this.overlay.create({
        hasBackdrop:false,
        panelClass:'centered'
    })
    const outlet = new ComponentPortal(SpinnerComponent);
    const comp = this.overlaySpinner.attach(outlet);
  }

  closeSpinner():void {
    console.log(123);
    if(this.overlaySpinner) {
      console.log(1234);
      this.overlaySpinner.detach();
    }
  }

  addedAction(msg:string) {
    this.snackbar.open(msg, 'დახურვა', {
      verticalPosition:'top',
      duration:2000,
    })
  }


}
