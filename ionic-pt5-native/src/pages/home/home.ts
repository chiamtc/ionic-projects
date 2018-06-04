import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AddPlacePage} from "../add-place/add-place";
import {Place} from "../../models/place";
import {PlacesService} from "../../services/places.service";
import {PlacePage} from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(public navCtrl: NavController, private placeService: PlacesService, private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.placeService.fetchPlaces().then((data:Place[]) => {
      this.places = data
    });
  }

  ionViewWillEnter() {
    this.places = this.placeService.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present();
  }


}
