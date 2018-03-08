import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { TiendasProvider } from '../../providers/tiendas/tiendas';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-list-store',
  templateUrl: 'list-store.html',
})
export class ListStorePage {
  categoria: any;
  tiendas: any;
  color: string = 'primary';
  hearts: Array<boolean> = new Array();

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
          
          loading.dismiss();
          console.log(data);
          if(data.response.datos){

            let tiendas = data.response.datos
            
            tiendas.forEach( (element, index) => {
              element.horaabierto = moment(element.horaabierto, "HH:mm A").format('LT');
              element.horacierre = moment(element.horacierre, "HH:mm A").format('LT');
              this.hearts.push(false);
            });
            
            this.tiendas = tiendas;
          }
          
        });
      });
    }
  }
  
  addFavorite(tienda, i){
    console.log(tienda)

    this.hearts[i] = !this.hearts[i];
    this.storage.get("tiendasFavoritas").then((fav)=>{
      let favoritas = JSON.parse(fav);
      
      if (favoritas == null) {
        let tiendas = new Array();
        tiendas.push(tienda);
        console.log(tiendas)
        this.storage.set("tiendasFavoritas", JSON.stringify(tiendas));    
        let toast = this.toast.create({ message: "Tienda guardada en favoritos", duration: 3000, position: 'top' });
        toast.present();      
      }else{
        let foundItem = null;

        for (let store of favoritas) {
          console.log(store.idtienda, tienda.idtienda)
          console.log(store.idtienda == tienda.idtienda)

          if (store.idtienda == tienda.idtienda) {
            let toast = this.toast.create({ message: "Esta tienda ya esta guardada en favoritos", duration: 3000, position: 'top' });
            toast.present();
            foundItem = store;
            break;
          }

          console.log(foundItem);

        }//for
        if (foundItem == null) {
          console.log(tienda)
          favoritas.push(tienda)
        }      
        console.log(favoritas)  
        this.storage.set("tiendasFavoritas", JSON.stringify(favoritas));    
      }
    });
  }

  goToProductsList(tienda){
    this.navCtrl.push('ListProductsStorePage',{
      tienda: tienda
    });
  }
}
