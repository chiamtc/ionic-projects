import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {ShoppingListPage} from "../pages/shopping-list/shopping-list";
import {RecipePage} from "../pages/recipe/recipe";
import {RecipesPage} from "../pages/recipes/recipes";
import {EditRecipePage} from "../pages/edit-recipe/edit-recipe";
import {TabsPage} from "../pages/tabs/tabs";
import {ShoppingListService} from "../services/shopping-list.service";
import {RecipesService} from "../services/recipes.service";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {AuthService} from "../services/auth.service";
import {SlOptions} from "../pages/sl-options/sl-options";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    RecipePage,
    RecipesPage,
    EditRecipePage,
    TabsPage,
    SigninPage,
    SignupPage,
    SlOptions
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    RecipePage,
    RecipesPage,
    EditRecipePage,
    TabsPage,
    SigninPage,
    SignupPage,
    SlOptions
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppingListService,
    RecipesService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
