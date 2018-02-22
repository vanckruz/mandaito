import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListStorePage } from './list-store';

@NgModule({
  declarations: [
    ListStorePage,
  ],
  imports: [
    IonicPageModule.forChild(ListStorePage),
  ],
})
export class ListStorePageModule {}
