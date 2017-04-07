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
  des: string;
  ozgecmisFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder) {

    this.detay = this.navParams.get('ozDetay');
    this.des = this.navParams.get('des');

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
          giris: ['', Validators.required],
          cikis: ['']
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OzgecmisDetayPage');
  }

}
