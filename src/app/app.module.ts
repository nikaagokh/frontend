//common modules
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
//Angular Material Imports
import {MatIconModule} from '@angular/material/icon'
import {MatBadgeModule} from '@angular/material/badge'
import {CloseScrollStrategy, Overlay, OverlayModule} from '@angular/cdk/overlay';
import {MatInputModule} from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDialogModule} from '@angular/material/dialog';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipModule} from '@angular/material/tooltip';
import {MAT_MENU_SCROLL_STRATEGY, MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
//interceptors&&others
import { AuthInterceptor } from './interceptors/auth.interceptor';

//components&&directives&&pipes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchdesktopComponent } from './components/searchdesktop/searchdesktop.component';
import { SearchDesktopDirective } from './directives/search-desktop.directive';
import { SearchmobComponent } from './components/searchmob/searchmob.component';
import { BannerComponent } from './components/banner/banner.component';
import { CategorymobComponent } from './components/categorymob/categorymob.component';
import { SliderComponent } from './components/slider/slider.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { DotsliderDirective } from './directives/dotslider.directive';
import { PricePipe } from './pipes/price.pipe';
import { SubpricePipe } from './pipes/subprice.pipe';
import { SliderDirective } from './directives/slider.directive';
import { SubmenudesktopComponent } from './components/submenudesktop/submenudesktop.component';
import { SlideleftDirective } from './directives/slideleft.directive';
import { SubmenumobComponent } from './components/submenumob/submenumob.component';
import { RegisterComponent } from './components/register/register.component';
import { RenewComponent } from './components/renew/renew.component';
import { ProductComponent } from './components/product/product.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PriceComponent } from './components/price/price.component';
import { InfoComponent } from './components/info/info.component';
import { SimilarsComponent } from './components/similars/similars.component';
import { FixedpriceComponent } from './components/fixedprice/fixedprice.component';
import { HomeComponent } from './components/home/home.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AboutComponent } from './components/account/about/about.component';
import { AccountwrapperComponent } from './components/account/accountwrapper/accountwrapper.component';
import { LogoutsubmitComponent } from './components/account/logoutsubmit/logoutsubmit.component';
import { PasswordComponent } from './components/account/password/password.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CartComponent } from './components/cart/cart.component';
import { AddComponent } from './components/admin/add/add.component';
import { AdminwrapperComponent } from './components/admin/adminwrapper/adminwrapper.component';
import { EditComponent } from './components/admin/edit/edit.component';
import { AuthComponent } from './components/auth/auth.component';
import { BottomComponent } from './components/bottom/bottom.component';
import { CartwrapperComponent } from './components/cartwrapper/cartwrapper.component';
import { PriceCartComponent } from './components/price-cart/price-cart.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryfilterComponent } from './components/categoryfilter/categoryfilter.component';
import { CategorywrapComponent } from './components/categorywrap/categorywrap.component';
import { FooterComponent } from './components/footer/footer.component';
import { ImagezoomComponent } from './components/imagezoom/imagezoom.component';
import { MenudesktopComponent } from './components/menudesktop/menudesktop.component';
import { MenumobComponent } from './components/menumob/menumob.component';
import { MinicartComponent } from './components/minicart/minicart.component';
import { MinicartdesktopComponent } from './components/minicartdesktop/minicartdesktop.component';
import { MinifavoritesComponent } from './components/minifavorites/minifavorites.component';
import { MinifavoritesdesktopComponent } from './components/minifavoritesdesktop/minifavoritesdesktop.component';
import { MobilezoomComponent } from './components/mobilezoom/mobilezoom.component';
import { PinchzoomDirective } from './directives/pinchzoom.directive';
import { TouchDirective } from './directives/touch.directive';
import { ScrollDirective } from './directives/scroll.directive';
import { PriceDirective } from './directives/price.directive';
import { PinchDirective } from './directives/pinch.directive';
import { IntersectDirective } from './directives/intersect.directive';
import { HoveroutDirective } from './directives/hoverout.directive';
import { HoverfavDirective } from './directives/hoverfav.directive';
import { HoverDirective } from './directives/hover.directive';
import { ChatComponent } from './components/chat/chat.component';
import { Slider3dComponent } from './components/slider3d/slider3d.component';
import { SizeDirective } from './directives/size.directive';
import { FlowsliderDirective } from './directives/flowslider.directive';
import { SlideRightDirective } from './directives/slide-right.directive';
import { HighlighterDirective } from './directives/highlighter.directive';
import { HeaderDirective } from './directives/header.directive';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewComponent } from './components/review/review.component';
import { ReviewsmobComponent } from './components/reviewsmob/reviewsmob.component';
import { WritereviewComponent } from './components/writereview/writereview.component';
import { WarningComponent } from './components/warning/warning.component';
import { WelldoneComponent } from './components/welldone/welldone.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ChatmobComponent } from './components/chatmob/chatmob.component';
import { DebounceDirective } from './directives/debounce.directive';
import { CartFixedpriceComponent } from './components/cart-fixedprice/cart-fixedprice.component';
import { TagComponent } from './components/tag/tag.component';
import { TagwrapperComponent } from './components/tagwrapper/tagwrapper.component';
import { CarsComponent } from './components/cars/cars.component';
import { CarswrapperComponent } from './components/carswrapper/carswrapper.component';
import { AdminaboutComponent } from './components/admin/adminabout/adminabout.component';
import { AdminpasswordComponent } from './components/admin/adminpassword/adminpassword.component';
import { AdmincategoryComponent } from './components/admin/admincategory/admincategory.component';
import { SubmitComponent } from './components/submit/submit.component';
import { MessagesComponent } from './components/admin/messages/messages.component';
import { MessageswrapperComponent } from './components/admin/messageswrapper/messageswrapper.component';
import { GalleryDirective } from './directives/gallery.directive';
import { ChatDirective } from './directives/chat.directive';
import { VerifyComponent } from './components/verify/verify.component';
import { NewpasswordComponent } from './components/newpassword/newpassword.component';
import { VerifymailComponent } from './components/verifymail/verifymail.component';
import { MessageswrappermobComponent } from './components/admin/messageswrappermob/messageswrappermob.component';
import { MessagesmobComponent } from './components/admin/messagesmob/messagesmob.component';
import { BuyComponent } from './components/buy/buy.component';
import { WINDOW_PROVIDERS } from './window-token';

export function storageFactory() {
  return () => {
    function clearStorage() {
      /*
      let session = sessionStorage.getItem('register');
  
      if (session == null) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('cart');
      }
      sessionStorage.setItem('register', 's');
      */
  }
  window.addEventListener('load', clearStorage);
  };
}

export function scrollFactory(overlay:Overlay): () => CloseScrollStrategy {
  return () => overlay.scrollStrategies.close()

}
const globalRippleConfig:RippleGlobalOptions = {
  disabled:true,
  animation: {
    enterDuration:300,
    exitDuration:0
  }
}



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchDesktopDirective,
    SearchdesktopComponent,
    SearchmobComponent,
    BannerComponent,
    CategorymobComponent,
    SliderComponent,
    SkeletonComponent,
    DotsliderDirective,
    PricePipe,
    SubpricePipe,
    SliderDirective,
    SubmenudesktopComponent,
    SlideleftDirective,
    SubmenumobComponent,
    RegisterComponent,
    RenewComponent,
    ProductComponent,
    GalleryComponent,
    PriceComponent,
    InfoComponent,
    SimilarsComponent,
    FixedpriceComponent,
    HomeComponent,
    AboutusComponent,
    AboutComponent,
    AccountwrapperComponent,
    LogoutsubmitComponent,
    PasswordComponent,
    FavoritesComponent,
    CartComponent,
    AddComponent,
    AdminwrapperComponent,
    EditComponent,
    AuthComponent,
    BannerComponent,
    BottomComponent,
    CartwrapperComponent,
    PriceCartComponent,
    CategoryComponent,
    CategoryfilterComponent,
    CategorywrapComponent,
    FooterComponent,
    ImagezoomComponent,
    MenudesktopComponent,
    MenumobComponent,
    CartComponent,
    MinicartComponent,
    MinicartdesktopComponent,
    MinifavoritesComponent,
    MinifavoritesdesktopComponent,
    MobilezoomComponent,
    PinchzoomDirective,
    TouchDirective,
    ScrollDirective,
    PriceDirective,
    PinchDirective,
    IntersectDirective,
    HoveroutDirective,
    HoverfavDirective,
    HoverDirective,
    ChatComponent,
    Slider3dComponent,
    SizeDirective,
    FlowsliderDirective,
    SlideRightDirective,
    HighlighterDirective,
    HeaderDirective,
    ReviewsComponent,
    ReviewComponent,
    ReviewsmobComponent,
    WritereviewComponent,
    CategoryfilterComponent,
    WarningComponent,
    WelldoneComponent,
    SpinnerComponent,
    ChatmobComponent,
    DebounceDirective,
    CartFixedpriceComponent,
    TagComponent,
    TagwrapperComponent,
    CarsComponent,
    CarswrapperComponent,
    AdminaboutComponent,
    AdminpasswordComponent,
    AdmincategoryComponent,
    SubmitComponent,
    MessagesComponent,
    MessageswrapperComponent,
    GalleryDirective,
    ChatDirective,
    VerifyComponent,
    NewpasswordComponent,
    VerifymailComponent,
    MessageswrappermobComponent,
    MessagesmobComponent,
    BuyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatBadgeModule,
    ReactiveFormsModule,
    OverlayModule,
    MatDividerModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatListModule,
    MatTabsModule,
    MatDividerModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    {provide:MAT_RIPPLE_GLOBAL_OPTIONS, useValue:globalRippleConfig},
    {provide:MAT_MENU_SCROLL_STRATEGY, useFactory:scrollFactory, deps:[Overlay]},
    {provide:MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance:'outline'}},
    {provide:MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: {showDelay:500}},
    {
      provide:APP_INITIALIZER, useFactory:storageFactory, multi:true
    },
    WINDOW_PROVIDERS,
    {provide:Window, useValue:window}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
