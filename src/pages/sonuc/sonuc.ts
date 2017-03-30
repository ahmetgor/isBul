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
  basvuruList: Array<any>;
  // {id: number, isim: string, firma: string, açıklama: string, il: string, tip:string, eğitim: string, tecrübe: string, ehliyet: string, askerlik: string, görüntülenme: string, başvuru: string, olusturan:string, olusurmaTarih:string, guncelleyen:string, guncellemeTarih:string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ilanSer: IlanSer) {

    this.ilanList = ilanSer.createDb();
    this.basvuruList = [ {id: 13, basvuruldu: 'Y'}, {id: 14, basvuruldu: 'Y'} ];
    console.log(this.basvuruList.findIndex((item) => {
        return (item.id == 15 );

}));

    // console.log(this.basvuruList.findIndex(13));
    // console.log(JSON.stringify(this.basvuruList)+'1');
    // console.log(JSON.stringify(this.basvuruList.keys())+'2');
    // console.log(JSON.stringify(this.basvuruList[1])+'3');
    // console.log(this.basvuruList['id']+'4');
    //       for (const key of Object.keys(this.basvuruList)) {
    //    console.log(key+'   '+JSON.stringify(this.basvuruList[key].id));
    // }
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

   getBasvuru(basvuru, ilanId) {
      return basvuru.id === ilanId;
  }

  // { name: 'cherries', quantity: 5 }

getDays(d1) {
  // console.log(Date.parse(d1)+' date');
  let diff =  Math.floor(( (new Date()).getTime() - Date.parse(d1) ) / 86400000);
  return diff;
}

}
