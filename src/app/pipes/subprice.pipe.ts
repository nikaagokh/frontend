import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subprice'
})
export class SubpricePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const str = value.toString();
    const ind = str.indexOf('.');
    if (ind > -1) {
      const aft = str.substring(ind + 1, str.length);
      if (aft.length === 1) {
        return aft + '0';
      } else {
        return aft;
      }
    } else {
      return '00';
    }
  }

}
