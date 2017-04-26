import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BasvuruSer } from '../../providers/basvuru-ser';
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
kaydedilenList: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ilanSer: IlanSer, public basvuruSer: BasvuruSer ) {

                 this.ilan = this.navParams.get('ilan');
                 this.basvuruList = this.navParams.get('basvurulist');
                 this.kaydedilenList = this.navParams.get('kaydedilenlist');
                //  this.basvuruList.push({id: 'hebe'});
                 console.log(JSON.stringify(this.kaydedilenList)+'detay basvuru');
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetayPage');
  }

  getDays(d1) {
    // console.log(Date.parse(d1)+' date');
    let diff =  Math.floor(( (new Date()).getTime() - Date.parse(d1) ) / 86400000);
    return diff;
  }

  basvur(ilan :any) {
    console.log(ilan._id+'detay');
    this.basvuruSer.addBasvuru(ilan._id);
    console.log(JSON.stringify(this.basvuruSer.basvuruList)+'create');
  //   console.log( JSON.stringify(this.basvuruList.find((item) => {
  //       return (item.basvuru == ilanId ); })) + 'console')
  //
  // let i = this.basvuruList.findIndex((item) => {
  //   return (item.basvuru == ilanId); })
  //
  //   if(i>-1)
  //   this.basvuruList[i].basvuruldu = this.basvuruList[i].basvuruldu == 'N' ? 'Y' : 'N';
  //   else this.basvuruList.push({basvuru: ilanId, basvuruldu: 'Y', kaydedildi: 'N'});
  }

  deleteBasvur(ilan: any) {
    console.log(ilan._id+'detay');
    this.basvuruSer.deleteBasvuru(ilan._id);
    console.log(JSON.stringify(this.basvuruSer.basvuruList)+'detay');

  }

  kaydet(ilan :any) {
    this.basvuruSer.addKaydedilen(ilan._id);
    console.log(JSON.stringify(this.basvuruSer.kaydedilenList)+'create');

  }

  deleteKaydet(ilan :any) {
    this.basvuruSer.deleteKaydedilen(ilan._id);
    console.log(JSON.stringify(this.basvuruSer.kaydedilenList)+'detay');
  }

  checkBasvuru(ilanId: any) {
    // console.log(JSON.stringify(this.basvuruList)+'detaylist');
    return this.basvuruSer.checkBasvuru(ilanId);
  }

  checkKaydedilen(ilanId: any) {
    return this.basvuruSer.checkKaydedilen(ilanId);
  }

  // checkKaydet(ilanId) {
  //   return this.basvuruList.findIndex((item) => {
  //       return (item.id == ilanId && item.kaydedildi == 'Y' ); }) > -1
  // }

}
