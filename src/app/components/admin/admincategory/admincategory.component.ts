import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, startWith, map, forkJoin } from 'rxjs';
import { RootAndChildren } from 'src/app/interfaces/root-and-children.interface';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-admincategory',
  templateUrl: './admincategory.component.html',
  styleUrls: ['./admincategory.component.css']
})
export class AdmincategoryComponent {
  public formGroup:FormGroup;
  public root:any = []
  public subcategories:any = [];
  public years:any = [];
  public tags:any = [];
  public images = [];
  public imagesInf:any = [];
  public choosefc = new FormControl('');
  public active:number = undefined;
  public disable:boolean = true;
  constructor(
    private httpService:HttpService,
    private authService:AuthService,
    private fb:FormBuilder
  ) {}
  
  ngOnInit() {
    this.choosefc.valueChanges.subscribe(x => {
      const num = Number(x);
      this.active = num;
      this.images = [];
      this.imagesInf = []

    })
    
    this.formGroup = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      relation:['', Validators.required],
      year:['', Validators.required],
      brandAdd:[''],
      modelAdd:[''],
      relationAdd:[''],
      yearAdd:['']
    });

    this.formGroup.controls['brand'].valueChanges.subscribe(x => {
      this.subcategories = this.root[x-1]?.subcategories;
      console.log(this.subcategories)
    })
    this.formGroup.controls['model'].valueChanges.subscribe(x => {
      this.years = x.cyear;
      console.log(this.years)
    })
    
    forkJoin({
      model:this.httpService.getRootCategoriesAndChildren(),
      tags:this.httpService.getTags(),
    }).subscribe(x => {
      console.log(x)
      this.root = x.model;
      console.log(this.root)
      this.tags = x.tags;
    })

  }

  add(val:number) {

  }

  arrows(num) {

  }
  public async imageHandler(val:Event) {
    const fileList = (val.target as HTMLInputElement).files;
    console.log(val);
    console.log(fileList);
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
    this.images.splice(index,1);
    this.imagesInf.splice(index,1);

  }

  submit() {
    if(this.choosefc.value === '1') {
      const brandOrigin = this.formGroup.controls['brandAdd'].value;
      const brand = this.formGroup.controls['brandAdd'].value.toLowerCase();
      const brandNames = this.root.map(m => m.name.toLowerCase());
      if(!brandNames.includes(brand) && brand !== '') {
        this.addBrand(brandOrigin);
      }
    }
    if(this.choosefc.value === '2') {
      const modelOrigin = this.formGroup.controls['modelAdd'].value;
      const model = this.formGroup.controls['modelAdd'].value.toLowerCase();
      const brand = Number(this.formGroup.controls['brand'].value);
      const modelNames = this.root[brand-1]?.subcategories?.map(x => x.name.toLowerCase());
      this.addModel(brand, modelOrigin);
    }
    if(this.choosefc.value === '3') {
      const range = this.formGroup.controls['yearAdd'].value.toLowerCase();
      const model = Number(this.formGroup.controls['year'].value);
      if(this.validYearRange(range)) {
        this.addModelYear(model, range);
      } 
    }
  }

  isDisabled():boolean {
    if(this.active === 1) {
      const brand = this.formGroup.controls['brandAdd'].value;
      if(this.imagesInf.length > 0 && brand !== '') {
        return false;
      } else {
        return true;
      }
    } else if(this.active === 2) {
      const model = this.formGroup.controls['modelAdd'].value.toLowerCase();
      const brand = this.formGroup.controls['brand'].value;
      if(model !== '' && brand !== '') {
        return false;
      } else {
        return true;
      }
    } else if(this.active === 3) {
      const range = this.formGroup.controls['yearAdd'].value.toLowerCase();
      const model = this.formGroup.controls['year'].value;
      if(range !== '' && model !== '' && this.imagesInf.length > 0) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }

  addBrand(brand:string) {
    const formData = new FormData();
    const obj = {brand};
    formData.append('data', JSON.stringify(obj));
    formData.append('file', this.imagesInf[0])
    this.formGroup.controls['brandAdd'].setValue('');
    this.httpService.addBrand(formData).subscribe(x => {
      
    })
    
  }

  addModel(brand:number, model:string) {
    const obj = {brand, model};
    
    this.httpService.addModel(obj).subscribe(x => {
      console.log(x)
    })
  }

  addModelYear(model:number, range:string) {
    const formData = new FormData();
    const obj = {model, range};
    formData.append('data', JSON.stringify(obj));
    formData.append('file', this.imagesInf[0]);
    this.httpService.addModelYear(formData).subscribe(x => {
      console.log(x);
    })
  }

  

  validYearRange(range) {
    var parts = range.split("-");
    if (parts.length !== 2) {
        return false; 
    }
    if (parts[0].length !== 4 || parts[1].length !== 4) {
        return false; 
    }
    if (isNaN(parts[0]) || isNaN(parts[1])) {
        return false;
    }
    if(Number(parts[0] > Number(parts[1]))) {
      return false;
    }
    return true;
  }


}
