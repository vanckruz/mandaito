import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
  opciones: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.opciones = this.navParams.get("opciones");
    console.log(this.navParams.get("opciones"))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

  close($opcion) {
    this.viewCtrl.dismiss($opcion);
  }
}
