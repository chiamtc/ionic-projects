import { Component } from '@angular/core';
import {NavController, reorderArray} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items=['Apple', 'Bananas', 'Berries'];

  reorderItems(indexes){
    this.items = reorderArray(this.items, indexes);
  }
  constructor(public navCtrl: NavController) {

  }



  click(){
    console.log("asdomera");
  }

}
