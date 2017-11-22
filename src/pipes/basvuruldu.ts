import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { BasvuruSer } from '../providers/basvuru-ser';

/*
  Generated class for the Basvuruldu pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'basvuruldu'
})
// @Injectable()
export class Basvuruldu implements PipeTransform {

  constructor(public basvuruSer: BasvuruSer) {}
  /*
    Takes a value and makes it lowercase.
   */
  transform(ilanId) {
    // console.log("pipe");
    // value = value + ''; // make sure it's a string
      return this.basvuruSer.checkBasvuru(ilanId);
  }
}
