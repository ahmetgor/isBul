import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { AktivitePage } from '../pages/aktivite/aktivite';
import { AraPage } from '../pages/ara/ara';
import { CvPage } from '../pages/cv/cv';
import { SonucPage } from '../pages/sonuc/sonuc';
import { DetayPage } from '../pages/detay/detay';
import { AyarlarPage } from '../pages/ayarlar/ayarlar';
import { FiltrelePage } from '../pages/filtrele/filtrele';

import { IlanSer } from '../providers/ilan-ser';
import { UserAuth } from '../providers/user-auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    AktivitePage,
    AraPage,
    CvPage,
    AyarlarPage,
    SonucPage,
    DetayPage,
    FiltrelePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    AktivitePage,
    AraPage,
    CvPage,
    AyarlarPage,
    SonucPage,
    DetayPage,
    FiltrelePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IlanSer,
    UserAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
