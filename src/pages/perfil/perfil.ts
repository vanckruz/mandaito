import { Component } from '@angular/core';
import { IonicPage, SegmentButton, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    fb: FormBuilder
  ){
    this.myForm = fb.group({
      mapStyle: ['active', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
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