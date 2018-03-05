import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { ProvinciasProvider } from '../../providers/provincias/provincias';
import { ProductosProvider } from '../../providers/productos/productos';

@IonicPage()
@Component({
  selector: 'page-provincias',
  templateUrl: 'provincias.html',
})
export class ProvinciasPage {
  provincias: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public provinciasProvider: ProvinciasProvider,
    public loading: LoadingController,
    public viewCtrl: ViewController
  ){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvinciasPage');
    this.getProvincias();
  }

  getProvincias(){
    let loading = this.loading.create({content: 'Cargando...' })
    loading.present();
    this.provinciasProvider.get().subscribe((data)=>{
      console.log(data)
      this.provincias = data.response.datos;
      loading.dismiss();
    });
  }

  passProvincia(provincia){
    this.viewCtrl.dismiss(provincia)
  }

}
