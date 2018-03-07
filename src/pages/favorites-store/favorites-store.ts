import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-favorites-store',
  templateUrl: 'favorites-store.html',
})
export class FavoritesStorePage {
  tiendas: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public toast: ToastController
  ){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesStorePage');
    this.getFavorites();
  }

  getFavorites(){

  }

  goToProductsList(){
    this.navCtrl.push('ListProductsStorePage');
  }  

}
