import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AktivitePage } from './aktivite';

@NgModule({
  declarations: [
    AktivitePage,
  ],
  imports: [
    IonicPageModule.forChild(AktivitePage),
  ],
  exports: [
    AktivitePage
  ]
})
export class AktivitePageModule {}
