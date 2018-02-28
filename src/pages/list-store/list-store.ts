import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TiendasProvider } from '../../providers/tiendas/tiendas';

@IonicPage()
@Component({
  selector: 'page-list-store',
  templateUrl: 'list-store.html',
})
export class ListStorePage {
  categoria: any;
  tiendas: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public tiendasProvider: TiendasProvider
  ){
    this.categoria = this.navParams.get("categoria");
    console.log(this.categoria);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListStorePage');
    this.getTiendas(this.categoria);
  }

  getTiendas(categoria){
    this.tiendasProvider.get(categoria.idcategoriatienda).subscribe((data) => {
      console.log(data);
      this.tiendas = data.response.datos;
    });
  }

  goToProductsList(tienda){
    this.navCtrl.push('ListProductsStorePage',{
      tienda: tienda
    });
  }
}
