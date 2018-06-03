import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl:AlertController,
              private authService:AuthService, private loading:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSignin(f:NgForm){
    const loader= this.loading.create({
      content:'Signinig in..'
    });
    loader.present();
    this.authService.signin(f.value.email, f.value.password)
      .then(data=>{
        loader.dismiss();
      })
      .catch(err=>{
        console.log(err.message);
        loader.dismiss();
        const alert = this.alertCtrl.create({
          title:'Signin Failed',
          message:err.message,
          buttons:[
            'Dismiss'
          ]
        });
        alert.present();
      })
  }

}
