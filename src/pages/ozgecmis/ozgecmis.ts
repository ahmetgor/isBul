import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events, IonicPage, ActionSheetController, Platform} from 'ionic-angular';
import { IlanSer } from '../../providers/ilan-ser';
import { OzgecmisSer} from '../../providers/ozgecmis-ser';
import { UserAuth} from '../../providers/user-auth';
import { Storage } from '@ionic/storage';
import { OzgecmisDetayPage } from '../ozgecmis-detay/ozgecmis-detay';
import { LoginPage } from '../login/login';
import { Facebook } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';

declare var IN;
declare var FB;

@IonicPage()
@Component({
  selector: 'page-ozgecmis',
  templateUrl: 'ozgecmis.html'
})

export class OzgecmisPage {

  ozgecmis: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ilanSer: IlanSer, public ozgecmisSer: OzgecmisSer,  public authService: UserAuth,
              public alertCtrl: AlertController,public storage: Storage, public events: Events,
              public actionSheetCtrl: ActionSheetController, private face: Facebook,
              public plt: Platform,private socialSharing: SocialSharing) {

              // this.ozgecmis = ozgecmisSer.ozgecmis;
              console.log('ionViewDidLoad OzgecmisPage const');
    }

  ionViewDidLoad() {
    if (!this.authService.currentUser) {
      console.log('ozgecmis checkauth');
    this.authService.checkAuthentication().then((res) => {
      this.ozgecmisSer.getOzgecmis(this.authService.currentUser.ozgecmis)
      .then((ozgecmis) => this.ozgecmis = ozgecmis)
      .catch((err) => {});
    }, (err) => {
      console.log('ozgecmis checkauth error');
      this.navCtrl.setRoot(LoginPage);
    });
  }
  else{
    console.log('ionViewWillEnter OzgecmisPage const');
    // this.storage.get('ozgecmis').then((ozgecmis) => {
    //   console.log("storage"+ JSON.stringify(ozgecmis));
    //   this.ozgecmis = ozgecmis;
    //   });
      // console.log("storage"+ JSON.stringify(this.authService.currentUser.ozgecmis));
    this.ozgecmisSer.getOzgecmis(this.authService.currentUser.ozgecmis)
    .then((ozgecmis) => this.ozgecmis = ozgecmis)
    .catch((err) => {});
}
this.events.subscribe('ozgecmis:update', ()=> {
this.ozgecmisSer.getOzgecmis(this.authService.currentUser.ozgecmis)
.then((ozgecmis) => this.ozgecmis = ozgecmis)
});
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

  shareFace() {
//     let options = 	{
//   method: "share",
// 	href: window.location.origin+'/#/detay/'+this.ozgecmis._id,
// 	caption: "Such caption, very feed.",
// 	description: "Much description"
// 	// picture: this.ilan.resim
// }

console.log("share face");

  FB.ui({
  method: 'share',
  href: 'https://isgucvarisveren.herokuapp.com'+'/#/ilandetay/'+this.ozgecmis._id,
}, function(response){});

  }

//   shareLinked(){
// var payload = {
//   "comment": "Yeni bir İşgüçvar ilanı!" + window.location.origin+'/#/detay/'+this.ozgecmis._id,
//   "visibility": {
//     "code": "anyone"
//   }
// };
//
// IN.API.Raw("/people/~/shares?format=json")
//   .method("POST")
//   .body(JSON.stringify(payload))
//   .result((onSuccess) =>{})
//   .error((onError) =>{});
//   }


  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Özgeçmişiniz Eksik!',
    subTitle: 'Aktiflemek için Kişisel Bilgileriniz ve İletişim Bilgileriniz tam olmalı. Ayrıca Tecrübe ve Eğitim için en az 1 giriş olmalı.',
    buttons: ['Kapat']
  });
  alert.present();
}

presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'İlan Paylaş',
      buttons: [
        {
          text: 'Facebook',
          icon: 'logo-facebook',
          handler: () => {
            this.shareFace();
          }},
          // {
          // text: 'LinkedIn',
          // icon: 'logo-linkedin',
          // handler: () => {
          //   console.log('Archive clicked');
          //   this.shareLinked();
          // }},
          {
          text: 'İptal',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }  }
      ]
    });
    actionSheet.present();
  }

  share() {
    if(this.plt.is('ios') || this.plt.is('android')) {
  var options = {
    message: "share this\n", // not supported on some apps (Facebook, Instagram)
    // subject: 'the subject', // fi. for email
    // files: [this.ilan.resim], // an array of filenames either locally or remotely
    url: 'https://isgucvarisveren.herokuapp.com'+'/#/ilandetay/'+this.ozgecmis._id,
    chooserTitle: 'Uygulama seçin:' // Android only, you can override the default share sheet title
  }
  // this.socialSharing.shareViaFacebookWithPasteMessageHint('Message via Facebook', null, "https://isgucvar.herokuapp.com/", "paste it")
  // this.socialSharing.share('message', 'subject', this.ilan.resim, 'https://www.website.com/foo/#bar?a=b')
  this.socialSharing.shareWithOptions(options)
  .then((result) => {
      console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
  }).catch((msg) => {
      console.log("Sharing failed with message: " + msg);
  });
  }
  else this.presentActionSheet();
  }

getAge() {
  return ~~(((new Date()).getTime() - (new Date(this.ozgecmis.dogumTarihi)).getTime()) / (31557600000));
}


}
