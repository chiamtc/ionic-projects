import {Quote} from "../data/quote.interface";

export class QuotesService{
  private favouriteQuotes:Quote[]=[];

  addQuoteToFavourite(quote:Quote){
    this.favouriteQuotes.push(quote);
    console.log(this.favouriteQuotes);
  }

  removeQuoteFromFavourite(quote:Quote){
    const position = this.favouriteQuotes.findIndex((quoteEle)=>{
      return quote.id === quoteEle.id;
    });
    this.favouriteQuotes.splice(position,1);
    return this.favouriteQuotes.slice();
  }

  getFavouriteQuotes(){
    return this.favouriteQuotes.slice();
  }

  isQuoteFavourite(quote:Quote){
    return this.favouriteQuotes.find((quoteEle:Quote)=>{
      return quoteEle.id == quote.id;
    })
  }
}
