import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events: Events,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.eventsOfApp();
    this.verifyUserSession();
  }

  eventsOfApp() {
    this.events.subscribe('logout', (data) => {
      this.storage.clear();
      this.router.navigateByUrl('login');
    });
  }

  async verifyUserSession() {
    const token = await this.storage.get('token');
    if (token) {
      this.router.navigateByUrl('tabs/servicos');
    }
  }
}
