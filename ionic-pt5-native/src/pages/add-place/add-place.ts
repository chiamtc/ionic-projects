import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from '../../models/location.model';
import {Geolocation} from "@ionic-native/geolocation";
import {Camera} from '@ionic-native/camera';

/**
 * Generated class for the AddPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = new Location(-27.470125, 153.021072);
  locationIsSet = false;
  imageUrl:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams, private loader: LoadingController,
              private modalCtrl: ModalController, private geoLocation: Geolocation, private toast: ToastController,
              private camera: Camera) {
  }

  onSubmit(form: NgForm) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }

  onLocate() {
    const loader = this.loader.create({content: 'Locating...'});
    loader.present();
    this.geoLocation.getCurrentPosition()
      .then((data) => {
        console.log(data);
        this.location.lat = data.coords.latitude;
        this.location.lng = data.coords.longitude;
        this.locationIsSet = true;
        loader.dismiss();
      })
      .catch((err) => {
        const toast = this.toast.create({message: 'Failed to get your location', duration: 2500});
        toast.present();
        console.log(err);
        loader.dismiss();
      })
  }

  onTakePhoto() {
    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    }).then((data) => {
      console.log(data);
      this.imageUrl = data;
    }).catch((err) => {
      console.log(err);
    })
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(data => {
      if (!data) {
        return;
      }
      this.location = data.location;
      this.locationIsSet = true;
    });
  }

}
