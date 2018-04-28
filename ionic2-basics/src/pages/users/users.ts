import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {UserPage} from "./user/user";

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  constructor(private navCtrl: NavController) {
  }

  navigateSingleUser(name: string) {
    this.navCtrl.push(UserPage, {
      name: name
    })
  }

  ionViewCanEnter(): boolean | Promise<boolean> {
    console.log('ionViewCanEnter');
    const rnd = Math.random();
    return rnd > 0.1;
  }

  ionViewDidLoad() {

    console.log("ionViewDidLoad?");
  }

  ionViewWillEnter() {
    console.log('will enter');
  }

  ionViewDidEnter() {
    console.log('didneter');
  }

  ionViewCanLeave(): boolean | Promise<void> {
    console.log('can leavE?');
    const promise = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      },1000);
    });
    return promise;
  }

  ionViewWillLeave(){
    console.log('will leave');
  }
  ionViewDidLeave(){
    console.log('did leavE?');
  }
  ionViewWillUnload(){
    console.log('unloading');
  }
}
