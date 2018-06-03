import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Location} from '../../models/location.model';
/**
 * Generated class for the SetLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {
  location : Location;
  marker:Location;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController) {
    this.location = this.navParams.get('location');
    this.marker = this.navParams.get('isSet') ? this.location: null;
    console.log(this.location);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetLocationPage');
  }

  onSetMarker(event){
    this.marker = new Location(event.coords.lat, event.coords.lng);
  }

  onConfirm(){
    this.viewCtrl.dismiss({location:this.marker});
  }

  onAbort(){
    this.viewCtrl.dismiss();
  }

}
