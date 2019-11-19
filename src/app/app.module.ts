import { LOCALE_ID } from '@angular/core';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePtBr);

import { InterceptorProvider } from './services/interceptor/interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BrMaskerModule } from 'br-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './components/components.module';

import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC3_Qy7h6N-VTde_eItr8bs-P3-IARWn7M",
  authDomain: "i-maria.firebaseapp.com",
  databaseURL: "https://i-maria.firebaseio.com",
  projectId: "i-maria",
  storageBucket: "i-maria.appspot.com",
  messagingSenderId: "766636459443",
  appId: "1:766636459443:web:f3403fd66524970937b7c6",
  measurementId: "G-NKMVDZNR2P"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, ComponentsModule, HttpClientModule, FormsModule, ReactiveFormsModule, BrMaskerModule, AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    Facebook,
    GooglePlus,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
