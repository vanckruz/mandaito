import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-principal-menu',
  templateUrl: 'principal-menu.html',
})
export class PrincipalMenuPage {
  url: any = 'https://loremflickr.com/320/240';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrincipalMenuPage');
  }

  goToStores(){
    this.navCtrl.push('ListStorePage')
  }

}
