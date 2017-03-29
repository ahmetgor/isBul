import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IlanSer } from '../../providers/ilan-ser';
import { DetayPage } from '../detay/detay';

/*
  Generated class for the Sonuc page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sonuc',
  templateUrl: 'sonuc.html'
})
export class SonucPage {

  ilanList: Array<any>;
  // {id: number, isim: string, firma: string, açıklama: string, il: string, tip:string, eğitim: string, tecrübe: string, ehliyet: string, askerlik: string, görüntülenme: string, başvuru: string, olusturan:string, olusurmaTarih:string, guncelleyen:string, guncellemeTarih:string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ilanSer: IlanSer) {

    this.ilanList = ilanSer.createDb();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SonucPage');
  }

  itemTapped(event, ilan) {
    // That's right, we're pushing to ourselves!
    console.log(ilan.isim);
    this.navCtrl.push(DetayPage, {
      ilan: ilan
    });
  }

}
