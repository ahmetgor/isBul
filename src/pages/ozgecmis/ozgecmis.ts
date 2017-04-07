import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IlanSer } from '../../providers/ilan-ser';

import { OzgecmisDetayPage } from '../ozgecmis-detay/ozgecmis-detay';

/*
  Generated class for the Ozgecmis page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ozgecmis',
  templateUrl: 'ozgecmis.html'
})

export class OzgecmisPage {

  ozgecmis: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ilanSer: IlanSer) {

  this.ozgecmis = ilanSer.getOzgecmis();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OzgecmisPage');
  }

  itemTapped(ev, ozDetay, des) {
    console.log(des);
    console.log(JSON.stringify(ozDetay));
    this.navCtrl.push(OzgecmisDetayPage, {
      ozDetay: ozDetay,
      basvurulist: this.ozgecmis,
      des: des
    });
  }

}
