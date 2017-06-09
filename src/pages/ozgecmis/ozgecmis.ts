import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { IlanSer } from '../../providers/ilan-ser';
import { OzgecmisSer} from '../../providers/ozgecmis-ser';
import { Storage } from '@ionic/storage';
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
              public alertCtrl: AlertController,public storage: Storage) {

              this.ozgecmis = ozgecmisSer.ozgecmis;
              console.log('ionViewDidLoad OzgecmisPage const');

    }

  ionViewWillEnter() {
    console.log('ionViewWillEnter OzgecmisPage const');
    // this.storage.get('ozgecmis').then((ozgecmis) => {
    //   console.log("storage"+ JSON.stringify(ozgecmis));
    //   this.ozgecmis = ozgecmis;
    //   });
    this.ozgecmisSer.getOzgecmis(this.ozgecmisSer.ozgecmis._id)
    .then(ozgecmis => this.ozgecmis)
  }

  itemTapped(ev, ozDetay, des, ozDetayList) {
    // console.log(des);
    // console.log(JSON.stringify(ozDetay)+'ozDetay');
    // console.log(JSON.stringify(ozDetayList)+'ozdetlist');
    this.navCtrl.push(OzgecmisDetayPage, {
      ozDetay: ozDetay,
      basvurulist: this.ozgecmis,
      des: des,
      ozDetayList: ozDetayList
    });
  }

  checkOzgecmis(ev) {

    if(this.ozgecmis.enabled && (Object.keys(this.ozgecmis.tecrube).length < 1 || this.ozgecmis.tecrube[0].firma=="" ||
      Object.keys(this.ozgecmis.egitim).length < 1 || this.ozgecmis.egitim[0].okul=="" ||
      this.ozgecmis.isim === undefined || this.ozgecmis.isim.trim() == '' ||
      this.ozgecmis.adres === undefined || this.ozgecmis.adres.trim() == '')) {
    console.log(JSON.stringify(this.ozgecmis.egitim)+ 'egitim');
    console.log(JSON.stringify(this.ozgecmis.tecrube)+'tecrube');
    this.ozgecmis.enabled = false;
    ev.checked = false;
    this.presentAlert();

      console.log(this.ozgecmis.enabled+'after');
      console.log(ev.checked+'after');
    }
    else {
      this.ozgecmisSer.updateOzgecmisAll(this.ozgecmis);
    console.log(JSON.stringify(this.ozgecmis));
  }

  }

  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Özgeçmişiniz Eksik!',
    subTitle: 'Aktiflemek için Kişisel Bilgileriniz ve İletişim Bilgileriniz tam olmalı. Ayrıca Tecrübe ve Eğitim için en az 1 giriş olmalı.',
    buttons: ['Kapat']
  });
  alert.present();
}

getAge() {
  return ~~(((new Date()).getTime() - (new Date(this.ozgecmis.dogumTarihi)).getTime()) / (31557600000));
}


}
