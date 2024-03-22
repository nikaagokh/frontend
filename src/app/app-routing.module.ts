import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { CartComponent } from './components/cart/cart.component';
import { AboutComponent } from './components/account/about/about.component';
import { AccountwrapperComponent } from './components/account/accountwrapper/accountwrapper.component';
import { PasswordComponent } from './components/account/password/password.component';
import { AddComponent } from './components/admin/add/add.component';
import { AdminwrapperComponent } from './components/admin/adminwrapper/adminwrapper.component';
import { EditComponent } from './components/admin/edit/edit.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { Slider3dComponent } from './components/slider3d/slider3d.component';
import { TagComponent } from './components/tag/tag.component';
import { CarsComponent } from './components/cars/cars.component';
import { AdminaboutComponent } from './components/admin/adminabout/adminabout.component';
import { AdminpasswordComponent } from './components/admin/adminpassword/adminpassword.component';
import { AdmincategoryComponent } from './components/admin/admincategory/admincategory.component';
import { adminGuard } from './guards/admin.guard';
import { MessagesComponent } from './components/admin/messages/messages.component';
import { MessageswrapperComponent } from './components/admin/messageswrapper/messageswrapper.component';

const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {
    path:'about', component:AboutusComponent
  },
  {
    path:'product/:id', component:ProductComponent,
  },
  {
    path:'tag/:id', component:TagComponent
  },
  {
    path:'category', component:CategoryComponent,
  },
  {
    path:'cars', component:CarsComponent
  },
  {
    path:'cart', component:CartComponent,
  },
  {
    path:'favorites', component:FavoritesComponent,
  },
  
  {
    path:'account', component:AccountwrapperComponent
  },
  
  /*
  {
    path:'account', component:AccountwrapperComponent,
    children: [
      {path:'about', component:AboutComponent},
      {path:'password', component:PasswordComponent},
      {path:'favorites', component:FavoritesComponent},
      {path:'cart', component:CartComponent},
    ]
  },
  */
  {
    path: 'account/favorites',
    component:FavoritesComponent,
  },
  
  {
    path: 'account/cart',
    component:CartComponent,
  },
  {
    path:'account/about',
    component:AboutComponent
  },
  {
    path:'account/password',
    component:PasswordComponent
  },
  {
    path:'skeleton',
    component:SkeletonComponent,
  },
  {
    path:'admin/aboutm', component:AdminaboutComponent,
  },
  {
    path:'admin/passm', component:AdminpasswordComponent,
  },
  {
    path:'admin/addm', component:AddComponent,
  },
  {
    path:'admin/addMinim', component:AdmincategoryComponent
  },
  {
    path:'admin',
    component:AdminwrapperComponent,
    canActivate:[adminGuard],
    children: [
      {
        path:'about', component:AdminaboutComponent,
      }, 
      {
        path:'pass', component:AdminpasswordComponent,
      }, 
      {
        path:'add', component:AddComponent,
      },
      {
        path:'edit', component:EditComponent,
      },
      {
        path:'addMini', component:AdmincategoryComponent
      },
      {
        path:'messages', component:MessageswrapperComponent
      }
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration:'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
