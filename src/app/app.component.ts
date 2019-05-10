import { Component } from '@angular/core';
import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private role;
  private name;
  private position;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events: Events,
    private router: Router
  ) {
    this.initializeApp();

    events.subscribe('role', (role) => {
      this.role = role;
    });

    events.subscribe('name', (name) => {
      this.name = name;
    });

    events.subscribe('position', (position) => {
      this.position = position;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    sessionStorage.setItem('header', null);
    sessionStorage.setItem('username', null);
    sessionStorage.setItem('empName', null);
    sessionStorage.setItem('positionName', null);
  }
}