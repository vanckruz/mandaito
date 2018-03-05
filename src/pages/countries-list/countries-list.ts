import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { CountriesProvider } from '../../providers/countries/countries';

@IonicPage()
@Component({
  selector: 'page-countries-list',
  templateUrl: 'countries-list.html',
})
export class CountriesListPage {
  countriesList: Array<any>
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public countries: CountriesProvider,
    public viewCtrl: ViewController,
    public loading: LoadingController
  ){

  }

  ionViewDidLoad() {
    let loading = this.loading.create({content: "Cargando..."});

    loading.present();
    
    this.countries.get().subscribe(
        data => {
          loading.dismiss();
          this.countriesList = data;
        }
    );
  }

  passCallingPhone(country){
    console.log(country)
    this.viewCtrl.dismiss(country);
  }

}
