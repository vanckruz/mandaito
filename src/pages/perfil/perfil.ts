import { Component } from '@angular/core';
import { IonicPage, SegmentButton, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { PerfilProvider } from '../../providers/perfil/perfil';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  relationship: string = 'enemies';
  modelStyle: string = 'B';
  appType: string = 'free';
  icons: string = 'camera';
  isDisabledB: boolean = true;
  isDisabledS: boolean = false;
  perfilOptions: string = 'perfil';
  myForm: any;
  user: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder,
    public perfilProvider: PerfilProvider,
    public storage: Storage,
    public loading: LoadingController
  ){
    this.myForm = fb.group({
      mapStyle: ['active', Validators.required]
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
        });
      }

    });//storage user    
  }

  editPerfil() {
    this.navCtrl.push('EditPerfilPage');
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
}  