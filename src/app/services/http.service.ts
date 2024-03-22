import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable, forwardRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, of, shareReplay, tap, throwError } from 'rxjs';
import {Category } from '../interfaces/root-categories.interface';
import { CategoryChildren } from '../interfaces/children-categories.interface';
import { TagProduct } from '../interfaces/tag-product.interface';
import { ProductCategory } from '../interfaces/product-category-paginator.interface';
import { ProductTag } from '../interfaces/product-tag-paginator.interface';
import { Product } from '../interfaces/product.interface';
import { Comment } from '../interfaces/comment.interface';
import { ProductFilter } from '../interfaces/product-filter.interface';
import { AuthService } from './auth.service';
import { CartProduct } from '../interfaces/cart-product.interface';
import { ErrorService } from './error.service';
import { OverlayService } from './overlay.service';
import { ActionsService } from './actions.service';
import { ProductComponent } from '../components/product/product.component';
import { Router } from '@angular/router';
import { WINDOW } from '../window-token';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private auth:boolean = false;
  private cartObject:CartProduct;
  private cart:BehaviorSubject<CartProduct> = new BehaviorSubject<CartProduct>({});
  public cart$ = this.cart.asObservable();

  constructor(
    private http:HttpClient,
    private authService:AuthService,
    private actionService:ActionsService,
    private router:Router,
    @Inject(WINDOW) private window:Window
    ) {
      this.window.location.origin;
      this.authService.reload$.subscribe(_ => {
        this.getCartProducts().subscribe();
        this.getFavoritedProducts().subscribe()
      })
      this.authService.isAuthenticated().subscribe(auth => this.auth = auth);
    }
  

  private favArray:Product[] = [];
  private fav:BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public fav$ = this.fav.asObservable();


  private cartNumber:Subject<number> = new Subject<number>();
  //public cartNumber$:Observable<number> = this.cartNumber.asObservable();
  private favNumber:Subject<number> = new Subject<number>();
  public favNumber$:Observable<number> = this.favNumber.asObservable();

  public cartNumber$:Observable<number> = this.cart$.pipe(
    map((cartProduct) => {
      const total = cartProduct.products?.reduce((acc, curr) => {
        return acc + curr.quantity;
      }, 0);
      return total;
    })
  )

  //admin methods

  getAllConversations() {
    return this.http.get('/api/chat/all').pipe(
      catchError(e => [])
    )
  }

  addBrand(formData:FormData) {
    this.actionService.createSpinner();
    return this.http.post(`/api/categories/add/brand`, formData).pipe(
      map((o) => {
        this.actionService.closeSpinner();
        this.actionService.createSuccessOverlay('მწარმოებელი წარმატებით დაემატა');
        window.location.reload();
        return o
      }),
      catchError(e => {
        this.actionService.closeSpinner();
        this.actionService.createFailureOverlay('მწარმოებელი ვერ დაემატა, სცადეთ მოგვიანებით');
        return [];
      })
    )
  }

  addModel(obj:any) {
    this.actionService.createSpinner();
    return this.http.post(`/api/categories/add/model`, obj).pipe(
      map((o) => {
        this.actionService.closeSpinner();
        this.actionService.createSuccessOverlay('მოდელი წარმატებით დაემატა');
        window.location.reload();
        return o;
      }),
      catchError(e => {
        this.actionService.closeSpinner();
        this.actionService.createFailureOverlay('მოდელი ვერ დაემატა, სცადეთ მოგვიანებით');
        return [];
      })
    )
  }

  addModelYear(formData:FormData) {
    this.actionService.createSpinner();
    return this.http.post(`/api/categories/add/rel`, formData).pipe(
      map((o) => {
        this.actionService.closeSpinner();
        this.actionService.createSuccessOverlay('მოდელი წარმატებით დაემატა');
        window.location.reload();
        return o;
      }),
      catchError(e => {
        this.actionService.closeSpinner();
        this.actionService.createFailureOverlay('მოდელი ვერ დაემატა, სცადეთ მოგვიანებით');
        return [];
      })
    )
  }

 

  addSeen(id:number) {
    return this.http.get(`/api/chat/seen/${id}`)
  }

  getMessagesIfAvailable() {
    return this.http.get(`/api/chat/unseen/messages`).pipe(
      catchError(e => [])
    )
  }

  getNotSeenMessages() {
    return this.http.get(`/api/chat/notseen/messages`)
  }

  getMessagesInConversation(id:number) {
    return this.http.get(`/api/chat/messages/${id}`)
  }


  getRootCategories():Observable<Category[]> {
    return this.http.get<Category[]>('/api/categories/roots').pipe(
      catchError(err => [])
    )
  }
  getRootCategoriesAndChildren() {
    return this.http.get('/api/categories/full').pipe(
      catchError(err => [])
    )
  }
  getRootCategoriesAndChildrenAdmin() {
    return this.http.get('/api/categories/full/admin').pipe(
      catchError(e => [])
    )
  }

  getChildrenOfCategory(id:number):Observable<CategoryChildren[]> {
    return this.http.get<CategoryChildren[]>(`/api/categories/children/${id}`).pipe(
      catchError(this.categoryrenError)
    );
  }
  getAncestorsOfCategory(id:number):Observable<Category[]> {
    return this.http.get<Category[]>(`/api/categories/ancestors/${id}`).pipe(
      catchError(this.categoryrenError)
    );
  }
  getBreadcrumbCategories(id:number):Observable<Category[]> {
    return this.http.get<Category[]>(`/api/categories/breadcrumb/${id}`).pipe(
      catchError(this.categoryrenError)
    )
  }

  getHomePageProducts():Observable<TagProduct[]> {
    return this.http.get<TagProduct[]>('/api/tagproduct/home').pipe(
      catchError(err => [])
    )
  }

  getTags() {
    return this.http.get('/api/tagproduct/alltags').pipe(
      catchError(er => [])
    )
  }
  getYears() {
    return this.http.get('/api/')
  }

  addProduct(formData:FormData) {
    this.actionService.createSpinner();
    return this.http.post('/api/product/add', formData).pipe(
      map((val) => {
        this.actionService.closeSpinner();
        this.actionService.createSuccessOverlay('პროდუქტი წარმატებით დაემატა')
        return val;
      }),
      catchError(e => this.handleProductAddingError(e))
    )
  }

  editProduct(formData:FormData) {
    this.actionService.createSpinner();
    return this.http.post('/api/product/edit', formData).pipe(
      map((obj) => {
        this.actionService.closeSpinner();
        this.actionService.createSuccessOverlay('პროდუქტი წარმატებით შეიცვალა');
        window.location.reload();
        return obj;
      }),
      catchError(e => this.handleProductEditingError(e))
    )
  }

  getProductByVinCode(vin:string) {
    console.log(vin)
    return this.http.get(`/api/product/vincode/${vin}`).pipe(
      catchError(e => [])
    )
  }

  getProductInf(id:number) {
    return this.http.get(`/api/product/inf/${id}`).pipe(
      catchError(e => [])
    )
  }

  deleteProduct(id:number) {
    return this.http.delete(`/api/product/delete/${id}`)
  }

  //Products

  getProductsByCategoryYear(yearId:number, page:number) {
    return this.http.get(`/api/product/categoryYear/${yearId}/${page}`).pipe(
      catchError(e => [])
    )
  }


  getProductsByCategory(id:number):Observable<ProductCategory> {
    return this.http.get<ProductCategory>(`/api/product/category/${id}`).pipe(
      catchError(err => [])
    )
  }

  getTagName(id:number) {
    return this.http.get(`/api/tagproduct/name/${id}`).pipe(
      catchError(e => [])
    )
  }

  getProductByTag(id:number, page:number) {
    return this.http.get(`/api/product/tag/${id}/${page}`).pipe(
      catchError(e => [])
    )
  }

  getOneProduct(id:number):Observable<any> {
    return this.http.get<any>(`/api/product/${id}`).pipe(
      catchError(err => this.handleOneProductError(err))
    )
  }

  searchProductsByWord(word:string):Observable<Product[]> {
    return this.http.get<Product[]>(`/api/product/searchby/${word}`).pipe(
      catchError(err => [])
    )
  }
  /*
  product:this.httpService.getProductById(id),
  breadcrumb:this.httpService.getBreadcrumbForProduct(id),
  reviews:this.httpService.getReviewsOnProduct(id),
  similars:this.httpService.getSimilars(id)
  */
  getProductById(id:number) {
    return this.http.get(`/api/product/getby/${id}`).pipe(
      catchError(err => [])
    )
  }

  getSimilarProducts(id:number) {
    return this.http.get(`/api/product/similars/${id}`).pipe(
      catchError(er => [])
    )
  }

  getCarProducts(page:number) {
    return this.http.get(`/api/product/cars/${page}`).pipe(
      catchError(er => [])
    )
  }

  getCommentsOnProduct(prodId:number) {
    return this.http.get(`/api/comments/all/post/${prodId}`).pipe(
      catchError(er => [])
    )
  }
  
  
  //UserSpecific Methods
  getComments(id:number) {
    return this.http.get(`/api/product/comments/${id}`).pipe(
      catchError(er => [])
    )
  }
  getMiniComments(id:number) {
    console.log(id)
    return this.http.get(`/api/product/minicomments/${id}`).pipe(
      catchError(er => [])
    )
  }

  writeComment(productId:number, comment:string, rate:number) {
    return this.http.post('/api/comments/add/comment', {
      comment,
      productId,
      rate
    })
  }

  getFavoritedProducts():Observable<Product[]> {
    return this.http.get<Product[]>('/api/product/favorites/user').pipe(
      map((product) => {
        this.favArray = product;
        this.fav.next(this.favArray);
        return product
      }),
      catchError(err => [])
    )
  }

  getTopRatedProducts():Observable<Product[]> {
    return this.http.get<Product[]>('/api/product/top').pipe(
      catchError(err => [])
    )
  }

  getAllCommentsOnProduct(id:number):Observable<Comment[]> {
    return this.http.get<Comment[]>(`/api/comments/all/${id}`).pipe(
      catchError(err => [])
    )
  }

  getProductsByFilter(filter:ProductFilter):Observable<Product[]> {
    const {category, minPrice, maxPrice} = filter;
    const categoryString = Array.isArray(category) ? category.join(',') : category.toString();
    let params = new HttpParams()
      .set('category', categoryString)
      .set('minPrice', minPrice.toString())
      .set('maxPrice', maxPrice.toString());
    return this.http.get<Product[]>(`/api/product/filter`, {params}).pipe(
      catchError(err => [])
    )
  }

  getUserInformation():Observable<any> {
    return this.http.get('/api/user/myInf').pipe(
      catchError(err => this.handleRedirect(err))
    )
  }

  manageFavorites(product:Product):Observable<any> {
    console.log(product);
    return this.http.post<any>(`/api/favorites/manage`, {id:product.id}).pipe(
      tap((result) => {
        if(result.favorited) {
          this.favArray.push(product);
          this.fav.next(this.favArray);
          this.actionService.addedAction('პროდუქტი დაემატა ფავორიტებში');
        } else {
          this.favArray = this.favArray.filter((prod) => prod.id !== product.id);
          this.fav.next(this.favArray);
          this.actionService.addedAction('პროდუქტი წაიშალა ფავორიტებიდან');
        }
      }),
      catchError(err => this.actionService.unAuthorizedErrorHandler(err)),
    )
  }

  clearFavorites():Observable<any> {
    return this.http.delete('/api/favorites/delete').pipe(
      tap(() => this.actionService.addedAction('ფავორიტების სია წაიშალა')),
      catchError(this.unAuthorizedErrorHandler)
    )
  }

  addToCart(product:Product):Observable<any> {
    if(this.auth) {
      return this.handleAddToServer(product)
    } else {
      return this.handleAddToLocalStorage(product);
    }
  }

  handleAddToLocalStorage(product:Product):Observable<any> {
    console.log(product)
    const exists = this.cartObject.products?.find(obj => obj.id === product.id);
    if(exists) {
      this.cartObject.products.map((prod) => {
        if(prod.id === product.id) {
          prod.quantity++;
        }
      })
      localStorage.setItem('cart', JSON.stringify(this.cartObject));
      this.cart.next(this.cartObject);
  }
  else {
    const qty = 1;
    product.quantity = qty;
    this.cartObject.products.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cartObject));
    this.cart.next(this.cartObject);
  }
  this.actionService.addedAction('პროდუქტი დაემატა კალათაში');
  return of(null);
}

handleAddToServer(product:Product):Observable<any> {
  return this.http.post('/api/cart/add', {id:product.id}).pipe(
    map((result:any) => {
      console.log('server add');
      const exists = this.cartObject.products?.find(obj => obj.id === result.productId);
      if(exists) {
        this.cartObject.products.map((prod) => {
          if(prod.id === exists.id) {
            prod.quantity = result.quantity;
          }
        })
        this.cart.next(this.cartObject);
      } else {
        product.quantity = 1;
        this.cartObject.products.push(product);
        this.cart.next(this.cartObject);
      }
      this.actionService.addedAction('პროდუქტი დაემატა კალათაში');
    }),
    catchError(this.unAuthorizedErrorHandler)
  )
}

  removeFromCart(product:Product, rem:boolean):Observable<any> {
    //const auth = this.authService.isAuthenticated();
    if(this.auth) {
      return this.handleRemoveFromServer(product, rem);
    } else {
      return this.handleRemoveFromLocal(product, rem);
    }
  }

  handleRemoveFromServer(product:Product, clear:boolean) {
    return this.http.post('/api/cart/remove', {id:product.id, clear:clear}).pipe(
      map((result:any) => {
        const exists = this.cartObject.products?.find(obj => obj.id === result.productId);
        if(exists) {
          console.log(exists);
          this.cartObject.products.map((prod, i) => {
            if(prod.id === exists.id) {
              console.log(prod);
              if(result.quantity >= 1) {
                console.log('metia');
                prod.quantity = prod.quantity - 1;
              } else {
                console.log('splice')
                this.cartObject.products.splice(i,1);
              }
            }
          })
          //this.cartObject.discount = discount;
          //this.cartObject.total = total;
          this.cart.next(this.cartObject);
          this.actionService.addedAction('პროდუქტი წაიშალა კალათიდან');
        }

      }),
      catchError(err => {
        console.log(err);
        return [err]
      })
    )
  }

  handleRemoveFromLocal(product:Product, rem:boolean):Observable<any> {
    const index = this.cartObject.products.indexOf(product);
    if(rem) {
      this.cartObject.products.map((a, index:number) => {
        if(product.id === a.id) {
          this.cartObject.products.splice(index,1);
        }
      })
      localStorage.setItem('cart', JSON.stringify(this.cartObject));
      this.cart.next(this.cartObject);
    } else {
      this.cartObject.products.map((a, index:number) => {
        if(product.id === a.id) {
          if(this.cartObject.products[index].quantity > 1) {
            this.cartObject.products[index].quantity--;
          } else {
            this.cartObject.products.splice(index,1);
          }
        }
      })
      localStorage.setItem('cart', JSON.stringify(this.cartObject));
      this.cart.next(this.cartObject);
      this.actionService.addedAction('პროდუქტი წაიშალა კალათიდან');
    }
    return of(null);
}



  removeOne(id:number):Observable<any> {
    return this.http.post('/api/cart/remove', {id}).pipe(
      catchError(this.unAuthorizedErrorHandler)
    )
  }

  clearCart():Observable<any> {
    return this.http.delete('/api/cart/clear').pipe(
      catchError(this.unAuthorizedErrorHandler)
    )
  }

  getAccountCartProducts():Observable<CartProduct> {
    return this.http.get<CartProduct>('/api/product/cart').pipe(
    )
  }

  getCartProducts() {
    if(!this.auth) {
      this.cartObject = JSON.parse(localStorage.getItem('cart')) || {products:[], total:0, discount:0};
      this.cart.next(this.cartObject);
      return of(null);
    } else {
      return this.http.get<CartProduct>('/api/product/cart').pipe(
        map((cart) => {
          this.cartObject = cart;
          this.cart.next(this.cartObject);
        }),
        catchError((err) => this.handleError(err))
      );
    }
  }

  handleError(err:HttpErrorResponse) {
    this.cart.next({products:[], total:0, discount:0});
    this.router.navigate(['/'])
    return throwError('could not find');
  }

  sendNumberMessage(phone:number) {
    //
  }

  //Error handlers
  unAuthorizedErrorHandler(error:HttpErrorResponse) {
    this.router.navigate(['/about'])
    return of(error);
  }
  handleOneProductError(error:HttpErrorResponse) {
    if(error.status === 400) {
      this.router.navigate(['/'])
    } 
    return []
  }

  categoryrenError(error:HttpErrorResponse) {
    return []
  }

  handleRedirect(err:HttpErrorResponse) {
    this.router.navigate(['/']);
    return []
  }

 


  isAuthed() {
    return this.http.get('/api/user/isAuthed').pipe(
      map((v) => true),
      catchError(err => of(false))
    )
  }

  handleCloseSpinner(err:HttpErrorResponse) {
    this.actionService.closeSpinner();
    return throwError(() => new Error(''))
  }

  handleProductAddingError(er:HttpErrorResponse) {
    this.actionService.createFailureOverlay('პრობლემა შეიქმნა პროდუქტის დამატებისას, მოგვიანებით სცადეთ');
    this.actionService.closeSpinner();
    return [];
  }

  handleProductEditingError(er:HttpErrorResponse) {
    this.actionService.createFailureOverlay('პრობლემა შეიქმნა პროდუქტის შეცვლისას, მოგვიანებით სცადეთ');
    this.actionService.closeSpinner();
    return [];
  }
}
