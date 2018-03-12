import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CategoriasProvider } from '../../providers/categorias/categorias';

import { Pipe, PipeTransform } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-principal-menu',
  templateUrl: 'principal-menu.html',
})
export class PrincipalMenuPage {
  categorias: any;
  searchTerm: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriasProvider: CategoriasProvider,
    public loading: LoadingController
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
        console.log(this.categorias)
      }
    );    
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
