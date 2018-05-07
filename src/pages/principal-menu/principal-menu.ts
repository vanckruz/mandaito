import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { Storage } from '@ionic/storage';

import { Pipe, PipeTransform } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-principal-menu',
  templateUrl: 'principal-menu.html',
})
export class PrincipalMenuPage {
  categorias: any;
  searchTerm: string;
  position: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriasProvider: CategoriasProvider,
    public loading: LoadingController,
    public _sanitizer: DomSanitizer,
    private geolocation: Geolocation,
    public storage: Storage
  ){

  }

  ionViewDidLoad() {
    this.getCategorias();
  }

  getCategorias(){
    let loading = this.loading.create({content: "Cargando"});

    loading.present();
    
    this.categoriasProvider.get().subscribe(
      data => {
        loading.dismiss();
        this.categorias = data.response.datos;
      }
    );    
  }

  sanitizeImage(image: string) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

  filterCategories() {
    if (this.searchTerm !== ""){
      this.categorias = this.categorias.filter((item) => {
        return item.descripcion.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });

    }else{
      this.getCategorias();      
    }
  }

  goToStores(data){
    this.navCtrl.push('ListStorePage',{
      categoria: data
    })
  }

}
