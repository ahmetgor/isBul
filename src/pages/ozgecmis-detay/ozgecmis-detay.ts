import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  detayClone: any;
  ozgecmisFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder) {

    this.detay = this.navParams.get('ozDetay');
    this.detayList = this.navParams.get('ozDetayList');
    this.des = this.navParams.get('des');
    this.detayClone = Object.assign({}, this.detay);

    this.ozgecmisFormGroup = formBuilder.group({
          dogumTarihi: ['', Validators.required],
          tc: ['', Validators.required],
          // tc: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          askerlik: ['', Validators.required],
          medeni: ['', Validators.required],
          ehliyet: ['', Validators.required],

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
    console.log(JSON.stringify(this.detay)+'detay');
    this.navCtrl.pop();
  }

  delete() {
    console.log(JSON.stringify(this.detay)+'detay');
    let i = this.detayList.findIndex((item) => {
        return (item === this.detay ); });
    this.detayList.splice(i,1);
    console.log(JSON.stringify(this.detayList)+'detaylist');
    this.navCtrl.pop();
  }

  add() {
    console.log(JSON.stringify(this.detay)+'detay');
    this.detayList.push(this.detay);
    this.navCtrl.pop();
  }

}
