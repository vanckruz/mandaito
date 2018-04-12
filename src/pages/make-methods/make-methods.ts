import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-make-methods',
  templateUrl: 'make-methods.html',
})
export class MakeMethodsPage {
  form: FormGroup;
  user: any;
  min: any; 
  max: any; 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public loading: LoadingController,
    public toast: ToastController,
    public perfilProvider: PerfilProvider,
    private _modal: ModalController,
    public storage: Storage,    
    public events: Events
  ){
    this.min = moment(Date.now()).format("YYYY");    
    this.max = moment(Date.now()).add(5, 'y').format("YYYY");    
    
    this.form = this.fb.group({
      tipotarjeta: ['', Validators.required],
      tarjetanro: ['', Validators.compose([
        Validators.required,
        Validators.pattern('([0-9])*$'),
        Validators.maxLength(16),
        Validators.minLength(16),
      ])],
      tarjetanombre: ['', Validators.required],
      tarjetafecha: ['', Validators.required],
      cvv: ['', Validators.compose([
        Validators.required,
        Validators.pattern('([0-9])*$'),
        Validators.maxLength(3),
        Validators.minLength(3),
      ])],
      pais: ['', Validators.required],
    });      
    this.user = this.navParams.get("user");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeMethodsPage');
  }

  showCountries() {
    let popover = this._modal.create("CountriesListPage");
    popover.present();

    popover.onDidDismiss((data: any) => {
      console.log(data)
      this.form.patchValue({ pais: data.name })
    });//Dismiss popover
  }

  getPerfil() {
    this.storage.get('user').then((user) => {
      console.log(user)
      if (!user) {
        this.navCtrl.setRoot("WelcomePage");
      } else {
        let usuario = JSON.parse(user);
        let loading = this.loading.create({ content: "cargando" });
        loading.present();
        this.perfilProvider.get(usuario.idusuario).subscribe((data) => {
          this.user = data.response.datos;
          console.log(data.response.datos)
          loading.dismiss();
          this.events.publish("userLogin", this.user);
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

  save() {
    if (this.form.valid) {
      let loading = this.loading.create({ content: 'Cargando...' });
      loading.present();
      console.log(this.form.value)
      this.perfilProvider.setMethods(this.user.idusuario, this.form.value).subscribe(data => {
        console.log(data)
        loading.dismiss();
        let toast = this.toast.create({ message: data.msg, duration: 3000, position: 'top' });
        toast.present();
        this.getPerfil();
        this.navCtrl.pop();
      }, (error) => {
        loading.dismiss();
        let toast = this.toast.create({ message: "Error al guardar", duration: 3000, position: 'top' });
        toast.present();
      });

    }
  }  

}
