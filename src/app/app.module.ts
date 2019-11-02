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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './components/components.module';

import { Facebook } from '@ionic-native/facebook/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, ComponentsModule, HttpClientModule, FormsModule, ReactiveFormsModule, BrMaskerModule ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    Facebook,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
