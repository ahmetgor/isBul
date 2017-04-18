import { Component } from '@angular/core';
import { NavController, NavParams, ModalController} from 'ionic-angular';
import { IlanSer } from '../../providers/ilan-ser';
import { DetayPage } from '../detay/detay';
import { FiltrelePage } from '../filtrele/filtrele';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-sonuc',
  templateUrl: 'sonuc.html'
})
export class SonucPage {

  ilanList: any;
  basvuruList: any;
  detayAra: any = {};
  sirala: any = '{}';
  searching: boolean = false;
  searchTerm: string = '';
  searchControl: FormControl;

  // {id: number, isim: string, firma: string, açıklama: string, il: string, tip:string, eğitim: string, tecrübe: string, ehliyet: string, askerlik: string, görüntülenme: string, başvuru: string, olusturan:string, olusurmaTarih:string, guncelleyen:string, guncellemeTarih:string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ilanSer: IlanSer, public modalCtrl: ModalController) {

    this.searchControl = new FormControl();

    // this.getBasvuru();
    console.log('constructor SonucPage çağrıldı');

  }

  ionViewDidLoad() {
    this.ilanListele();
    console.log('ionViewDidLoad SonucPage çağrıldı');
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      // if(search.length > 2) {
    this.ilanListele();
    console.log('searchkontrol çağrıldı');
  // }
});
  }

  ilanListele() {
    this.searching = true;
    this.ilanSer.getIlanlar(this.searchTerm, this.detayAra, this.sirala)
    .then(ilanlar => {
      this.ilanList = ilanlar;
      console.log(this.searchTerm);
      this.searching = false;
    });

  }

  itemTapped(ev, ilan) {
    // console.log(JSON.stringify(this.basvuruList)+'sonuc basvuru');
    console.log(JSON.stringify(ilan)+'ilan');
    this.navCtrl.push(DetayPage, {
      ilan: ilan,
      basvurulist: this.ilanSer.basvurKaydetList
    });
  }

  // ilanAra(ev: any) {
  //  // let val = ev.target.value;
  //   // if (val && val.trim() != '') {
  //   //   this.ilanList = this.ilanList.filter((item) => {
  //   //     return (item.isim.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //   //   })
  // }

presentFilter(myEvent) {
  let modal = this.modalCtrl.create(FiltrelePage, {
    detayAra: this.detayAra,
    sirala: this.sirala
  });

  console.log('Dismiss started');
  modal.onDidDismiss((sirala, detayAra) => {
    console.log(sirala+'sirala ana sayfa');
    this.searching = true;
    this.sirala = sirala;
    this.detayAra = detayAra;
    this.ilanListele();

});
  modal.present({
    ev: myEvent
  });
}

  checkBasvuru(ilanId) {
    return this.ilanSer.basvurKaydetList.findIndex((item) => {
        return (item.id == ilanId && item.basvuruldu == 'Y' ); }) > -1
  }

  checkKaydet(ilanId) {
    return this.ilanSer.basvurKaydetList.findIndex((item) => {
        return (item.id == ilanId && item.kaydedildi == 'Y' ); }) > -1
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
