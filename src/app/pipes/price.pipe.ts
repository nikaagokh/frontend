import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const str = value.toString();
    const ind = str.indexOf('.');
    if (ind > -1) {
      return str.substring(0, ind);
    } else {
      return str;
    }
  }

}
