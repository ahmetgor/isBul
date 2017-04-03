import { Component } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';
import { IlanSer } from '../../providers/ilan-ser';
import { DetayPage } from '../detay/detay';
import { FiltrelePage } from '../filtrele/filtrele';

@Component({
  selector: 'page-sonuc',
  templateUrl: 'sonuc.html'
})
export class SonucPage {

  ilanList: Array<any>;
  basvuruList: Array<any>;
  detayAra: any = {};
  sirala: any = '';
  // {id: number, isim: string, firma: string, açıklama: string, il: string, tip:string, eğitim: string, tecrübe: string, ehliyet: string, askerlik: string, görüntülenme: string, başvuru: string, olusturan:string, olusurmaTarih:string, guncelleyen:string, guncellemeTarih:string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ilanSer: IlanSer, public modalCtrl: ModalController) {

    this.ilanList = ilanSer.createDb();
    this.getBasvuru();

    console.log('constructor SonucPage çağrıldı');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SonucPage çağrıldı');
  }

  itemTapped(ev, ilan) {
    // console.log(JSON.stringify(this.basvuruList)+'sonuc basvuru');
    // console.log(ilan.isim);
    this.navCtrl.push(DetayPage, {
      ilan: ilan,
      basvurulist: this.basvuruList
    });
  }

  ilanAra(ev: any) {
    // set val to the value of the searchbar
    this.ilanList = this.ilanSer.createDb();
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.ilanList = this.ilanList.filter((item) => {
        return (item.isim.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getBasvuru() {
     this.basvuruList = [ {id: 13, basvuruldu: 'N', kaydedildi: 'Y'}, {id: 14, basvuruldu: 'Y', kaydedildi: 'N'} ];
}

presentFilter(myEvent) {
  let modal = this.modalCtrl.create(FiltrelePage, {
    detayAra: this.detayAra,
    sirala: this.sirala
  });

  modal.onDidDismiss((sirala, detayAra) => {
    this.ilanList = this.ilanSer.createDb();
  console.log(sirala + 'dis' + JSON.stringify(detayAra));
});
  modal.present({
    ev: myEvent
  });
}

  checkBasvuru(ilanId) {
    return this.basvuruList.findIndex((item) => {
        return (item.id == ilanId && item.basvuruldu == 'Y' ); }) > -1
  }

  checkKaydet(ilanId) {
    return this.basvuruList.findIndex((item) => {
        return (item.id == ilanId && item.kaydedildi == 'Y' ); }) > -1
  }

  getDays(d1) {
    // console.log(Date.parse(d1)+' date');
    let diff =  Math.floor(( (new Date()).getTime() - Date.parse(d1) ) / 86400000);
    return diff;
  }

}
