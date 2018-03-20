import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PerfilProvider } from '../../providers/perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-make-directions',
  templateUrl: 'make-directions.html',
})
export class MakeDirectionsPage {
  form: FormGroup;
  user: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder,
    public loading: LoadingController,  
    public toast: ToastController,
    public perfil: PerfilProvider
  ){
    this.form = this.fb.group({
      direccion1: ['', Validators.required],
      direccion2: ['', Validators.required],
      provincia: ['', Validators.required],
      ciudad: ['', Validators.required],
      codigopostal: ['', Validators.required]
    }); 
    this.user = this.navParams.get("user");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeDirectionsPage', this.user);
  }

  save(){
    if (this.form.valid) {
      let loading = this.loading.create({ content: 'Cargando...' });
      loading.present();
      console.log(this.form.value)
      this.perfil.setDirections(this.user.idusuario, this.form.value).subscribe(data => {
        console.log(data)
        loading.dismiss();
        let toast = this.toast.create({ message: data.msg, duration: 3000, position: 'top' });
        toast.present();
        this.navCtrl.popToRoot();
      }, (error) => {
        loading.dismiss();
        let toast = this.toast.create({ message: "Error al guardar", duration: 3000, position: 'top' });
        toast.present();
      });

    }    
  }

}
