import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events, IonicPage} from 'ionic-angular';
import { IlanSer } from '../../providers/ilan-ser';
import { DetayPage } from '../detay/detay';
import { FiltrelePage } from '../filtrele/filtrele';
import { FormControl } from '@angular/forms';
import { BasvuruSer } from '../../providers/basvuru-ser';
import { LoginPage } from '../login/login';
import { UserAuth} from '../../providers/user-auth';
import 'rxjs/add/operator/debounceTime';

@IonicPage({segment: 'ilanlar'})
@Component({
  selector: 'page-sonuc',
  templateUrl: 'sonuc.html'
})
export class SonucPage {

  ilanList: any;
  basvuruList: any;
  kaydedilenList: any;
  detayAra: any = {};
  sirala: any = '{}';
  searching: boolean = false;
  searchTerm: string = '';
  searchControl: FormControl;
  skip: number = 0;
  limit: number = 20;
  scrollEnable: boolean = true;
  // infiniteScroll:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ilanSer: IlanSer, public modalCtrl: ModalController,
              public basvuruSer: BasvuruSer, public events: Events, public authService: UserAuth) {

    this.searchControl = new FormControl();
    // this.getBasvuru();
    console.log('constructor SonucPage çağrıldı');
  }

  ionViewDidLoad() {
    if (!this.authService.currentUser) {
    this.authService.checkAuthentication().then((res) => {
    }, (err) => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
    this.basvuruList = this.basvuruSer.basvuruList;
    this.kaydedilenList = this.basvuruSer.kaydedilenList;
    console.log('ilanlistele didload çağrıldı');

    this.ilanListele();
    console.log('ionViewDidLoad SonucPage çağrıldı');
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
    this.scrollEnable = true;
    this.skip = 0;
    // this.infiniteScroll.enable(true);
    console.log('ilanlistele searchkontrol çağrıldı');
    this.ilanListele();

    console.log('searchkontrol çağrıldı');
  // }
});

this.events.subscribe('ilan:filtered', (a) => {
  this.scrollEnable = true;
  // this.infiniteScroll.enable(true);
  this.skip = 0;
  if(a) {
    // console.log('filtre true');
    this.detayAra = {};
    this.sirala = '{}';
  }
  console.log('ilanlistele filtre çağrıldı');
  this.ilanListele();

});
  }

  ilanListele() {
    this.searching = true;
    this.ilanSer.getIlanlar(this.searchTerm, this.detayAra, this.sirala, this.skip, this.limit)
    .then(ilanlar => {
      this.ilanList = ilanlar;
      console.log(this.searchTerm);
      this.searching = false;
    });
  }

  itemTapped(ev, ilan) {
    // console.log(JSON.stringify(this.basvuruList)+'sonuc basvuru');
    console.log(JSON.stringify(ilan)+'ilan');
    this.navCtrl.push('DetayPage', {
      ilanId: ilan._id,
      basvurulist: this.basvuruSer.basvuruList,
      kaydedilenlist: this.basvuruSer.kaydedilenList
    });
  }

  doInfinite(infiniteScroll) {
  console.log('Begin async operation');
  // this.infiniteScroll = infiniteScroll;
  // infiniteScroll.enable(true);
  // infiniteScroll.enable(false);

  setTimeout(() => {
    this.skip = this.skip + 1;
    this.ilanSer.getIlanlar(this.searchTerm, this.detayAra, this.sirala, this.skip, this.limit)
    .then(ilanlar => {
      console.log(JSON.stringify(ilanlar)+"ilanlar");

      if(Object.keys(ilanlar).length < this.limit) {
        console.log('true');
        // infiniteScroll.enable(false);
        this.scrollEnable = false;
        ;}

      console.log('false');
      // infiniteScroll.enable(true);
      // this.scrollEnable = true;
      for( var key in ilanlar ) {
    this.ilanList.push(ilanlar[key]);
  }
    });
    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);

}

  // ilanAra(ev: any) {
  //  // let val = ev.target.value;
  //   // if (val && val.trim() != '') {
  //   //   this.ilanList = this.ilanList.filter((item) => {
  //   //     return (item.isim.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //   //   })
  // }

presentFilter(myEvent) {

  this.navCtrl.push(FiltrelePage, {
    detayAra: this.detayAra,
    sirala: this.sirala
  });
}

  checkBasvuru(ilanId: any) {
    return this.basvuruSer.checkBasvuru(ilanId);
  }

  checkKaydedilen(ilanId: any) {
    // console.log("checkk  "+"sonuc  "+JSON.stringify(ilanId._id));
    return this.basvuruSer.checkKaydedilen(ilanId);
  }

  getDays(d1) {
      // console.log(d1);
      // console.log(JSON.stringify(d1)+'datedate');
      // console.log((new Date(d1)).getTime() +' date'+ (new Date()).getTime());
    let diff =  Math.floor(( (new Date()).getTime() - (new Date(d1)).getTime() ) / 86400000);
    return diff;
  }

  onSearchInput(){
    this.searching = true;
}

}
