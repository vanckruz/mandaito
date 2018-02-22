import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearbyStoresPage } from './nearby-stores';

@NgModule({
  declarations: [
    NearbyStoresPage,
  ],
  imports: [
    IonicPageModule.forChild(NearbyStoresPage),
  ],
})
export class NearbyStoresPageModule {}
