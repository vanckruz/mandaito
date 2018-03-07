import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { TiendasProvider } from '../../providers/tiendas/tiendas';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-list-store',
  templateUrl: 'list-store.html',
})
export class ListStorePage {
  categoria: any;
  tiendas: any;
  color: string = 'primary';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public tiendasProvider: TiendasProvider,
    private loading: LoadingController,
    public storage: Storage,
    public toast: ToastController
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

  addFavorite(boton, tienda){
    let toast = this.toast.create({ message: "Tienda guardada en favoritos", duration: 3000, position: 'top' });
    toast.present();

    boton._elementRef.nativeElement.setAttribute("color", "danger");
    // boton._color = "danger";
    console.log(boton)
  }

  goToProductsList(tienda){
    this.navCtrl.push('ListProductsStorePage',{
      tienda: tienda
    });
  }
}
