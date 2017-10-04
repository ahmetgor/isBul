import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';
import { DetayPage } from '../pages/detay/detay';

import { AktivitePage } from '../pages/aktivite/aktivite';
import { AraPage } from '../pages/ara/ara';
import { OzgecmisPage } from '../pages/ozgecmis/ozgecmis';
import { AyarlarPage } from '../pages/ayarlar/ayarlar';
import { SonucPage } from '../pages/sonuc/sonuc';
import { LoginPage } from '../pages/login/login';
import { UserAuth } from '../providers/user-auth';
import { Storage } from '@ionic/storage';
import { HesapPage } from '../pages/hesap/hesap';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  alert: any;
  user: any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              public alertCtrl: AlertController, public authService: UserAuth,
              public deeplinks: Deeplinks, public storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'İlanlar', component: SonucPage, icon: 'search' },
      { title: 'Aktiviteler', component: AktivitePage, icon: 'walk' },
      { title: 'Özgeçmiş', component: OzgecmisPage, icon: 'list-box' },
      { title: 'Ayarlar', component: AyarlarPage, icon: 'settings' },
      // { title: 'İlan Ara', component: SonucPage, icon: null },
    ];

  }

  initializeApp() {

    this.storage.get('ozgecmis')
        .then((user) => { this.user = user;
          console.log(JSON.stringify(user)+"initializeApp");
          // str.substring(0, str.indexOf(":"));
        });
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.platform.registerBackButtonAction(() => {

  if(this.nav.canGoBack()){
    this.nav.pop();
  }else{
    if(this.alert){
      this.alert.dismiss();
      this.alert =null;
    }else{
      this.presentLogout('Uygulama kapansın mı?');
     }
  }
});

this.deeplinks.routeWithNavController(this.nav, {
  '/#/ilan/:ilanId': DetayPage,
  // '/universal-links-test': AboutPage,
  // '/products/:productId': ProductPage
}).subscribe((match) => {
  console.log('Successfully routed', match);
}, (nomatch) => {
  console.warn('Unmatched Route', nomatch);
});
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

presentLogout(message) {
 this.alert = this.alertCtrl.create({
  title: message,
  // message: 'Çıkmak istediğinizden emin misiniz?',
  buttons: [
    {
      text: 'Hayır',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Evet',
      handler: () => {
        console.log('Logged out');
        if (message=='Uygulama kapansın mı?') {
          this.platform.exitApp();
        }
        else {
        this.authService.logout();
        this.nav.setRoot(LoginPage);
      }
      }
    }
  ]
});
this.alert.present();
}

goHesap() {
  this.nav.push(HesapPage);
}

// ngAfterViewInit() {
//   this.platform.ready().then(() => {
//     // Convenience to route with a given nav
//     this.deeplinks.routeWithNavController(this.nav, {
//       '/#/ilan/:ilanId': DetayPage,
//       // '/universal-links-test': AboutPage,
//       // '/products/:productId': ProductPage
//     }).subscribe((match) => {
//       console.log('Successfully routed', match);
//     }, (nomatch) => {
//       console.warn('Unmatched Route', nomatch);
//     });
//   })
// }

}
