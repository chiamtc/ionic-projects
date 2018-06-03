import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import firebase from 'firebase';
import {AuthService} from "../services/auth.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  tabsPage: any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;
  @ViewChild('nav') navCtrl: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController, private authService:AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyBdHUEkxWMtqSudZrwDJfgX4IyWf6gDORA",
      authDomain: "ionic-2-recipebook-2875e.firebaseapp.com",
      databaseURL: "https://ionic-2-recipebook-2875e.firebaseio.com",
      projectId: "ionic-2-recipebook-2875e",
      storageBucket: "ionic-2-recipebook-2875e.appspot.com",
      messagingSenderId: "662460279447"
    });
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.isAuthenticated = true;
        this.navCtrl.setRoot(this.tabsPage);
      }else {
        this.isAuthenticated = false;
        this.navCtrl.setRoot(this.signinPage);
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(types: any) {
    this.navCtrl.setRoot(types);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.navCtrl.setRoot(this.signinPage);
  }
}

