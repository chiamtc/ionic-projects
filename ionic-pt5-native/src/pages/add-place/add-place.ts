import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {Location} from '../../models/location.model';
import {Geolocation} from "@ionic-native/geolocation";
import {Camera} from '@ionic-native/camera';
import {File, FileError, Entry} from '@ionic-native/file';
import {PlacesService} from "../../services/places.service";

declare var cordova: any;

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
  imageUrl: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private loader: LoadingController,
              private modalCtrl: ModalController, private geoLocation: Geolocation, private toast: ToastController,
              private camera: Camera, private placesService: PlacesService, private file: File) {
  }

  onSubmit(form: NgForm) {
    this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
    form.reset();
    this.location.lat = -27.470125;
    this.location.lng = 153.021072;
    this.imageUrl = '';
    this.locationIsSet = false;
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
      const currentName = data.replace(/^.*[\\\/]/, '');
      const path = data.replace(/[^\/]*$/, '');
      const newFileName = new Date().getUTCMilliseconds() + '.jpg';
      this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
        .then((data:Entry) => {
          this.imageUrl = data.nativeURL;
          this.camera.cleanup();
        })
        .catch((err:FileError) => {
          this.imageUrl = '';
          const toast = this.toast.create({
            message: 'Could not save the image. Try again',
            duration: 2500
          });
          toast.present();
          this.camera.cleanup();
        });
    }).catch((err) => {
      const toast = this.toast.create({
        message: 'Could not take the image. Try again',
        duration: 2500
      });
      toast.present();
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
