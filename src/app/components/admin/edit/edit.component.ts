import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { RootAndChildren } from 'src/app/interfaces/root-and-children.interface';
import { HttpService } from 'src/app/services/http.service';
import { url } from '../../searchdesktop/searchdesktop.component';
import { OverlayService } from 'src/app/services/overlay.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  private closed:Subject<number> = new Subject<number>();
  public closed$ = this.closed.asObservable();
  private submit:Subject<any> = new Subject<any>();
  public submit$ = this.submit.asObservable();
  public productInfo = null;
  public categories = ['Audi', 'BMW', 'Chevrolet', 'Ford', 'Hyundai', 'Kia', 'Lexus', 'Toyota'];
  public images = [];
  public imagesInf:any = [];
  public category = new FormControl('');
  public subcategory = new FormControl('');
  public carousel:number = 0;
  public formGroup:FormGroup;
  public root:RootAndChildren[];
  public subcategories:any = [];
  public years:any = [];
  public tags:any = [];
  public product:any = {};
  public url:string;
  public mobsize:boolean = false;
  public stck:boolean = false;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data:any, 
    private fb:FormBuilder,
    private httpService:HttpService,
    private breakpoint:BreakpointObserver) {
    if(this.data) {
      this.product = data.item.product[0];
      this.root = data.item.roots;
      this.tags = data.item.tags;
      this.images = this.product.images;
      this.url = url;
      this.breakpoint.observe(['(min-width:768px)']).subscribe((state:BreakpointState) => {
        if(state.matches) {
          this.mobsize = false;
        } else {
          this.mobsize = true;
        }
      })
    }
  }
  ngOnInit():void {
    this.url = url;
    let index = '';
    let tagIds = '';
    let brand = '';
    let year = '';
    if(this.product.type === 0) {
      brand = this.product.categorY.categoryId;
      year = this.product.categories[0].categoryYearId;
      this.subcategories = this.root[this.product.categorY.categoryId-1].subcategories;
      index = this.subcategories.findIndex(obj => obj.id === this.product.categorY.id);
      this.years = this.subcategories[index].cyear;
      tagIds = this.product.tagprod.map(tagprod => tagprod.tag.id);
    }
  
    
    this.formGroup = this.fb.group({
      brand: [brand, Validators.required],
      model: [index, Validators.required],
      relation:[tagIds, Validators.required],
      year:[year, Validators.required],
      nameGeo:[this.product.nameGeo, Validators.required],
      price:[this.product.price, Validators.required],
      discount:[this.product.discount, Validators.required],
      nameEng:[this.product.nameEng, Validators.required],
      type:[this.product.type, Validators.required],
      condition:[this.product.condition, Validators.required],
      description:[this.product.description, Validators.required],
      stck:[this.product.available, [Validators.required]]
    })
    this.formGroup.controls['brand'].valueChanges.subscribe(x => {
      this.subcategories = this.root[x-1].subcategories;
      this.years = []
    })
    this.formGroup.controls['model'].valueChanges.subscribe(x => {
      this.years = this.subcategories[x].cyear;
    })
    this.formGroup.controls['type'].valueChanges.subscribe(x => {
      if(x === '1') {
        this.stck = true;
      } else {
        this.stck = false;
      }
    })
  }
  handleImageUpload(val:any):void {
    this.images.push(val);
    
  }
  public async imageHandler(val:Event) {

    const fileList = (val.target as HTMLInputElement).files;
    if(fileList) {
      const fileArray = Array.from(fileList);
      for(const file of fileArray) {
              const img = await this.getPreview(file);
              this.images.push(img);
              this.imagesInf.push(file);      
      }
    }
    
  }
  private async getPreview(file:File) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = (e:any) => {
        resolve(e.target.result);
      }
      fr.onerror = e => {
        reject(e);
      }
      fr.readAsDataURL(file);
    })
  }
  removeFile(index:number):void {
    if(this.images.length > this.imagesInf.length) {
      console.log('1');
      const diff = this.images.length - this.imagesInf.length;
      if((this.images.length - index) > this.imagesInf.length) {
        this.images.splice(index, 1);
        return;
      }
      console.log(2)
      this.images.splice(index,1);
      this.imagesInf.splice(index-diff,1)
    } else {
      this.images.splice(index,1)
      this.imagesInf.splice(index,1);
    }
  }
  arrows(index:number):void {

  }
  search() {
    
  }
  submits() {
    let obj;
    let existing:any = [];
    this.images.forEach((val) => {
      if(val.path) {
        existing.push(val);
      }
    })
    const {year, nameGeo, nameEng, price, relation, discount, condition, description, type, stck} = this.formGroup.value;
    if(type === 0) {
      obj = {year, nameEng, nameGeo, price, relation, type, discount, condition, description, available:stck, existing:existing};
    } else {
      obj = {nameEng,nameGeo, price, type, discount, condition, description, available:stck, existing:existing}
    }
    //const {year, nameGeo, nameEng, price, relation, type} = this.formGroup.value;
    //const obj = {year, nameEng, nameGeo, price, relation, type};
    const formData = new FormData();
    formData.append('data', JSON.stringify(obj));
      for(let i = 0; i < this.imagesInf.length; i++) {
        formData.append('files', this.imagesInf[i])
      }
    console.log(obj);
    this.httpService.editProduct(formData).subscribe(x => {
      console.log(x)
    })
  }
  getUrl(image:any) {
    if(image.path) {
      return `${url}${image.path}`
    } else {
      return image;
    }
    
  }
  deleteProduct():void {
    this.closed.next(this.product.id)
  }
}
