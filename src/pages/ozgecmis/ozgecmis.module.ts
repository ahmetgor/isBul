import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OzgecmisPage } from './ozgecmis';
import { DatePipeModule } from '../../pipes/date-pipe.module';
import { DatePipe } from '../../pipes/date-pipe';

@NgModule({
  declarations: [
    OzgecmisPage,
  ],
  imports: [
    IonicPageModule.forChild(OzgecmisPage),
    DatePipeModule
  ],
  exports: [
    OzgecmisPage
  ]
})
export class OzgecmisPageModule {}
