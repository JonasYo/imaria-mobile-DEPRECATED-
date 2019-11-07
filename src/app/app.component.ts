import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

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
    private router: Router,
    public push: Push
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.styleLightContent();
      this.eventsOfApp();
      this.verifyUserSession();
      this.pushNotification();
    });
  }

  pushNotification() {
    const options: PushOptions = {
      android: {
        senderID: "766636459443"
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };
    const pushObject: PushObject = this.push.init(options);
    pushObject.on('notification').subscribe(notification => {
      alert(notification.message);
    });
    pushObject.on('error').subscribe(error => {
      console.log('Error with Push plugin' + error)
    });
    pushObject.on('registration').subscribe(registration => {
      if (this.platform.is('ios')) {
        this.storage.set('registration', registration);
      } else if (this.platform.is('android')) {
        this.storage.set('registration', registration);
      }
    });
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
