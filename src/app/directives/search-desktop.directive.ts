import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentRef, Directive, ElementRef, EventEmitter, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentPortal } from '@angular/cdk/portal';
import { SearchdesktopComponent } from '../components/searchdesktop/searchdesktop.component';
import { HttpService } from '../services/http.service';

@Directive({
  selector: '[searchDesk]'
})
export class SearchDesktopDirective {
  @Input() searchInf:any;
  private overlayRef:OverlayRef | null = null;
  private compRef!:ComponentRef<SearchdesktopComponent>;
  private elWidth:number;
  private productList:any = [];
  listenerFn = () => {};
  @Output() closed = new EventEmitter<void>();
  
  constructor(
    private el:ElementRef,
    private rend:Renderer2,
    private overlay:Overlay,
    private router:Router,
    private httpService:HttpService
  ) {
    this.elWidth = (this.el.nativeElement as HTMLElement).offsetWidth;
  }

  ngOnChanges(changes:SimpleChanges):void {
    const change = changes['searchInf'];
    console.log(change)
    if(!change.firstChange && change.currentValue !== '') {
      if(this.overlayRef === null) {
        this.rend.addClass(this.el.nativeElement, 'bordered');
        this.createOverlay(change.currentValue);
        
      } else {
        //this.getProductsByWord(change.currentValue);
        this.changeOverlayInput(change.currentValue)
      }
      
    }
    
    else if (!change.firstChange && change.currentValue === '' && this.overlayRef) {
      this.closedOverlay();
    }
    
    
  }

  ngOnInit():void {
    this.rend.listen(window, 'resize', () => {
      this.elWidth = (this.el.nativeElement as HTMLElement).offsetWidth;
      if(this.overlayRef) {
        this.overlayRef.updateSize({width:this.elWidth});
      }
    })
    //this.productList = this.serv.getNatsilebi();
  }

  createOverlay(searched:string):void {
   
    this.overlayRef = this.overlay.create({
      backdropClass:"backdrop-search",
      panelClass:"searchDesktop",
      hasBackdrop:false,
      width:this.elWidth,
      
      positionStrategy: this.overlay.position().
        flexibleConnectedTo(this.el)
        .withPositions([
          {
            originX: "start",
            originY: "bottom",
            overlayX: "start",
            overlayY: "top"
          }
        ]).withFlexibleDimensions(true).withDefaultOffsetY(-1)
      

    })
    
    //const input = this.filteredProducts(searched);
    const outlet = new ComponentPortal(SearchdesktopComponent);
    this.compRef = this.overlayRef.attach(outlet);
    this.compRef.setInput('word', searched);
    //this.getProductsByWord(searched);
    //this.compRef.setInput('filteredList', input);
    this.overlayRef.outsidePointerEvents().subscribe(val => {
      if(!(val.target as HTMLElement).classList.contains('outside')) {
        this.closedOverlay();
        this.closed.emit();
      }
    })
    this.compRef.instance.selected$.subscribe(val => {
      this.router.navigate(['/product', val]);
      this.closed.emit();
    })
  }

  changeOverlayInput(searched:string):void {
    //const input = this.filteredProducts(searched);
    //this.compRef.instance.filteredList = input;
    this.compRef.setInput('word', searched);
  }
  getProductsByWord(searched:string) {
    this.httpService.searchProductsByWord(searched).subscribe(prod => {
      console.log(prod);
      this.compRef.setInput('filteredList', prod);
    })
  }
  filteredProducts(searched:string) {
    return this.productList.filter(obj => obj.title.toLowerCase().includes(searched));
  }
  closedOverlay():void {
    this.rend.removeClass(this.el.nativeElement, 'bordered');
    this.overlayRef.detach();
    this.overlayRef = null;
    this.compRef = null;
  }
}
