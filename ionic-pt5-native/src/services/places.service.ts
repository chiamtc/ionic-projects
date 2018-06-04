import {Place} from "../models/place";
import {Location} from '../models/location.model';
import {Storage} from '@ionic/storage';
import {Injectable} from "@angular/core";
import {File} from '@ionic-native/file';

declare var cordova: any;

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  constructor(private storage: Storage, private file: File) {
  }

  addPlace(title: string, description: string, location: Location, imageUrl: string) {
    const place = new Place(title, description, location, imageUrl);
    this.places.push(place);
    this.storage.set('places', this.places)
      .then(val => console.log(val))
      .catch((err) => {
        this.places.splice(this.places.indexOf(place), 1);
      });
  }

  loadPlaces() {
    return this.places.slice();
  }

  fetchPlaces() {
    return this.storage.get('places').then((data) => {
      this.places = (data != null ? data : []);
      return this.places.slice();
    }).catch(err => console.log(err));
  }

  deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);
    this.storage.set('places', this.places)
      .then(data => {
        this.removeFile(place);
      })
      .catch(err => console.log(err));
  }

  private removeFile(place: Place) {
    const currentName = place.imagePath.replace(/^.*[\\\/]/, '');
    this.file.removeFile(cordova.file.dataDirectory, currentName)
      .then(data => console.log(data)).catch(err => {
      console.log('error on removing file');
      this.addPlace(place.title, place.description, place.location, place.imagePath);
    });
  }


}
