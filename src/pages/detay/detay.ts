import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { IlanSer } from '../../providers/ilan-ser';
/*
  Generated class for the Detay page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detay',
  templateUrl: 'detay.html'
})
export class DetayPage {

ilan: any;
basvuruList: Array<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ilanSer: IlanSer) {

                 this.ilan = this.navParams.get('ilan');
                 this.basvuruList = this.navParams.get('basvurulist');
                 this.basvuruList.push({id: 'hebe'});
                 console.log(JSON.stringify(this.basvuruList)+'detay basvuru');
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetayPage');
  }

  getDays(d1) {
    // console.log(Date.parse(d1)+' date');
    let diff =  Math.floor(( (new Date()).getTime() - Date.parse(d1) ) / 86400000);
    return diff;
  }

  basvur(ilanId) {
    console.log( JSON.stringify(this.basvuruList.find((item) => {
        return (item.id == ilanId ); })) + 'console')

  let i = this.basvuruList.findIndex((item) => {
    return (item.id == ilanId); })

    if(i>-1)
    this.basvuruList[i].basvuruldu = this.basvuruList[i].basvuruldu == 'N' ? 'Y' : 'N';
    else this.basvuruList.push({id: ilanId, basvuruldu: 'Y', kaydedildi: 'N'});
  }

  kaydet(ilanId) {
    console.log( JSON.stringify(this.basvuruList.find((item) => {
        return (item.id == ilanId ); })) + 'kaydetfunc')

  let i = this.basvuruList.findIndex((item) => {
    return (item.id == ilanId); })

    if(i>-1)
    this.basvuruList[i].kaydedildi = this.basvuruList[i].kaydedildi == 'N' ? 'Y' : 'N';
    else this.basvuruList.push({id: ilanId, basvuruldu: 'N', kaydedildi: 'Y'});
  }

  checkBasvuru(ilanId) {
    return this.basvuruList.findIndex((item) => {
        return (item.id == ilanId && item.basvuruldu == 'Y' ); }) > -1
  }

  checkKaydet(ilanId) {
    return this.basvuruList.findIndex((item) => {
        return (item.id == ilanId && item.kaydedildi == 'Y' ); }) > -1
  }

}
