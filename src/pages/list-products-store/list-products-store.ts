import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-list-products-store',
  templateUrl: 'list-products-store.html',
})
export class ListProductsStorePage {
  tienda: any;
  productos: any;
  productosAux: any;
  searchTerm: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productosProvider: ProductosProvider,
    public loading: LoadingController,
    public toast: ToastController,
    public storage: Storage,
    private alertCtrl: AlertController
  ){
    this.tienda = this.navParams.get("tienda");
    console.log(this.tienda)
  }

  ionViewDidLoad() {
    this.getProductos();
  }

  getProductos() {
    if(this.tienda != undefined){
      let loading = this.loading.create({content: "Cargando..."});
      loading.present();
      
      this.productosProvider.get(this.tienda.idtienda).subscribe(
        data => {
          this.productos = data.response.datos;
          this.productosAux = data.response.datos;
          loading.dismiss();
          console.log(data)
        }
      );
    }
  }

  add(producto){
    
    this.storage.get("carrito").then((carrito) => {
      let car = JSON.parse(carrito);
      
      this.storage.get("nowstore").then((tienda)=>{
        let store = JSON.parse(tienda);

        console.log(tienda, store)
        
        if (store == null) {
          this.storage.set("nowstore", JSON.stringify(this.tienda)); 
        }

        if (store == null || this.tienda.idtienda == store.idtienda){
          let toast = this.toast.create({ message: "Producto añadido al carrito", duration: 3000, position: 'top' });
          toast.present();
          console.log(producto)
          if (car == null) {
            car = [];
            producto.cantidad = 1;
            producto.total = parseFloat(producto.precio);
            car.push(producto)
            this.storage.set("carrito", JSON.stringify(car));
          } else {
            //Build Json Car
            if (car.length > 0) {

              let foundItem = null;

              for (let item of car) {
                if (item.idproducto == producto.idproducto) {
                  item.cantidad++;
                  item.total = item.cantidad * item.precio;
                  foundItem = item;
                  break;
                }
              }//for

              if (foundItem == null) {
                producto.cantidad = 1;
                producto.total = parseFloat(producto.precio);
                car.push(producto)
              }

              this.storage.set("carrito", JSON.stringify(car));
            }//If car lenght

          }//If the car is not empty
        }else{
          let alert = this.alertCtrl.create({
            title: 'Mensaje',
            subTitle: `Debe confirmar los productos de la tienda: <a (click)="goToProductsList(store)">${store.descripcion}</a>`,
            buttons: [
              {
                text: 'Ver tienda',
                handler: () => {
                  this.goToProductsList(store);
                }
              },
              {
                text: 'Ok'
              }
            ]
          });
          alert.present();          
        }

      });

      //here

    });
  }

  filterProducts(){
    if (this.searchTerm !== "") {
      this.productos = this.productosAux.filter((item) => {
        return item.descripcion.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });

    } else {
      this.getProductos();
    }
  }

  goToProductsList(tienda) {
    this.navCtrl.push('ListProductsStorePage', {
      tienda: tienda
    });
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
