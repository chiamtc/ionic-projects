import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BuyoutPage} from "../buyout/buyout";

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  addItem(item:string){
    switch(item){
      case 'Milk':
        this.navCtrl.push(BuyoutPage,{'item':'milk', 'q':1});
        break;
      case 'Bread':
        this.navCtrl.push(BuyoutPage,{'item':'bread', 'q':2});
        break;
    }
    /** Third Parameters
     * animate (boolean): Whether or not the transition should animate.
       animation (string): What kind of animation should be used.
       direction (string): The conceptual direction the user is navigating. For example, is the user navigating forward, or back?
       duration (number): The length in milliseconds the animation should take.
       easing (string): The easing for the animation.
     * this.navCtrl.push(NewPage, {}, {
            direction: 'back', // default for push is 'forward'
            duration: 2000, // 2 seconds
            easing: 'ease-out'
        });
     * **/
  }

  onNavigateToBuy(){
    this.navCtrl.push(BuyoutPage);
  }
}
