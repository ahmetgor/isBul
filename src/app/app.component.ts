import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AktivitePage } from '../pages/aktivite/aktivite';
import { AraPage } from '../pages/ara/ara';
import { OzgecmisPage } from '../pages/ozgecmis/ozgecmis';
import { AyarlarPage } from '../pages/ayarlar/ayarlar';
import { SonucPage } from '../pages/sonuc/sonuc';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SonucPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'İlan Ara', component: SonucPage, icon: 'search' },
      { title: 'Aktiviteler', component: AktivitePage, icon: 'walk' },
      { title: 'Özgeçmiş', component: OzgecmisPage, icon: 'list-box' },
      { title: 'Ayarlar', component: AyarlarPage, icon: 'settings' },
      // { title: 'İlan Ara', component: SonucPage, icon: null },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
