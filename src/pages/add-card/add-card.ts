import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-add-card',
  templateUrl: 'add-card.html',
})
export class AddCardPage {
	form: FormGroup;
	flag: string;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
 	  public fb: FormBuilder,
 	  private _modal: ModalController,
  ){
    this.form = this.fb.group({
      card: ['', Validators.required],
      dueDate: ['', Validators.required],
      cvv: ['', Validators.required],
      country: ['', Validators.required]
    });  
  }

  showCountries(){
    let popover = this._modal.create("CountriesListPage");
    popover.present();
    
    popover.onDidDismiss((data: any) => {
      console.log(data)
      this.form.patchValue({country: data.name})
    });//Dismiss popover
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCardPage');
  }

  next(){
    this.navCtrl.push("DeliveryAddressPage");
  }
}
