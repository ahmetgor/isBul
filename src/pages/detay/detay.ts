import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ActionSheetController, IonicPage, Events } from 'ionic-angular';
import { BasvuruSer } from '../../providers/basvuru-ser';
import { IlanSer } from '../../providers/ilan-ser';
import { SocialSharing } from '@ionic-native/social-sharing';
// import { FacebookService, InitParams,  UIParams, UIResponse } from 'ngx-facebook';
// import { Facebook } from '@ionic-native/facebook';
import { UserAuth } from '../../providers/user-auth';
import { SonucPage } from '../sonuc/sonuc';
import { LoginPage } from '../login/login';
// import { LinkedIn } from '@ionic-native/linkedin';

declare var IN;
declare var FB;

@IonicPage({
    segment: 'detay/:ilanId'
})
@Component({
  selector: 'page-detay',
  templateUrl: 'detay.html'
})
export class DetayPage {

ilan: any;
basvuruList: Array<any>;
kaydedilenList: Array<any>;
ilanId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public ilanSer: IlanSer, public basvuruSer: BasvuruSer, public events: Events,
              private socialSharing: SocialSharing, public authService: UserAuth,
              // private fb: FacebookService,private face: Facebook,
              public plt: Platform,
              public actionSheetCtrl: ActionSheetController) {

  //  this.ilan = this.navParams.get('ilan');
  if (!this.authService.currentUser) {
  this.authService.checkAuthentication().then((res) => {
  }, (err) => {
    this.navCtrl.setRoot(LoginPage);
  });
}
   // this.basvuruList = this.navParams.get('basvurulist');
   // this.kaydedilenList = this.navParams.get('kaydedilenlist');
   this.basvuruList = this.basvuruSer.basvuruList;
   this.kaydedilenList = this.basvuruSer.kaydedilenList;
   this.ilanId = this.navParams.get('ilanId');
   this.ilan = this.navParams.get('ilan');

   // console.log(this.ilanId+"ilanId");
  //  this.basvuruList.push({id: 'hebe'});
   // console.log(JSON.stringify(this.kaydedilenList)+'detay basvuru');

  // if(this.ilanId) {

  // -------- get ilan silindi
  //   ilanSer.getIlan(this.ilanId)
  //   .then((ilan) => {this.ilan = ilan;
  // });

    // let initParams: InitParams = {
    //   appId: '112498582687614',
    //   xfbml: true,
    //   version: 'v2.9'
    // };
    //
    // fb.init(initParams);
    //  face.browserInit(112498582687614, 'v2.9');
  }

  shareFace() {
    let options = 	{
  method: "share",
	href: window.location.origin+'/#/detay/'+this.ilan._id,
	caption: "Such caption, very feed.",
	description: "Much description"
	// picture: this.ilan.resim
}
// let params: UIParams = {
//   href: window.location.origin+'/#/detay/'+this.ilan._id,
//   method: 'share'
// };

// console.log("share face");
    // this.face.showDialog( options)
    // .then((res) => // console.log(res)+"res")
    // .catch((e: any) => console.error(e)+"error");

  FB.ui({
  method: 'share',
  href: window.location.origin+'/#/detay/'+this.ilan._id,
}, function(response){});

  //     this.fb.ui(params)
  //     .then((res: UIResponse) => // console.log(res))
  //     .catch((e: any) => console.error(e));
  }

  shareLinked(){

var payload = {
  "comment": "Yeni bir İşgüçvar ilanı!" + window.location.origin+'/#/detay/'+this.ilan._id,
  "visibility": {
    "code": "anyone"
  }
};

IN.API.Raw("/people/~/shares?format=json")
  .method("POST")
  .body(JSON.stringify(payload))
  .result((onSuccess) =>{})
  .error((onError) =>{});
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DetayPage');
    //Deeplink
    if(!this.ilan) {
      this.ilanSer.getIlan(this.ilanId)
      .then((ilan) => this.ilan = ilan)
    }

    if (!this.authService.currentUser) {
    this.authService.checkAuthentication().then((res) => {
    }, (err) => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
  }

  getDays(d1) {
    // // console.log(Date.parse(d1)+' date');
    let diff =  Math.floor(( (new Date()).getTime() - Date.parse(d1) ) / 86400000);
    return diff;
  }

  basvur(ilan :any) {
    // console.log(ilan._id+'detay');
    this.basvuruSer.addBasvuru(ilan._id)
    .then((ilan) => {
       this.events.publish('basvur:update');
  });
  // console.log(JSON.stringify(this.basvuruSer.basvuruList)+'create');

  //   // console.log( JSON.stringify(this.basvuruList.find((item) => {
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
    // console.log(ilan._id+'detay');
    this.basvuruSer.deleteBasvuru(ilan._id)
    // console.log(JSON.stringify(this.basvuruSer.basvuruList)+'detay');
    .then((ilan) => {
       this.events.publish('basvur:update');
  });

  }

  kaydet(ilan :any) {
    this.basvuruSer.addKaydedilen(ilan._id)
    // console.log(JSON.stringify(this.basvuruSer.kaydedilenList)+'create');
    .then((ilan) => {
       this.events.publish('kaydet:update');
  });

  }

  deleteKaydet(ilan :any) {
    this.basvuruSer.deleteKaydedilen(ilan._id)
    // console.log(JSON.stringify(this.basvuruSer.kaydedilenList)+'detay');
    .then((ilan) => {
       this.events.publish('kaydet:update');
  });
  }

  checkBasvuru(ilanId: any) {
    // // console.log(JSON.stringify(this.basvuruList)+'detaylist');
    return this.basvuruSer.checkBasvuru(ilanId);
  }

  checkKaydedilen(ilanId: any) {
    return this.basvuruSer.checkKaydedilen(ilanId);
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
            //   // // console.log('Archive clicked');
            //   this.shareLinked();
            // }},
            {
            text: 'İptal',
            role: 'cancel',
            icon: 'close',
            handler: () => {
              // // console.log('Cancel clicked');
            }  }
        ]
      });
      actionSheet.present();
    }

share() {
  if(this.plt.is('ios') || this.plt.is('android')) {
var options = {
  message: "İşgüçvar ilanına bir göz atın:\n", // not supported on some apps (Facebook, Instagram)
  // subject: 'the subject', // fi. for email
  // files: [this.ilan.resim], // an array of filenames either locally or remotely
  url: window.location.origin+"/#/ilan/"+this.ilan._id,
  chooserTitle: 'Uygulama seçin:' // Android only, you can override the default share sheet title
}
// this.socialSharing.shareViaFacebookWithPasteMessageHint('Message via Facebook', null, "https://isgucvar.herokuapp.com/", "paste it")
// this.socialSharing.share('message', 'subject', this.ilan.resim, 'https://www.website.com/foo/#bar?a=b')
this.socialSharing.shareWithOptions(options)
.then((result) => {
    // console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    // console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
}).catch((msg) => {
    // console.log("Sharing failed with message: " + msg);
});
}
else this.presentActionSheet();
}

  // checkKaydet(ilanId) {
  //   return this.basvuruList.findIndex((item) => {
  //       return (item.id == ilanId && item.kaydedildi == 'Y' ); }) > -1
  // }

}
