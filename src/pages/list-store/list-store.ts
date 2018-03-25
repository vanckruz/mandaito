import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { TiendasProvider } from '../../providers/tiendas/tiendas';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { Geolocation } from '@ionic-native/geolocation';

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
  latitud: any;
  longitud: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public tiendasProvider: TiendasProvider,
    private loading: LoadingController,
    public storage: Storage,
    public toast: ToastController,
    private geolocation: Geolocation
  ){
    // this.getPosition();
    this.categoria = this.navParams.get("categoria");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListStorePage');
    this.getPosition();
  }

  getPosition(){
    let loading = this.loading.create({ content: 'Obteniendo Ubicación por favor espere...' });
    loading.present().then(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitud = resp.coords.latitude;
        this.longitud = resp.coords.longitude;
        console.log(this.latitud, this.longitud)
        loading.dismiss();
        this.getTiendas();
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        console.log(data)
        // this.latitud = data.coords.latitude;
        // this.longitud = data.coords.longitude;
      });    
    });//loading
  }

  getTiendas(){
    console.log(this.latitud, this.longitud)
    if(this.categoria != undefined){
      let loading = this.loading.create({ content: 'Cargando...' });

      loading.present().then(() => {
        this.tiendasProvider.get(this.categoria.idcategoriatienda, this.latitud, this.longitud).subscribe((data) => {
          
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

  showDistance(valor){
    if (valor.split(".")[0] > 0){
      return (Math.round(parseFloat(valor) * 100) / 100)+" km";
    } else if (valor.split(".")[0] == 0){
      return (String(Math.round(parseFloat(valor) * 100) / 100).split(".")[1])+" m";
    }else{
      return "";
    }
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
