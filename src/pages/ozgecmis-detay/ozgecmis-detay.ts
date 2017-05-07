import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OzgecmisSer} from '../../providers/ozgecmis-ser';

/*
  Generated class for the OzgecmisDetay page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ozgecmis-detay',
  templateUrl: 'ozgecmis-detay.html'
})
export class OzgecmisDetayPage {

  detay: any;
  detayList: any;
  des: string;
  // detayClone: any;
  ozgecmisFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder, public ozgecmisSer: OzgecmisSer,
              public toastCtrl: ToastController) {

    this.detay = this.navParams.get('ozDetay');
    this.detayList = this.navParams.get('ozDetayList');
    if(this.detayList) console.log("oki");
    this.des = this.navParams.get('des');
    // this.detayClone = Object.assign({}, this.detay);

    this.ozgecmisFormGroup = formBuilder.group({
          dogumTarihi: ['', Validators.required],
          tc: ['', Validators.required],
          // tc: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          askerlik: ['', Validators.required],
          medeni: ['', Validators.required],
          ehliyet: ['', Validators.required],
          egitimdurum: ['', Validators.required],
          // tecrubedurum: ['', Validators.required],

          telefon: ['', Validators.compose([ Validators.pattern('[\(]\d{3}[\)]\d{7}'), Validators.required])],
          email: ['', Validators.required],
          adres: ['', Validators.required],

          firma: ['', Validators.required],
          pozisyon: ['', Validators.required],
          isTanimiKisa: ['', Validators.required],
          isTanimi: ['', Validators.required],
          sehir: ['', Validators.required],
          ulke: ['', Validators.required],
          giris: ['', Validators.required],
          cikis: [''],

          okul: ['', Validators.required],
          derece: ['', Validators.required],
          bolum: [''],

          dil: ['', Validators.required],
          seviye: ['', Validators.required],

          ad: ['', Validators.required],
          kurum: ['', Validators.required],

          bilgisayar: ['', Validators.required],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OzgecmisDetayPage');
  }

  save() {
    console.log(JSON.stringify(this.detay)+'detaysave');
    console.log(JSON.stringify(this.detayList)+'detaysavelist');

    if(this.detayList) {
    this.des = this.des.replace("Ekle", "");
    this.ozgecmisSer.updateOzgecmis(this.des, this.detayList);
  }
  else this.ozgecmisSer.updateOzgecmisAll(this.detay);
    // ozgecmisSer.updateOzgecmis()
    this.navCtrl.pop();
  }

  delete() {
    console.log(JSON.stringify(this.detay)+'detay');
    this.des = this.des.replace('Ekle', '');
    if ((this.des == 'tecrube' || this.des == 'egitim') && Object.keys(this.detayList).length < 2) {
      this.presentToast("Son kayıt silinemez!");
      return;
    }
    let i = this.detayList.findIndex((item) => {
        return (item === this.detay ); });
    this.detayList.splice(i,1);
    this.ozgecmisSer.updateOzgecmis(this.des, this.detayList);
    console.log(JSON.stringify(this.detayList)+'detaylist');
    this.navCtrl.pop();
  }

  add() {
    console.log(JSON.stringify(this.detay)+'detay');
    this.detayList.push(this.detay);
    this.des = this.des.replace('Ekle', '');
    this.ozgecmisSer.updateOzgecmis(this.des, this.detayList);
    this.navCtrl.pop();
  }

  presentToast(mesaj) {
  let toast = this.toastCtrl.create({
    message: mesaj,
    duration: 3000,
    position: 'top',
    showCloseButton: true,
    closeButtonText: 'OK'
  });
  toast.present();
}

}
