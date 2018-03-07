import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productosProvider: ProductosProvider,
    public loading: LoadingController,
    public toast: ToastController,
    public storage: Storage
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
          loading.dismiss();
          console.log(data)
        }
      );
    }
  }

  add(producto){
    let toast = this.toast.create({ message: "Producto añadido al carrito", duration: 3000, position: 'top' });
    toast.present();
    console.log(producto)
    
    // this.storage.get("carrito").then((carrito) => {
    //   let car = JSON.parse(carrito);
    //   console.log(carrito)

    //   if(carrito == null){
    //     car = [];
    //     producto.cantidad = 1;
    //     producto.total = parseFloat(producto.precio);
    //     car.push(producto)
    //     this.storage.set("carrito", JSON.stringify(car));        
    //   }else{
    //     //Build Json Car
    //     if (car.length > 0){

    //       let mapProducts = car.map((item, index)=>{
    //         console.log(index, item.idproducto, producto.idproducto)
    //         console.log(typeof item.idproducto, typeof producto.idproducto)
    //         console.log(item.idproducto == producto.idproducto)

    //         if (item.idproducto == producto.idproducto){
    //           item.cantidad++;
    //           item.precio += parseFloat(producto.precio);
    //           item.total += item.cantidad * item.precio;
    //           console.log(item);
    //         }else{
    //           producto.cantidad = 1;
    //           producto.total = producto.precio;
    //           car.push(producto)
    //         }

    //         return item;
    //       })

    //       console.log(mapProducts)
          
    //       this.storage.set("carrito", JSON.stringify(mapProducts));
    //     }
        
    //     console.log(car)
    //   }
    // });
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
