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

  getPosition(callback){
    this.storage.get("position").then((pos) => {
      let posicion = JSON.parse(pos);
      console.log(posicion, typeof posicion)
      if (posicion == null) {    
        let loading = this.loading.create({ content: 'Obteniendo Ubicación por favor espere...' });
        loading.present().then(() => {    
            this.geolocation.getCurrentPosition().then((resp) => {
              console.log(resp.coords.latitude, resp.coords.longitude)

              loading.dismiss();
              
              this.position = {
                latitud: resp.coords.latitude,
                longitud: resp.coords.longitude
              }

              this.storage.set("position", JSON.stringify(this.position)).then((data) => callback())

            }).catch((error) => {
              console.log('Error getting location', error);
            });//Get current position
        });//loading
      }else{
        this.nav.setRoot("PrincipalMenuPage");
      }
    });//storage
      
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log("en el watch: ", data.coords, data.coords.latitude, data.coords.longitude)

      this.position = {
        latitud: data.coords.latitude,
        longitud: data.coords.longitude
      }

      this.storage.set("position", JSON.stringify(this.position));
    });
  }

  checkLogin() {
    this.storage.get('user').then((user) => {
      console.log(user)
      if (!user) {
        this.nav.setRoot("WelcomePage");
      } else {
        this.user = JSON.parse(user);
        this.menuCtrl.enable(true);
        let loading = this.loading.create({content: "cargando"});
        
        this.getPosition(() => this.nav.setRoot("PrincipalMenuPage"));
      }

    });//storage user
  }

  logout() {
    this.storage.remove('user');
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

