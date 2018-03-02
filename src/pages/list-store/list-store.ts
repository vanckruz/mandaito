import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    public tiendasProvider: TiendasProvider,
    private loading: LoadingController,
  ){
    this.categoria = this.navParams.get("categoria");
    console.log(this.categoria);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListStorePage');
    this.getTiendas();
  }

  getTiendas(){
    if(this.categoria != undefined){
      let loading = this.loading.create({ content: 'Cargando...' });
      loading.present().then(() => {
        this.tiendasProvider.get(this.categoria.idcategoriatienda).subscribe((data) => {
          console.log(data);
          loading.dismiss();
          this.tiendas = data.response.datos;
        });
      });
    }
  }

  goToProductsList(tienda){
    this.navCtrl.push('ListProductsStorePage',{
      tienda: tienda
    });
  }
}
