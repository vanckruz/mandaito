import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController, Events, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-make-method-register',
  templateUrl: 'make-method-register.html',
})
export class MakeMethodRegisterPage {
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
    public menuCtrl: MenuController,
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

  save() {
    if (this.form.valid) {
      let loading = this.loading.create({ content: 'Cargando...' });
      loading.present();
      console.log(this.form.value)
      this.perfilProvider.setMethods(this.user.idusuario, this.form.value).subscribe(data => {
        console.log(data)
        loading.dismiss();
        let toast = this.toast.create({ message: "Tarjeta guardada con éxito, por favor indique la dirección donde desea recibir los mandados", duration: 3000, position: 'top' });
        toast.present();
        /* Set storage User  */
        this.storage.set('user', JSON.stringify(this.user)).then((user) => {
          let userJson = JSON.parse(user);
          console.log(userJson)
          this.events.publish("userLogin", userJson);
          this.menuCtrl.enable(true);
          // this.navCtrl.setRoot("PrincipalMenuPage");    

          this.storage.get("position").then((pos) => {
            let posicion = JSON.parse(pos);
            console.log(posicion, typeof posicion)

            if (posicion === null) {
              this.navCtrl.setRoot("MakeDirectionsPage", {
                inicial: true,
                user: userJson
              });
            } else {
              this.navCtrl.setRoot("PrincipalMenuPage");
            }
          });

        });
        /* Set storage User  */
      }, (error) => {
        loading.dismiss();
        let toast = this.toast.create({ message: "Error al guardar", duration: 3000, position: 'top' });
        toast.present();
      });

    }
  }  

}
