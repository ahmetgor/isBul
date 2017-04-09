import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'datePipe',
pure: false})
export class DatePipe implements PipeTransform {
  transform(items) {
  return  items.sort(function(a, b) {
    // console.log(a.cikis+'cikis');
    // console.log(a.mezunTarihi+'mezun');
      let nameA = a.cikis;
      let nameB = b.cikis;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  }
}
