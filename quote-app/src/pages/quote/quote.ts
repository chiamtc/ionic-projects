import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Quote} from "../../data/quote.interface";


@IonicPage()
@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html',
})
export class QuotePage {
  passQuote :Quote;
  //NavController - controsl the stack of page , push/pop etc etc
  //ViewController - only controls the current active page
  constructor(private viewController:ViewController, private navParams: NavParams) {
  }

  ionViewDidLoad(){
    this.passQuote = this.navParams.data;
    console.log(this.passQuote);
  }

  onClose(remove = false){
    this.viewController.dismiss(remove);//passing the data here to the beneath view (which the overlay appears on)
  }

}
