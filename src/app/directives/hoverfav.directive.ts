import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { MinifavoritesdesktopComponent } from '../components/minifavoritesdesktop/minifavoritesdesktop.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ActionsService } from '../services/actions.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Directive({
  selector: '[hovfav]'
})
export class HoverfavDirective {
  private overlayRef:OverlayRef = null;
  private comp:any;
  private cartSize:boolean = false;
  constructor(
    private el:ElementRef<HTMLElement>,
    private overlay:Overlay,
    private router:Router,
    private breakpoint:BreakpointObserver,
    private authService:AuthService
    ) { }
  ngOnInit():void {
    this.breakpoint.observe(['(min-width:992px)']).subscribe((state:BreakpointState) => {
      if(state.matches) {
        this.cartSize = true;
      } else {
        this.cartSize = false;
      }
    })
  }
  @Input('appHover') prod:any;
  @Input() val:boolean;
  @Input('hovout') type:string;
  @HostListener('mousedown') 
  onChange() {
      this.authService.isAuthenticated().subscribe(x => {
        if(!x) {
          this.authService.handleUnauthorized();
        } else {
          if(this.cartSize && this.overlayRef === null) {
              this.overlayRef = this.overlay.create({
                backdropClass:"transparent",
                panelClass:"minicartDesktop",
                hasBackdrop:true,
                
                positionStrategy: this.overlay.position().
                  flexibleConnectedTo(this.el)
                  .withPositions([
                    {
                      originX: "center",
                      originY: "bottom",
                      overlayX: "center",
                      overlayY: "top"
                    }
                  ]).withDefaultOffsetY(-10).withFlexibleDimensions(true),
                
          
              })
              const comp = new ComponentPortal(MinifavoritesdesktopComponent);
              const ref = this.overlayRef.attach(comp);
              /*
              this.rend.listen(this.overlayRef.overlayElement, 'mouseleave', () => {
                this.overlayRef.detach();
              })
              */
             /*
             this.rend.listen(window, 'scroll', () => {
              this.overlayRef.addPanelClass('scale-down');
              this.overlayRef.detachBackdrop();
              interval(1000).pipe(delay(150), take(1)).subscribe(_ => {
                this.overlayRef.detach();
                this.overlayRef = null;
              })
             })
             */
              ref.instance.close$.subscribe(_ => {
                this.overlayRef.detach();
                this.overlayRef = null;
              })
              this.overlayRef.backdropClick().subscribe(_ => {
                this.overlayRef.detach();
                this.overlayRef = null;
              })
              ref.instance.route$.subscribe(_ => {
                this.overlayRef.detach();
                this.overlayRef = null;
                this.router.navigate(['/favorites'])
              })
            }
          }
        })
     }
  }
