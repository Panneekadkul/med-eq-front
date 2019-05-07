import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == null) return null;
    if (args == null) return value;
    args = args.toLowerCase();
    return value.filter(function (item) {
      return item.typeName.toLowerCase().includes(args);
    });
  }

}
