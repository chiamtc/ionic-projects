import {Component} from '@angular/core';
import {IonicPage, ModalController} from 'ionic-angular';
import {QuotesService} from "../../services/quotes.service";
import {Quote} from "../../data/quote.interface";
import {QuotePage} from "../quote/quote";
import {SettingsService} from "../../services/settings.service";

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage{
  quotes:Quote[];
  constructor(private quotesService:QuotesService, private modalCtrl:ModalController, private settingsService:SettingsService ){
  }

  ionViewWillEnter(){
    this.quotes = this.quotesService.getFavouriteQuotes();
    console.log(this.quotes);
  }

  onViewQuote(quote){
      let modal = this.modalCtrl.create(QuotePage, quote);
      modal.present();
      modal.onDidDismiss((remove)=>{
        if(remove) {
          this.quotesService.removeQuoteFromFavourite(quote);
          this.quotes = this.quotesService.getFavouriteQuotes();
        }
      }) //a callback function
  }

  onRemoveFromFavourite(quote){
    this.quotesService.removeQuoteFromFavourite(quote);
    this.quotes = this.quotesService.getFavouriteQuotes();
  }

  isAltBackground(){
    return this.settingsService.isAltBackground();
  }
}
