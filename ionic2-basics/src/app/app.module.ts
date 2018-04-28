import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {UsersPage} from "../pages/users/users";
import {UserPage} from "../pages/users/user/user";
import {BuyoutPage} from "../pages/buyout/buyout";
import {ShopPage} from "../pages/shop/shop";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UsersPage,
    UserPage,
    BuyoutPage,
    ShopPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp) /*provided from ionicModule includes httpmodule, formsmodule etc etc
                                forRoot() configure ionic 2 to wrap angular2 app */
  ],
  bootstrap: [IonicApp],
  entryComponents: [ /* each screen will put it here. entryComponents
  forces component to be "prepared" like modal in material angular*/
    MyApp,
    HomePage,
    UsersPage,
    UserPage,
    BuyoutPage,
    ShopPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
