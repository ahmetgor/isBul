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
  kaydedilenList: any;
  basvurular: any;
  kaydedilenler: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public basvuruSer: BasvuruSer, public ilanSer: IlanSer) {

                this.basvuruList = this.basvuruSer.basvuruList;
                this.kaydedilenList = this.basvuruSer.kaydedilenList;
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AktivitePage');
    // this.getBasvuruList();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AktivitePage');
    this.getBasvuruList();
    this.getKaydedilenList();
  }

  getBasvuruList() {
    this.basvuruSer.getBasvurular()
    .then(basvurular => {
      this.basvurular = basvurular;
    });
  }

  getKaydedilenList() {
    this.basvuruSer.getKaydedilenler()
    .then(kaydedilenler => {
      this.kaydedilenler = kaydedilenler;
    });
  }

  itemTapped(ev, ilan) {
    // console.log(JSON.stringify(this.basvuruList)+'sonuc basvuru');
    console.log(JSON.stringify(ilan)+'ilan');
    this.navCtrl.push(DetayPage, {
      ilan: ilan,
      basvurulist: this.basvuruSer.basvuruList,
      kaydedilenlist: this.basvuruSer.kaydedilenList
    });
  }

  checkBasvuru(ilanId) {
    return this.basvuruSer.checkBasvuru(ilanId);

  }

  checkKaydet(ilanId) {
    return this.basvuruSer.checkKaydedilen(ilanId);

  }

  getDays(d1) {
    let diff =  Math.floor(( (new Date()).getTime() - (new Date(d1)).getTime() ) / 86400000);
    return diff;
  }

}
