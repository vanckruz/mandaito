import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritesStorePage } from './favorites-store';

@NgModule({
  declarations: [
    FavoritesStorePage,
  ],
  imports: [
    IonicPageModule.forChild(FavoritesStorePage),
  ],
})
export class FavoritesStorePageModule {}
