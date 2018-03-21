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
  searchTerm: string;

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
            if(tiendas != null){

              tiendas.forEach( (element, index) => {
                element.horaabierto = moment(element.horaabierto, "HH:mm A").format('LT');
                element.horacierre = moment(element.horacierre, "HH:mm A").format('LT');
                
                this.storage.get("tiendasFavoritas").then((fav) => {
                  let favoritas = JSON.parse(fav);
                  if(favoritas != null){
                    favoritas.forEach(element2 => {
                      console.log(element, element2)
                      if (element.idtienda == element2.idtienda){
                        element.favorito = true;
                      }else{
                        element.favorito = false;
                      }
                    });
                  }
                });
                
              });//First For Each
            }
              
            console.log(tiendas)
            this.tiendas = tiendas;
          }
          
        });
      });
    }
  }
  
  addFavorite(tienda){
    console.log(tienda)

    // this.hearts[i] = !this.hearts[i];
    tienda.favorito = !tienda.favorito;
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
            let toast = this.toast.create({ message: "Tienda removida de favoritos", duration: 3000, position: 'top' });
            toast.present();
            foundItem = store;
            break;
          }

          console.log(foundItem);

        }//for
        //Sino se encontro el item:
        if (foundItem == null) {
          console.log(tienda)
          favoritas.push(tienda)
          let toast = this.toast.create({ message: "Tienda guardada en favoritos", duration: 3000, position: 'top' });
          toast.present();          
        }else{
          let filterStore = favoritas.filter((e, index) => {
            console.log(e.idtienda, tienda.idtienda)

            return e.idtienda != tienda.idtienda;
          })

          favoritas = filterStore;          
        }   

        this.storage.set("tiendasFavoritas", JSON.stringify(favoritas));    
      }
    });
  }

  filterStores(){
    if (this.searchTerm !== "") {
      this.tiendas = this.tiendas.filter((item) => {
        return item.descripcion.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });

    } else {
      this.getTiendas();
    }
  }

  goToProductsList(tienda){
    console.log(tienda)
    this.navCtrl.push('ListProductsStorePage',{
      tienda: tienda
    });
  }
}
