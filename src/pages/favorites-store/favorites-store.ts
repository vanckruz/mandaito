import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

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
    this.storage.get("tiendasFavoritas").then((fav) => {
      let favoritas = JSON.parse(fav);
      this.tiendas = favoritas;
      console.log(this.tiendas)
    });
  }

  delFavorite(tienda){

    
    let filterStore = this.tiendas.filter((e, index) => {
      console.log(e.idtienda, tienda.idtienda)

      return e.idtienda != tienda.idtienda;
    })

    console.log(filterStore)
    this.storage.set("tiendasFavoritas", JSON.stringify(filterStore))
    this.tiendas = filterStore;
  }

  goToProductsList(){
    this.navCtrl.push('ListProductsStorePage');
  }  

}
