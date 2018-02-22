import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = 'WelcomePage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
    });
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

