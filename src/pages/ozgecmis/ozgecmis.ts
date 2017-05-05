import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { IlanSer } from '../../providers/ilan-ser';
import { OzgecmisSer} from '../../providers/ozgecmis-ser';

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
              public ilanSer: IlanSer, public ozgecmisSer: OzgecmisSer,
              public alertCtrl: AlertController) {

                this.ozgecmis = this.ozgecmisSer.getOzgecmis()
                .then(ozgecmis => {
                  this.ozgecmis = ozgecmis;
                  console.log(JSON.stringify(this.ozgecmis.sertifika)+'ozgecmis');
                });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OzgecmisPage');

  }

  itemTapped(ev, ozDetay, des, ozDetayList) {
    console.log(des);
    console.log(JSON.stringify(ozDetay)+'ozDetay');
    console.log(JSON.stringify(ozDetayList)+'ozdetlist');
    this.navCtrl.push(OzgecmisDetayPage, {
      ozDetay: ozDetay,
      basvurulist: this.ozgecmis,
      des: des,
      ozDetayList: ozDetayList
    });
  }

  checkOzgecmis(ev) {
    // if(false && this.ozgecmis.enabled) {
    //   // this.ozgecmis.enabled = false;
    //   this.presentAlert();
    //   console.log(ev.checked);
    //   console.log(this.ozgecmis.enabled);
    //   this.ozgecmis.enabled = false;
    //   console.log(ev.checked+'after');
    //   console.log(this.ozgecmis.enabled+'after');
    //
    // }
    console.log('cgecksd');
      console.log(ev.checked+'after');
      console.log(this.ozgecmis.enabled+'after');
  }

  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Özgeçmişiniz Eksik!',
    subTitle: 'Aktiflemek için Kişisel Bilgileriniz ve İletişim Bilgileriniz tam olmalı. Ayrıca Tecrübe ve Eğitim için en az 1 giriş olmalı.',
    buttons: ['Kapat']
  });
  alert.present();
}


}
