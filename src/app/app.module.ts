import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
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

import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
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
    ReactiveFormsModule,
    HttpClientModule
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
    Geolocation
  ]
})
export class AppModule {}
