import { Component } from '@angular/core';
import { IonicPage, SegmentButton, NavController, NavParams, LoadingController, AlertController, ToastController, PopoverController, Events } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  isDisabledB: boolean = true;
  isDisabledS: boolean = false;
  perfilOptions: string = 'perfil';
  myForm: any;
  user: any;
  directionActive: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder,
    public perfilProvider: PerfilProvider,
    public storage: Storage,
    public loading: LoadingController,
    public _alert: AlertController,
    public toastCtrl: ToastController,
    private _popover: PopoverController,
    private events: Events
  ){
    this.myForm = fb.group({
      mapStyle: ['active', Validators.required]
    });
    this.events.subscribe("userLogin", (user) => {
      this.user = user;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
    this.getPerfil();
  }

  getPerfil(){
    this.storage.get('user').then((user) => {
      console.log(user)
      if (!user) {
        this.navCtrl.setRoot("WelcomePage");
      } else {
        let usuario = JSON.parse(user);
        let loading = this.loading.create({ content: "cargando" });
        loading.present();
        this.perfilProvider.get(usuario.idusuario).subscribe((data)=>{
          this.user = data.response.datos;
          console.log(data.response.datos)
          loading.dismiss();

          if (this.user.direcciones != null) {

            this.user.direcciones.forEach((element, index) => {

              this.storage.get("position").then((pos) => {
                let posicion = JSON.parse(pos);
                if (posicion != null) {
                  if (element.idusuariodireccion == posicion.idusuariodireccion) {
                      element.selected = true;
                    } else {
                      element.selected = false;
                    }
                }
              });//storage

            });//First For Each
          }          
          
        });
      }

    });//storage user    
  }

  
  editPerfil(user) {
    this.navCtrl.push('EditPerfilPage',{
      user: user
    });
  }
  
  addMethod(){
    this.navCtrl.push('MakeMethodsPage',{
      user: this.user.perfil
    });
  }
  
  addDirection(){
    this.navCtrl.push('MakeDirectionsPage',{
      user: this.user.perfil
    });
  }

  detailOrder(item){
    this.navCtrl.push("DetailOrderPage",{
      user: this.user.perfil,
      orderId: item.nroorden
    })
  }

  toggleBDisabled() {
    this.isDisabledB = !this.isDisabledB;
  }

  toggleSDisabled() {
    this.isDisabledS = !this.isDisabledS;
  }

  onSegmentChanged(segmentButton: SegmentButton) {
    console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    console.log('Segment selected', segmentButton.value);
  }

  doSubmit(ev: UIEvent) {
    console.log('Submitting form', this.myForm.value);
    ev.preventDefault();
  }

  presentPopoverMethod(item) {
    console.log(item)
    let popover = this._popover.create("OptionsPage");
    popover.present();

    popover.onDidDismiss((data: any) => {
      if (data === 1) {
        this.navCtrl.push("EditMethodPage", {
          user: this.user,
          metodo: item
        })
      }
      if (data === 2) {
        this.presentConfirmMethod(item);
      }
    });//Dismiss popover

  }

  presentConfirmMethod(metodo) {
    let alert = this._alert.create({
      title: 'Confirmar',
      message: '¿Estás seguro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            let loading = this.loading.create({ content: 'Cargando...' });
            loading.present();
            this.perfilProvider.eliminarMetodo(this.user.perfil.idusuario, metodo.idusuariometodo).subscribe((data) => {
              loading.dismiss();
              this.toastMessage("Tarjeta eliminada").present();
              this.getPerfil();
            }, (error) => {
              console.log(error)
              loading.dismiss();
              this.toastMessage("Error al eliminar").present();
            });
          }
        }
      ]
    });
    alert.present();
  }//MEtodos options  


  presentPopoverDirection(item) {
    let popover = this._popover.create("OptionsPage",{
      opciones: {
        editar: true
      }
    });
    popover.present();

    popover.onDidDismiss((data: any) => {
      if (data === 1) {
        console.log(item)
        this.storage.set("position", JSON.stringify(item))
        // this.user.direcciones = this.user.direcciones;
        // this.user.direcciones = [];
        this.getPerfil();
        // this.perfilOptions = 'address';
      }
      if (data === 2) {
        this.presentConfirmDirection(item);
      }
    });//Dismiss popover

  }

  presentConfirmDirection(direccion) {
    let alert = this._alert.create({
      title: 'Confirmar',
      message: '¿Estás seguro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            let loading = this.loading.create({ content: 'Cargando...' });
            loading.present();
            this.perfilProvider.eliminarDireccion(this.user.perfil.idusuario, direccion.idusuariodireccion).subscribe((data) => {
              loading.dismiss();
              this.toastMessage("Dirección eliminada").present();
              this.getPerfil();
            }, (error) => {
              console.log(error)
              loading.dismiss();
              this.toastMessage("Error al eliminar").present();
            });
          }
        }
      ]
    });
    alert.present();
  }//MEtodos options    

  toastMessage(message): any {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    return toast;
  }    
}  