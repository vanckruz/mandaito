import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav, LoadingController, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = 'WelcomePage';
  user: any;
  position: any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public storage: Storage,
    public loading: LoadingController,
    public menuCtrl: MenuController,
    public events: Events,
    private geolocation: Geolocation
  ){
    
    this.events.subscribe("userLogin", (user) => {
      this.user = user;
    });

    this.checkLogin();
    
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  getPosition(){
    this.storage.get("position").then((pos) => {
      let posicion = JSON.parse(pos);
      console.log(posicion, typeof posicion)

      if (posicion == null) {    
        this.nav.setRoot("MakeDirectionsPage",{
          inicial: true,
          user: this.user
        });
        // this.storage.set("position", JSON.stringify(this.position)).then((data) => callback())
      }else{
        this.nav.setRoot("PrincipalMenuPage");
      }
    });//storage
      
  }

  checkLogin() {
    this.storage.get('user').then((user) => {
      console.log(user)
      if (!user) {
        this.nav.setRoot("WelcomePage");
      } else {
        this.user = JSON.parse(user);
        this.menuCtrl.enable(true);                

        this.storage.get("keyTracking").then((key) => {
          let clave = JSON.parse(key);
          console.log(clave, typeof clave)
          if(clave !== null){
            this.nav.setRoot("TrackingPage");
          }else{
            this.getPosition();
          }
        })//storage
      }

    });//storage user
  }

  logout() {
    this.storage.remove('user');
    this.storage.remove('position');
    let loading = this.loading.create({content: 'Cargando...'});
    loading.present().then(() => {
      loading.dismiss().then(() => {
        this.nav.setRoot("WelcomePage");
      });
    });//Loading
  }

  goToHome() {
    this.nav.setRoot("PrincipalMenuPage");
  }

  goToNearbyStores() {
    this.nav.push("NearbyStoresPage");
  }

  goToFavoritesStore() {
    this.nav.push("FavoritesStorePage");
  }
  
  goToTracking() {
    this.nav.push("TrackingPage");
  }
  
  goToMyPerfil() {
    this.nav.push("PerfilPage");
  }  

  goToMyCart() {
    this.nav.push("CartPage");
  }    
}

