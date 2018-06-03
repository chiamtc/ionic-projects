import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService:AuthService, private loadingCtrl:LoadingController,
              private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(f:NgForm){
    const loading = this.loadingCtrl.create({
      content:'Signing you up..'
    });
    loading.present();
    this.authService.signup(f.value.email, f.value.password)
      .then((data)=>{
        console.log(data);
        loading.dismiss();
      })
      .catch((err)=> {
        console.log(err);
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title:'Sign up failed',
          message:err.message,
          buttons:['Dismiss']
        });
        alert.present();
      });
  }

}
