import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountriesListPage } from './countries-list';

@NgModule({
  declarations: [
    CountriesListPage,
  ],
  imports: [
    IonicPageModule.forChild(CountriesListPage),
  ],
})
export class CountriesListPageModule {}
