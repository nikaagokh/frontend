import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor() {}

  private slide:Subject<number> = new Subject<number>();
  public slide$:Observable<number> = this.slide.asObservable();

  updateSlideSize(size:number) {
    this.slide.next(size);
  }
}
