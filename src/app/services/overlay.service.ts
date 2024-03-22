import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, ElementRef, Inject, Injectable, Renderer2, RendererFactory2, forwardRef } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MenumobComponent } from '../components/menumob/menumob.component';
import { BehaviorSubject, Observable, Subject, catchError, map, timer } from 'rxjs';
import { SubmenumobComponent } from '../components/submenumob/submenumob.component';
import { RenewComponent } from '../components/renew/renew.component';
import { AuthComponent } from '../components/auth/auth.component';
import { RegisterComponent } from '../components/register/register.component';
import { MinicartComponent } from '../components/minicart/minicart.component';
import { ChatComponent } from '../components/chat/chat.component';
import { CategoryfilterComponent } from '../components/categoryfilter/categoryfilter.component';
import { MenudesktopComponent } from '../components/menudesktop/menudesktop.component';
import { MinifavoritesComponent } from '../components/minifavorites/minifavorites.component';
import { LogoutsubmitComponent } from '../components/account/logoutsubmit/logoutsubmit.component';
import { ImagezoomComponent } from '../components/imagezoom/imagezoom.component';
import { MobilezoomComponent } from '../components/mobilezoom/mobilezoom.component';
import { SearchmobComponent } from '../components/searchmob/searchmob.component';
import { ReviewsComponent } from '../components/reviews/reviews.component';
import { WritereviewComponent } from '../components/writereview/writereview.component';
import { ReviewsmobComponent } from '../components/reviewsmob/reviewsmob.component';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { ChatmobComponent } from '../components/chatmob/chatmob.component';
import { EditComponent } from '../components/admin/edit/edit.component';
import { SubmitComponent } from '../components/submit/submit.component';
import { ActionsService } from './actions.service';
import { MessageswrapperComponent } from '../components/admin/messageswrapper/messageswrapper.component';
import { VerifyComponent } from '../components/verify/verify.component';
import { NewpasswordComponent } from '../components/newpassword/newpassword.component';
import { VerifymailComponent } from '../components/verifymail/verifymail.component';
import { Message, MessageswrappermobComponent } from '../components/admin/messageswrappermob/messageswrappermob.component';
import { MessagesmobComponent } from '../components/admin/messagesmob/messagesmob.component';
import { BuyComponent } from '../components/buy/buy.component';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private renderer:Renderer2;
  private authenticated:boolean = false;
  private mobsize:boolean = true;
  private desktopMenuRef:OverlayRef | null = null;
  private overlaySearchMob:OverlayRef | null = null;
  public messagesRef:OverlayRef | null = null;
  public chatOpen:boolean = false;
  private chatOpened:Subject<void> = new Subject<void>();
  public chatOpened$:Observable<void> = this.chatOpened.asObservable();
  constructor(
    private overlay:Overlay,
    private bsheet:MatBottomSheet,
    private _dialog:MatDialog,
    private _snack:MatSnackBar,
    private breakpoint:BreakpointObserver,
    private router:Router,
    private httpService:HttpService,
    private authService:AuthService,
    private actionService:ActionsService,
    private rendererFactory:RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    /*
    this.authService.isAuthenticated().subscribe(x => {
      console.log(x);
    });
    */
    
    this.authService.authStateChange.subscribe(x => this.authenticated = x);
    this.breakpoint.observe(['(min-width:768px)']).subscribe((state:BreakpointState) => {
      if(state.matches) {
        this.mobsize = false;
      } else {
        this.mobsize = true;
      }
    })
  }
  
  getOpen() {
    return this.chatOpen
  }

  addBottomSheetParent(el:ElementRef) {
    const parent = (el.nativeElement as HTMLElement).parentElement;
    this.renderer.setStyle(parent, 'border-radius', '0.75rem 0.75rem 0 0');
  }

  routerLink() {
    if(this.router.url === '/') {
      scrollTo({top:0, behavior:'smooth'});
    } else {
      this.router.navigate(['/']);
    }
  }

  openMenu() {
    const overlayRef = this.overlay.create({
      hasBackdrop:true,
      panelClass:'base',
      scrollStrategy:this.overlay.scrollStrategies.block(),
      backdropClass: 'backdrop'
    });
    const outlet = new ComponentPortal(MenumobComponent);
    let comp:ComponentRef<MenumobComponent>;
    let menuArray;
    this.httpService.getRootCategoriesAndChildren().subscribe(menu => {
      menuArray = menu;
      comp = overlayRef.attach(outlet);
      comp.setInput('Menu', menu);
      comp.instance.closed$.subscribe(_ => {
        overlayRef.detach();
      })
      
      overlayRef.backdropClick().subscribe(_ => {
        overlayRef.addPanelClass('slide-out');
  
        timer(200).subscribe(_ => {
          overlayRef.detach();
        })
      })
      comp.instance.sub$.subscribe((x:any) => {
        const ref = this.overlay.create({
          backdropClass:'backdrop',
          scrollStrategy:this.overlay.scrollStrategies.block(),
          panelClass:'base',
          hasBackdrop:true
         });
         const outlet = new ComponentPortal(SubmenumobComponent);
         const comp = ref.attach(outlet);
         comp.setInput('submenu', menuArray[x].subcategories);

         ref.backdropClick().subscribe(_ => {
          ref.addPanelClass('slide-out');
          timer(200).subscribe(_ => {
          ref.detach();
          })
        })
       
        comp.instance.closed$.subscribe(x => {
          if(!x) {
            ref.addPanelClass('slide-out');
            ref.detachBackdrop();
            timer(200).subscribe(_ => {
              ref.detach();
            })
          } else {
            ref.detach();
            overlayRef.addPanelClass('slide-out')
            timer(200).subscribe(_ => {
              overlayRef.detach()
            })
          }
          
         })
       comp.instance.wiggle$.subscribe((val:boolean) => {
        timer(200).subscribe(_ => {
          ref.detach();
        })
       })
       comp.instance.submit$.subscribe((val:any) => {
        ref.detach();
        overlayRef.detach();
        this.router.navigate(['/category'], {queryParams: {yearId:val.yearId, categoryId:val.categoryId}})
       })
  })
  })
  
    
  }

  scrollTop():void {
    if(this.router.url === '/') {
      scrollTo({top:0, behavior:'smooth'})
    } else {
      this.router.navigate(['/']);
    }
  }

  openRenew():void {
    const bsheet = this.bsheet.open(RenewComponent, {
      backdropClass:'backdrop',
      panelClass:'renew',
      scrollStrategy:this.overlay.scrollStrategies.block(),
      autoFocus:true,
    })
    bsheet.afterDismissed().subscribe(_ => {

    })
  }

  openAuth():void {
    this.authService.isAuthenticated().subscribe(x => {
      if(x) {
        if(this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/account']);
        }
      } else {
        if(this.mobsize) {
          const bsheet = this.bsheet.open(AuthComponent, {
            backdropClass:'backdrop',
            panelClass:'auth',
            scrollStrategy:this.overlay.scrollStrategies.block(),
          })
          this.addBottomSheetParent(bsheet.componentRef.location);
          bsheet.afterDismissed().subscribe(x => {
            console.log('dismiss');
          })
          bsheet.instance.subj$.subscribe(_ => {
            bsheet.dismiss();
          })
          bsheet.instance.renew$.subscribe(_ => {
            const renewRef = this.overlay.create({
              hasBackdrop:true,
              panelClass:['renew', 'border-radius'],
              scrollStrategy:this.overlay.scrollStrategies.block(),
              backdropClass: 'backdrop'
            })
            const outlets = new ComponentPortal(RenewComponent);
            const comps = renewRef.attach(outlets);
            renewRef.backdropClick().subscribe(_ => {
              renewRef.detach();
            })
            comps.instance.closed$.subscribe(val => {
              if(val) {
                renewRef.detach();
                bsheet.dismiss();
              } else {
                renewRef.detach();
              }
            })
            comps.instance.renew$.subscribe(x => {
              
              renewRef.detach()
              bsheet.dismiss();
              const otpBsheet = this.bsheet.open(VerifymailComponent, {
                backdropClass:'backdrop',
                panelClass:['auth', 'border-radius'],
                scrollStrategy:this.overlay.scrollStrategies.block(),
              })
              otpBsheet.instance.closed$.subscribe(x => {
                otpBsheet.dismiss();
              })
              otpBsheet.instance.verified$.subscribe(x => {
                otpBsheet.dismiss();
                const newPassword = this.bsheet.open(NewpasswordComponent, {
                  backdropClass:'backdrop',
                  panelClass:['auth', 'border-radius'],
                  scrollStrategy:this.overlay.scrollStrategies.block(),
                })
                newPassword.instance.closed$.subscribe(_ => {
                  newPassword.dismiss();
                  localStorage.removeItem('otp');
                })
                newPassword.instance.renewed$.subscribe(x => {
                  localStorage.removeItem('otp');
                })
                newPassword.backdropClick().subscribe(_ => {
                  localStorage.removeItem('otp')
                })
              })
            })
          })
          bsheet.instance.reg$.subscribe(_ => {
            const ref = this.overlay.create({
              hasBackdrop:true,
              panelClass:['reg', 'border-radius'],
              scrollStrategy:this.overlay.scrollStrategies.block(),
              backdropClass: 'backdrop'
            })
            const outlet = new ComponentPortal(RegisterComponent);
            const comp = ref.attach(outlet);
            ref.backdropClick().subscribe(_ => {
              ref.detach();
            })
            comp.instance.closed$.subscribe(val => {
              if(val) {
                ref.detach();
                bsheet.dismiss();
              } else {
                ref.detach();
              }
            })
            comp.instance.verify$.subscribe(x => {
              ref.detach();
              bsheet.dismiss()
              const otpBsheet = this.bsheet.open(VerifyComponent, {
                backdropClass:'backdrop',
                panelClass:['auth'],
                scrollStrategy:this.overlay.scrollStrategies.block(),
              })
              this.addBottomSheetParent(otpBsheet.componentRef.location)
              otpBsheet.instance.closed$.subscribe(x => {
                otpBsheet.dismiss();
              })
              otpBsheet.instance.verified$.subscribe(x => {
                this.actionService.createSuccessOverlay('თქვენ წარმატებით გაიარეთ რეგისტრაცია');
                otpBsheet.dismiss();
              })
            })
          }) 
        }
        else {
          const dialog = this._dialog.open(AuthComponent, {
            backdropClass:'backdrop',
            panelClass:'auth',
            scrollStrategy:this.overlay.scrollStrategies.block(),
            width:'400px',
            autoFocus:false,
            restoreFocus:false,
          });
          dialog.componentInstance.subj$.subscribe(_ => {
            dialog.close();
          })
          dialog.componentInstance.renew$.subscribe(_ => {
            const dialogRenew = this._dialog.open(RenewComponent, {
              backdropClass:'transparent',
              scrollStrategy:this.overlay.scrollStrategies.block(),
              width:'400px',
              height:'500px',
              autoFocus:false,
              restoreFocus:false,
            });
            dialogRenew.componentInstance.closed$.subscribe(val => {
              if(val) {
                this._dialog.closeAll();
              }
              else {
                dialogRenew.close();
              }
            })
            dialogRenew.componentInstance.renew$.subscribe(_ => {
              dialog.close();
              dialogRenew.close();
              const verifyDialog = this._dialog.open(VerifymailComponent, {
                backdropClass:'transparent',
                scrollStrategy:this.overlay.scrollStrategies.block(),
                width:'400px',
                height:'500px',
                autoFocus:false,
                restoreFocus:false,
              })
              verifyDialog.componentInstance.closed$.subscribe(_ => {
                verifyDialog.close();
              })
              verifyDialog.componentInstance.verified$.subscribe(x => {
                verifyDialog.close();
                const newPassDialog = this._dialog.open(NewpasswordComponent, {
                  backdropClass:'transparent',
                  scrollStrategy:this.overlay.scrollStrategies.block(),
                  width:'400px',
                  height:'500px',
                  autoFocus:false,
                  restoreFocus:false,
                  })
                newPassDialog.componentInstance.closed$.subscribe(_ => {
                  localStorage.removeItem('otp');
                })
                newPassDialog.componentInstance.renewed$.subscribe(_ => {
                  localStorage.removeItem('otp');
                })
                newPassDialog.backdropClick().subscribe(_ => {
                  localStorage.removeItem('otp');
                })
              })
            })
          })
          dialog.componentInstance.reg$.subscribe(_ => {
            const dialogReg = this._dialog.open(RegisterComponent, {
              backdropClass:'transparent',
              scrollStrategy:this.overlay.scrollStrategies.block(),
              width:'400px',
              height:'500px',
              autoFocus:false,
              restoreFocus:false,
            });
            dialogReg.componentInstance.closed$.subscribe(val => {
              if(val) {
                this._dialog.closeAll();
              }
              else {
                dialogReg.close();
              }
            })
            dialogReg.componentInstance.verify$.subscribe(x => {
              this._dialog.closeAll();
              const otpDialog = this._dialog.open(VerifyComponent, {
                backdropClass:'transparent',
                scrollStrategy:this.overlay.scrollStrategies.block(),
                width:'400px',
                height:'500px',
                autoFocus:false,
                restoreFocus:false,
              })
              otpDialog.componentInstance.closed$.subscribe(x => {
                otpDialog.close();
              })
              otpDialog.componentInstance.verified$.subscribe(x => {
                timer(200).subscribe(x => {
                  window.location.reload();
                })
              })
            })
          })
          
        }
      }
    })
     
  }


  mobCart():void {
    if(this.mobsize) {
      const bsheet = this.bsheet.open(MinicartComponent, {
        scrollStrategy:this.overlay.scrollStrategies.block(),
        backdropClass:'backdrop',
        panelClass:'bottoms',
        
      })
      this.addBottomSheetParent(bsheet.componentRef.location);
      bsheet.afterDismissed().subscribe(x => {
        bsheet.dismiss()
      })
      bsheet.instance.close$.subscribe(_ => {
        bsheet.dismiss();
      })
      bsheet.instance.navigate$.subscribe(x => {
        bsheet.dismiss();
        if(x) {
          this.router.navigate(['/cart']);
        } else if(!x && this.router.url !== '/') {
          this.router.navigate(['/']);
        }
        })
    }
  }

  openChat():void {
    this.authService.adminGuard().subscribe(x => {
      if(x) {
        if(this.mobsize) {
          this.openMessagesMob()
        } else {
          this.openMessages();
        }
      } else {

        if(this.mobsize) {
          const bsheet = this.bsheet.open(ChatmobComponent, {
           backdropClass:'backdrop',
           panelClass:'chat',
           scrollStrategy:this.overlay.scrollStrategies.block(),
          })
          this.chatOpen = true;
          this.chatOpened.next();
          bsheet.instance.subj$.subscribe(_ => {
           this.chatOpen = false;
           bsheet.dismiss();
          })
    
          bsheet.instance.authed$.subscribe(val => {
            this.chatOpen = false;
            
            bsheet.dismiss();
            if(val) {
              this.openAuth();
            } else {
              this.openReg();
            }
          })

          bsheet.backdropClick().subscribe(x => {
            this.chatOpen = false;
          })
          
        }
        else {
         const dialog = this._dialog.open(ChatComponent, {
           position:{right:'2rem', bottom:'2rem'},
           panelClass:'chatdesk',
           backdropClass:'backdrop',
           scrollStrategy:this.overlay.scrollStrategies.block(),
           autoFocus:false,
           restoreFocus:false,
           enterAnimationDuration:200,
           exitAnimationDuration:200,
         })
         this.chatOpen = true;
         this.chatOpened.next();
         dialog.componentInstance.subj$.subscribe(_ => {
           
           dialog.close();
           this.chatOpen = false;
           console.log(this.chatOpen)
         })
         dialog.componentInstance.authed$.subscribe(val => {
           console.log(1233)
           dialog.close();
           this.chatOpen = false;
          if(val) {
            this.openAuth();
          } else {
            this.openReg();
          }
          
         })
        dialog.backdropClick().subscribe(x => {
          this.chatOpen = false;
        })
         
        }
      }
    })
  }

  public openReg():void {
    if(this.mobsize) {
      const bsheet = this.bsheet.open(RegisterComponent, {
        backdropClass:'backdrop',
        panelClass:['auth'],
        scrollStrategy:this.overlay.scrollStrategies.block(),
      })
      this.addBottomSheetParent(bsheet.componentRef.location);
      bsheet.instance.closed$.subscribe(_ => {
        bsheet.dismiss();
      })
      bsheet.instance.verify$.subscribe(x => {
        bsheet.dismiss()
        const otpBsheet = this.bsheet.open(VerifyComponent, {
          backdropClass:'backdrop',
          panelClass:['auth'],
          scrollStrategy:this.overlay.scrollStrategies.block(),
        })
        this.addBottomSheetParent(otpBsheet.componentRef.location)
        otpBsheet.instance.closed$.subscribe(x => {
          otpBsheet.dismiss();
        })
        otpBsheet.instance.verified$.subscribe(x => {
          this.actionService.createSuccessOverlay('თქვენ წარმატებით გაიარეთ რეგისტრაცია');
          otpBsheet.dismiss();
        })
      })
    } else {
      const dialog = this._dialog.open(RegisterComponent, {
        autoFocus:false,
        restoreFocus:false,
        backdropClass:'backdrop',
        scrollStrategy:this.overlay.scrollStrategies.block()
      })
      dialog.componentInstance.closed$.subscribe(_ => {
        dialog.close()
      })
    }
  }

  openFilter():void {
    const bsheet = this.bsheet.open(CategoryfilterComponent, {
      backdropClass:'backdrop',
      scrollStrategy:this.overlay.scrollStrategies.block(),
    })
    bsheet.instance.close$.subscribe(_ => {
      bsheet.dismiss();
    })
  }

  openMessagesMob():void {
    const bsheet = this.bsheet.open(MessageswrappermobComponent, {
      scrollStrategy:this.overlay.scrollStrategies.block(),
      backdropClass:'backdrop',
      panelClass:'bottoms',
      
    })
    this.chatOpen = true;
    this.chatOpened.next()
    
    bsheet.afterDismissed().subscribe(x => {
      bsheet.dismiss()
      this.chatOpen = false;
    })
    bsheet.instance.closed$.subscribe(_ => {
      bsheet.dismiss();
      this.chatOpen = false;
    })
    bsheet.instance.message$.subscribe((message:Message) => {

      const ref = this.overlay.create({
      backdropClass:'backdrop',
      scrollStrategy:this.overlay.scrollStrategies.block(),
      panelClass:'base-full',
      hasBackdrop:true
     });
     const outlet = new ComponentPortal(MessagesmobComponent);
     const comp = ref.attach(outlet);
     comp.setInput('submessage', message);
     ref.backdropClick().subscribe(_ => {
      ref.addPanelClass('slide-right');
      timer(200).subscribe(_ => {
        ref.detach();
      })
     })
     comp.instance.closed$.subscribe(x => {
      if(x) {
        this.chatOpen = false;
        ref.detach();
        bsheet.dismiss();
      } else {
        ref.addPanelClass('slide-right')
        timer(300).subscribe(_ => {
          ref.detach();
        })

      }
     })
     comp.instance.output$.subscribe(x => {
      bsheet.instance.messageChange(x);
     })
    })
    
  }

  openMessages():void {
    if(this.messagesRef === null) {
      this.messagesRef = this.overlay.create({
        panelClass:'menuDesktop',
        scrollStrategy:this.overlay.scrollStrategies.block(),
        hasBackdrop:true,
        backdropClass:'transparent'
      });
      this.chatOpen = true;
      this.chatOpened.next()
      const outlet = new ComponentPortal(MessageswrapperComponent);
      let comp:ComponentRef<MessageswrapperComponent>;
      comp = this.messagesRef.attach(outlet);
      /*
      this.httpService.getAllConversations().subscribe(x => {
        comp.setInput('conversations', x);
      })
      */
      this.messagesRef.backdropClick().subscribe(_ => {
        this.messagesRef.detach();
        this.messagesRef = null;
        this.chatOpen = false;
      })
    }
  }

  openMenuDesktop():void {
    if(this.desktopMenuRef === null) {
      this.desktopMenuRef = this.overlay.create({
        panelClass:'menuDesktop',
        scrollStrategy:this.overlay.scrollStrategies.block(),
        hasBackdrop:true,
        backdropClass:'transparent'
      });
      const outlet = new ComponentPortal(MenudesktopComponent);
      let comp:ComponentRef<MenudesktopComponent>;
      this.httpService.getRootCategoriesAndChildren().subscribe(menu => {
        comp = this.desktopMenuRef.attach(outlet);
        comp.setInput('sub', menu);
        comp.instance.closed$.subscribe(val => {
         
          this.router.navigate(['/category'], {queryParams: {yearId:val.yearId, categoryId:val.categoryId}})
          this.desktopMenuRef.detach();
          this.desktopMenuRef = null;
        })
        this.desktopMenuRef.backdropClick().subscribe(_ => {
          this.desktopMenuRef.detach();
          this.desktopMenuRef = null;
        })
      })
    }
  }

  openMiniFavorites():void {
    this.authService.isAuthenticated().subscribe(x => {
      if(!x) {
        this.authService.handleUnauthorized();
      } else {
        if(this.mobsize) {
          //this.closeSearch();
          const bsheet = this.bsheet.open(MinifavoritesComponent, {
            scrollStrategy:this.overlay.scrollStrategies.block(),
            backdropClass:'backdrop',
            panelClass:'bottoms',
            autoFocus:false,
            restoreFocus:false
          })
          bsheet.instance.subj$.subscribe(_ => {
            bsheet.dismiss()
          })
          bsheet.instance.navigate$.subscribe(x => {
            bsheet.dismiss();
            if(x) {
              this.router.navigate(['/favorites']);
            } else if(!x && this.router.url !== '/') {
              this.router.navigate(['/'])
            }
          })
        }
      }
    })
  }

  openLogout():void {
    if(this.mobsize) {
      const bsheet = this.bsheet.open(LogoutsubmitComponent, {
        scrollStrategy:this.overlay.scrollStrategies.block(),
        backdropClass:'backdrop',
        restoreFocus:false,
        autoFocus:false
      });
      bsheet.instance.closed$.subscribe((close:boolean) => {
        if(close) {
          this.authService.logout();
        }
        bsheet.dismiss();
        window.location.reload()
      })

    }
    else {
      
      const dialog = this._dialog.open(LogoutsubmitComponent, {
        scrollStrategy:this.overlay.scrollStrategies.block(),
        backdropClass:'backdrop',
        autoFocus:false,
        restoreFocus:false,
        exitAnimationDuration:200,
        width:'450px',
        height:'350px',
        enterAnimationDuration:200,
        
      })
      dialog.componentInstance.closed$.subscribe((val:boolean) => {
        if(val) {
          this.authService.logout();
        }
        dialog.close();
        window.location.reload();
        //
      })
      
    }
  }

  snackBar(message:string):void {
    this._snack.open(message, 'დახურვა', {
      duration:2500,
      verticalPosition:'top',
      
    })
  }

  openZoom(image:string | string[]):void {
    if(!this.mobsize) {
      const dialog = this._dialog.open(ImagezoomComponent, {
        autoFocus:false,
        restoreFocus:false,
        backdropClass:'backdrop',
       
        panelClass:'zoomdesk',
        exitAnimationDuration:200,
        data: {
          image:image,
        }
      });
      dialog.componentInstance.closed$.subscribe(_ => {
        dialog.close();
      })
      dialog.componentInstance.fullScreen$.subscribe((val:boolean) => {
        if(val) {
          dialog.updateSize(`100vw`, `${innerHeight}px`);
          dialog.addPanelClass('fullsize');
        } else {
          dialog.updateSize('500px', '500px');
          dialog.removePanelClass('fullsize');
        }
      })
    
    }
    else {
      
     const bsheet = this.bsheet.open(MobilezoomComponent, {
      autoFocus:false,
      backdropClass:'backdrop',
      panelClass:'mobzoom',
      data: {
        image:image,
      }
     })
     bsheet.instance.subj$.subscribe(_ => {
      bsheet.dismiss();
     })
    }
  }

  openSearchMob():void {
    if(this.overlaySearchMob === null) {
      this.overlaySearchMob = this.overlay.create({
          panelClass:'searchmob',
          scrollStrategy:this.overlay.scrollStrategies.block(),
          hasBackdrop:false,
      });

      const outlet = new ComponentPortal(SearchmobComponent);
      const comp = this.overlaySearchMob.attach(outlet);
      comp.instance.close$.subscribe(_ => {
        this.overlaySearchMob.addPanelClass('slide-search');
        timer(200).subscribe(_ => {
          this.closeSearchMob();
        })
      })
      this.overlaySearchMob.outsidePointerEvents().subscribe(val => {
        if(!(val.target as HTMLElement).classList.contains('outside')) {
          this.closeSearchMob();     
        }
      })
      comp.instance.slide$.subscribe(val => {
        if(!val) {
          this.overlaySearchMob.addPanelClass('slide-search');
          timer(200).subscribe(_ => {
            
            this.closeSearchMob();
          })
        } 
      })
      comp.instance.submit$.subscribe(x => {
        this.closeSearchMob();
        this.router.navigate(['/product/', x])
      })
    }
  }

  closeSearchMob():void {
    this.overlaySearchMob.detach();
    this.overlaySearchMob = null;
  }

  openReview(prodId:number):void {
    this.httpService.getCommentsOnProduct(prodId).subscribe(x => {
      if(this.mobsize) {
        console.log(x)
        const bsheet = this.bsheet.open(ReviewsmobComponent, {
            backdropClass:'backdrop',
            panelClass:'rev',
            scrollStrategy:this.overlay.scrollStrategies.block(),
            autoFocus:false,
            restoreFocus:false,
            data:x
         })
         this.addBottomSheetParent(bsheet.componentRef.location)
         bsheet.componentRef.setInput('reviews', x)
         bsheet.instance.close$.subscribe(_ => {
          bsheet.dismiss();
         })
         bsheet.instance.write$.subscribe(_ => {
          this.authService.isAuthenticated().subscribe(x => {
            if(!x) {
              this.authService.handleUnauthorized()
            } else {
              const writeReview = this.overlay.create({
                hasBackdrop:true,
                panelClass:['renew', 'border-radius'],
                scrollStrategy:this.overlay.scrollStrategies.block(),
                backdropClass: 'backdrop'
              })
              const outlets = new ComponentPortal(WritereviewComponent);
              const comp = writeReview.attach(outlets);
              comp.setInput('productId', prodId);
              comp.instance.back$.subscribe(_ => {
                writeReview.detach();
              })
              comp.instance.close$.subscribe(_ => {
                writeReview.detach();
                bsheet.dismiss();
              })
              comp.instance.submit$.subscribe(_ => {
                writeReview.detach();
                bsheet.dismiss();
                //do smth
              })
              writeReview.backdropClick().subscribe(_ => {
                writeReview.detach();
                bsheet.dismiss();
              })
             }
            })
          })
      }
      else {
        const dialog = this._dialog.open(ReviewsComponent, {
          backdropClass:'backdrop',
          panelClass:'auth',
          scrollStrategy:this.overlay.scrollStrategies.block(),
          width:'400px',
          autoFocus:false,
        });
        dialog.componentRef.setInput('reviews', x);
        dialog.componentInstance.write$.subscribe(_ => {
          this.authService.isAuthenticated().subscribe(x => {
            if(!x) {
              this.authService.handleUnauthorized();
            } else {
              const dialogWriteReview = this._dialog.open(WritereviewComponent, {
                backdropClass:'transparent',
                scrollStrategy:this.overlay.scrollStrategies.block(),
                width:'400px',
                height:'400px',
                autoFocus:false,
                restoreFocus:false,
              })
              dialogWriteReview.componentRef.setInput('productId', prodId);
              dialogWriteReview.componentInstance.back$.subscribe(_ => {
                dialogWriteReview.close();
              })
              dialogWriteReview.componentInstance.close$.subscribe(_ => {
                this._dialog.closeAll();
              })
            }
          })
        })
        dialog.componentInstance.close$.subscribe(_ => {
          dialog.close();
        })
      }
    })
       


  }

  openWriteReview(prodId:number):void {
    this.authService.isAuthenticated().subscribe(x => {
      if(!x) {
        this.authService.handleUnauthorized();
      } else {
        if(this.mobsize) {
          const bsheet = this.bsheet.open(WritereviewComponent, {
          backdropClass:'backdrop',
          panelClass:'bottoms',
          scrollStrategy:this.overlay.scrollStrategies.block(),
          autoFocus:false,
          restoreFocus:false
       })
       this.addBottomSheetParent(bsheet.componentRef.location)
       bsheet.componentRef.setInput('productId', prodId);
       bsheet.instance.back$.subscribe(_ => {
        bsheet.dismiss();
       })
       bsheet.instance.close$.subscribe(_ => {
        bsheet.dismiss();
       })

    } else {
      const dialog = this._dialog.open(WritereviewComponent, {
        backdropClass:'backdrop',
        scrollStrategy:this.overlay.scrollStrategies.block(),
        width:'400px',
        height:'400px',
        autoFocus:false,
        restoreFocus:false
      })
      dialog.componentRef.setInput('productId', prodId);
      dialog.componentInstance.close$.subscribe(_ => {
        dialog.close();
      })
      dialog.componentInstance.back$.subscribe(_ => {
        dialog.close()
      })
    }}
    })
  }

  editProduct(id:number):void {
    this.httpService.getProductInf(id).subscribe(x => {
      if(this.authService.isAdmin()) {
        const dialog = this._dialog.open(EditComponent, {
          autoFocus:false,
            backdropClass:'backdrop',
            width:'700px',
            height:'500px',
            panelClass:'slide-bottom',
            exitAnimationDuration:200,
            data: {
              item:x,
            }
        });
        dialog.componentInstance.closed$.subscribe(val => {
          const dialog2 = this._dialog.open(SubmitComponent, {
            scrollStrategy:this.overlay.scrollStrategies.block(),
            backdropClass:'backdrop',
            autoFocus:false,
            restoreFocus:false,
            exitAnimationDuration:200,
            width:'450px',
            height:'350px',
            enterAnimationDuration:200,
            
          })
          dialog2.componentInstance.closed$.subscribe(_ => {
            dialog.close();
          })
          dialog2.componentInstance.submitted$.subscribe(_ => {
            this.deleteProduct(id).pipe(
              catchError(e => {
                this.actionService.closeSpinner();
                this.actionService.createFailureOverlay('პროდუქტი ვერ წაიშალა')
                dialog2.close();
                dialog.close();
                return []
              }),
            ).subscribe(_ => {
              this.actionService.closeSpinner();
              this.actionService.createSuccessOverlay('პროდუქტი წარმატებით წაიშალა');
              dialog2.close();
              dialog.close();
              this.router.navigate(['/'])
            })
          })
        })
        dialog.componentInstance.submit$.subscribe(val => {
          
        })
      }
    })
   
  }

  openDeleteSubmit(id:number) {
    if(this.mobsize) {
      const bsheet = this.bsheet.open(SubmitComponent, {
        scrollStrategy:this.overlay.scrollStrategies.block(),
        backdropClass:'backdrop'
      });
      bsheet.instance.closed$.subscribe(_ => {
        bsheet.dismiss();
      })
      bsheet.instance.submitted$.subscribe(_ => {
        this.deleteProduct(id);
      })

    }
    else {
      const dialog = this._dialog.open(SubmitComponent, {
        scrollStrategy:this.overlay.scrollStrategies.block(),
        backdropClass:'backdrop',
        autoFocus:false,
        restoreFocus:false,
        exitAnimationDuration:200,
        width:'450px',
        height:'350px',
        enterAnimationDuration:200,
        
      })
      dialog.componentInstance.closed$.subscribe(_ => {
        dialog.close();
      })
      dialog.componentInstance.submitted$.subscribe(_ => {
        this.deleteProduct(id).subscribe(_ => {
          this.actionService.closeSpinner();
          this.actionService.createSuccessOverlay('პროდუქტი წარმატებით წაიშალა');
        })
      })
      
    }
  }

  deleteProduct(id:number) {
    this.actionService.createSpinner();
    return this.httpService.deleteProduct(id).pipe(
      catchError(e => {
        this.actionService.closeSpinner();
        this.actionService.createFailureOverlay('პროდუქტი ვერ წაიშალა')
        return []
      })
    )
  }

  openBuyOption():void {
    
    this.authService.isAuthenticated().subscribe(x => {
      if(!x) {
        this.authService.handleUnauthorized();
      } else {
          const height = this.mobsize ? '70%' : '400px'
          const dialog = this._dialog.open(BuyComponent, {
            scrollStrategy:this.overlay.scrollStrategies.block(),
            backdropClass:'backdrop',
            autoFocus:false,
            restoreFocus:false,
            exitAnimationDuration:200,
            width:'450px',
            height:height,
            enterAnimationDuration:200,
          })
          dialog.componentInstance.closed$.subscribe(_ => {
            dialog.close();
          })
        }
      })
    }
      

}
