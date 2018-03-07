import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav, LoadingController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = 'WelcomePage';
  user: any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public storage: Storage,
    public loading: LoadingController,
    public menuCtrl: MenuController
  ){
    this.checkLogin();
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
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
        this.nav.setRoot("PrincipalMenuPage");

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

