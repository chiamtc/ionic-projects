import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

/** Page vs Components
 * page = the entire screen you see in the page
 * component - a part of the page or the entire page depends on the situation
 */
/**
 * Navigation
 * Ionic doesn't use Angular router, instead , using stack of "pages" concept
 * push a new page -> show the top-most page. Can also pop the page.
 */
