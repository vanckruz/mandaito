import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackingDetailPage } from './tracking-detail';

@NgModule({
  declarations: [
    TrackingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackingDetailPage),
  ],
})
export class TrackingDetailPageModule {}
