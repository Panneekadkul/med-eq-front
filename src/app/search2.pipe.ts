import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search2'
})
export class Search2Pipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == null) return null;
    if (args == null) return value;
    args = args.toLowerCase();
    return value.filter(function (item) {
      return item.borrowId.toLowerCase().includes(args);
    });
  }

}
