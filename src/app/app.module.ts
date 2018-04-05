import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { MyApp } from './app.component';
import { LoginProvider } from '../providers/login/login';
import { RegisterUserProvider } from '../providers/register-user/register-user';
import { CountriesProvider } from '../providers/countries/countries';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { TiendasProvider } from '../providers/tiendas/tiendas';
import { ProductosProvider } from '../providers/productos/productos';
import { ProvinciasProvider } from '../providers/provincias/provincias';
import { PerfilProvider } from '../providers/perfil/perfil';
import { PaymentsProvider } from '../providers/payments/payments';
import { OrderProvider } from '../providers/order/order';
import { firebaseConfig } from '../config/environment';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RealtimegeoProvider } from '../providers/realtimegeo/realtimegeo';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__MiMandaito',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    // AgmCoreModule.forRoot({
    //   apiKey: "AIzaSyCTihzOZ4Uwl-QfqBZ6Vvcw1eSC0JaGyFc",
    //   libraries: ["places"]
    // }),    
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    RegisterUserProvider,
    CountriesProvider,
    CategoriasProvider,
    TiendasProvider,
    ProductosProvider,
    ProvinciasProvider,
    PerfilProvider,
    PaymentsProvider,
    OrderProvider,
    Geolocation,
    RealtimegeoProvider
  ]
})
export class AppModule {}
