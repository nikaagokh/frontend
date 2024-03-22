import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { RootAndChildren } from 'src/app/interfaces/root-and-children.interface';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  public categories = ['Audi', 'BMW', 'Chevrolet', 'Ford', 'Hyundai', 'Kia', 'Lexus', 'Toyota'];
  public images = [];
  public imagesInf:any = [];
  public category = new FormControl('');
  public subcategory = new FormControl('');
  public carousel:number = 0;
  public formGroup:FormGroup;
  public root:any;
  public subcategories:any = [];
  public years:any = [];
  public tags:any = [];
  public stck:boolean = false;
  public mobsize:boolean = false;
  public selectFC = new FormControl('');
  public yearNumbers:any = [];
  constructor(
    private httpService:HttpService,
    private authService:AuthService,
    private fb:FormBuilder,
    private breakpoint:BreakpointObserver
  ) {
    this.breakpoint.observe(['(min-width:992px)']).subscribe((state:BreakpointState) => {
      if(state.matches) {
        this.mobsize = false;
      } else {
        this.mobsize = true;
      }
    })
  }


  ngOnInit():void {
    this.formGroup = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      relation:['', Validators.required],
      year:['', Validators.required],
      nameGeo:['', Validators.required],
      price:['', Validators.required],
      discount:['20'],
      nameEng:['', Validators.required],
      type:['0'],
      condition:['მეორადი'],
      description:['',],
      stck:[1, Validators.required]
    })
    console.log(this.root)
    this.formGroup.controls['brand'].valueChanges.subscribe(x => {
        this.subcategories = this.root[x-1]?.subcategories;
    })
    this.formGroup.controls['model'].valueChanges.subscribe(x => {
        this.years = x?.cyear;
        //this.yearNumbers.push(x?.year)
        
    })
    this.formGroup.controls['year'].valueChanges.subscribe(x => {
      this.yearNumbers.push(x);
      localStorage.setItem('years', JSON.stringify(this.yearNumbers))
    })
    this.formGroup.controls['type'].valueChanges.subscribe(x => {
      if(x === '1') {
        this.stck = true;
      } else {
        this.stck = false;
      }
    })
    forkJoin({
      model:this.httpService.getRootCategoriesAndChildrenAdmin(),
      tags:this.httpService.getTags()
    }).subscribe(x => {
      this.root = x.model;
      this.tags = x.tags;
      console.log(this.root)
    })
    
  }

  submit() {
    /*
    const {year, nameGeo, nameEng, price, relation, discount, condition, description, type, stck} = this.formGroup.value;
    let obj;
    if(type === '0') {
      obj = {year, nameEng, nameGeo, price, relation, type, discount, condition, description, available:stck};
    } else {
      obj = {nameEng,nameGeo, price, type, discount, condition, description, available:stck}
    }
    const formData = new FormData();
    formData.append('data', JSON.stringify(obj));
    for(let i = 0; i < this.imagesInf.length; i++) {
      formData.append('files', this.imagesInf[i])
    }
    console.log(formData)
    //formData.append('files', this.imagesInf);
    
    this.httpService.addProduct(formData).subscribe(x => {
      this.formGroup.reset()
      this.formGroup.patchValue({discount:'20', type:'0', condition:'მეორადი', stck:1})
      this.images = [];
      this.imagesInf = [];
      this.subcategories = [];
      this.years = []
    })
    */
    

    
    let numbers = JSON.parse(localStorage.getItem('s'))
    console.log(numbers);
    //.split(',').filter(Boolean);
    
    // Convert the numbers to integers and store distinct values in a Set
    let distinctNumbers = new Set(numbers.map(Number));
    console.log(distinctNumbers)
    // Convert the set back to an array (if needed)
    let distinctNumbersArray = [...distinctNumbers];
    console.log(distinctNumbersArray)
  }
  
  handleImageUpload(val:any):void {
    this.images.push(val);
    
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
  arrows(index:number):void {

  }
}
