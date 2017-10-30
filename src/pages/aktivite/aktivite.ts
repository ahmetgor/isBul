import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { IlanSer } from '../../providers/ilan-ser';
import { BasvuruSer } from '../../providers/basvuru-ser';
import { DetayPage } from '../detay/detay';
import { UserAuth} from '../../providers/user-auth';
import { LoginPage } from '../login/login';

/*
  Generated class for the Aktivite page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
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
  skip: number = 0;
  limit: number = 10;
  scrollEnable: boolean = true;
  scrollEnabl: boolean = true;
  ski: number = 0;
  limi: number = 10;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public basvuruSer: BasvuruSer, public ilanSer: IlanSer, public authService: UserAuth) {

              }
  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    if (!this.authService.currentUser) {
    this.authService.checkAuthentication().then((res) => {
      this.getBasvuruList();
      this.getKaydedilenList();
    }, (err) => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
  else{
    console.log('ionViewWillEnter AktivitePage');
    this.getBasvuruList();
    this.getKaydedilenList();
  }
  this.basvuruList = this.basvuruSer.basvuruList;
  this.kaydedilenList = this.basvuruSer.kaydedilenList;
  }

  getBasvuruList() {
    this.scrollEnable = true;
    this.skip = 0;
    this.basvuruSer.getBasvurular(this.skip, this.limit)
    .then(basvurular => {
      this.basvurular = basvurular;
      // console.log(JSON.stringify(basvurular));
    })
    .catch((err) => {});
  }

  getKaydedilenList() {
    this.scrollEnabl = true;
    this.ski = 0;
    this.basvuruSer.getKaydedilenler(this.ski, this.limi)
    .then(kaydedilenler => {
      this.kaydedilenler = kaydedilenler;
    })
    .catch((err) => {});
  }

  itemTapped(ev, ilan) {
    // console.log(JSON.stringify(this.basvuruList)+'sonuc basvuru');
    console.log(JSON.stringify(ilan)+'ilan');
    this.navCtrl.push(DetayPage, {
      ilanId: ilan._id,
      basvurulist: this.basvuruSer.basvuruList,
      kaydedilenlist: this.basvuruSer.kaydedilenList
    });
  }

  doInfinite(infiniteScroll) {
  console.log('Begin async operation');

  setTimeout(() => {
    this.skip = this.skip + 1;
    this.basvuruSer.getBasvurular(this.skip, this.limit)
    .then(basvurular => {
      console.log(JSON.stringify(basvurular)+"basvuruList");

      if(Object.keys(basvurular).length < this.limit) {
        console.log('true');
        // infiniteScroll.enable(false);
        this.scrollEnable = false;
        }

        for( var key in basvurular ) {
      this.basvurular.push(basvurular[key]);
    }
     })
     .catch((err) => {});
    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);
}

doInfinit(infiniteScroll) {
console.log('Begin async operation');

setTimeout(() => {
  this.ski = this.ski + 1;
  this.basvuruSer.getKaydedilenler(this.ski, this.limi)
  .then(kaydedilenler => {
    console.log(JSON.stringify(kaydedilenler)+"basvuruList");

    if(Object.keys(kaydedilenler).length < this.limi) {
      console.log('true');
      // infiniteScroll.enable(false);
      this.scrollEnabl = false;
      }

      for( var key in kaydedilenler ) {
    this.kaydedilenler.push(kaydedilenler[key]);
  }
   })
   .catch((err) => {});
  console.log('Async operation has ended');
  infiniteScroll.complete();
}, 500);
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
