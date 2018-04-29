import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavParams} from 'ionic-angular';
import {Quote} from "../../data/quote.interface";
import {QuotesService} from "../../services/quotes.service";

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {
  quotes:{category:string, quotes:Quote[], icon:string};
  constructor(private navParams: NavParams,
              private alertCtrl:AlertController, private quoteService:QuotesService) {
  }

  ngOnInit(){
    this.quotes= this.navParams.data;
    console.log( this.quotes);
  }

  onAddToFavourites(quote:Quote){
    const alert = this.alertCtrl.create({
      title:'Add Quote',
      subTitle:'Are you sure?',
      message: 'Are you sure you want to add the quote?',
      buttons:[
        {
          text:'Yes, go ahead',
          handler:()=>{
           this.quoteService.addQuoteToFavourite(quote);
          }
        },
        {
          text:'No, I changed my mind',
          role:'cancel', //will be default option to cancel,
          // e.g. click the background, this handler will be executed if there's a cancel role.
          handler:()=>{
            console.log('canceled');
          }
        }
      ]
    });
    alert.present();
  }

  onRemoveFromFavourites(quote:Quote){
    this.quoteService.removeQuoteFromFavourite(quote);
  }

  isFavourite(quote:Quote){
    return this.quoteService.isQuoteFavourite(quote);
  }
}
