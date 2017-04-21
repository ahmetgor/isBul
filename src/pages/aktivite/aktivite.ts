import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IlanSer } from '../../providers/ilan-ser';
import { BasvuruSer } from '../../providers/basvuru-ser';
import { DetayPage } from '../detay/detay';

/*
  Generated class for the Aktivite page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-aktivite',
  templateUrl: 'aktivite.html'
})
export class AktivitePage {

  aktivite: string = 'basvurulan';
  basvuruList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public basvuruSer: BasvuruSer, public ilanSer: IlanSer) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AktivitePage');
    this.getBasvuruList();
  }

  getBasvuruList() {
    this.basvuruSer.getBasvurular()
    .then(basvurular => {
      this.basvuruList = basvurular;
    });
  }

  itemTapped(ev, ilan) {
    // console.log(JSON.stringify(this.basvuruList)+'sonuc basvuru');
    console.log(JSON.stringify(ilan)+'ilan');
    this.navCtrl.push(DetayPage, {
      ilan: ilan,
      basvurulist: this.ilanSer.basvurKaydetList
    });
  }

  checkBasvuru(ilanId) {
    return this.ilanSer.basvurKaydetList.findIndex((item) => {
        return (item.id == ilanId && item.basvuruldu == 'Y' ); }) > -1
  }

  checkKaydet(ilanId) {
    return this.ilanSer.basvurKaydetList.findIndex((item) => {
        return (item.id == ilanId && item.kaydedildi == 'Y' ); }) > -1
  }

  getDays(d1) {
    let diff =  Math.floor(( (new Date()).getTime() - (new Date(d1)).getTime() ) / 86400000);
    return diff;
  }

}
