import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';

@IonicPage()
@Component({
  selector: 'page-list-products-store',
  templateUrl: 'list-products-store.html',
})
export class ListProductsStorePage {
  tienda: any;
  productos: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productosProvider: ProductosProvider,
  ){
    this.tienda = this.navParams.get("tienda");
    console.log(this.tienda)
  }

  ionViewDidLoad() {
    this.getProductos();
  }

  getProductos() {
    if(this.tienda != undefined){
      this.productosProvider.get(this.tienda.idtienda).subscribe(
        data => {
          this.productos = data.response.datos;
          console.log(data)
        }
      );
    }
  }

  goToMyCart(){
    console.log("funciona");
    this.navCtrl.push("CartPage");
  }

  detailProduct(producto){
    this.navCtrl.push("DetailProductPage", {
      producto: producto
    });
  }
}
