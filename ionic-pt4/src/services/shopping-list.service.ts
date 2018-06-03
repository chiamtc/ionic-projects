import {Ingredient} from "../model/ingredient.model";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth.service";
import 'rxjs/Rx';
import firebase from 'firebase';
import {Injectable} from "@angular/core";

@Injectable()
export class ShoppingListService{
  constructor(private http:Http, private authService:AuthService){}
  private ingredients:Ingredient[] =[];

  addItem(name:string, amount:number){
    this.ingredients.push(new Ingredient(name,amount));
    console.log(this.ingredients);
  }

  addItems(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
  }

  getItems(){
    return this.ingredients.slice();
  }

  removeItem(index:number){
    return this.ingredients.splice(index,1);
  }

  storeList(token:string){
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic-2-recipebook-2875e.firebaseio.com/'+ userId+'/shopping-list.json?auth='+token, this.ingredients)
      .map((response:Response)=>{
        return response.json();
      });
  }

  fetchList(token:string){
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic-2-recipebook-2875e.firebaseio.com/'+ userId+ '/shopping-list.json?auth='+token)
      .map((response:Response)=>{
        return response.json()
      })
      .do((data)=>{
        if(data) {
          this.ingredients = data;
        }else{
          this.ingredients=[];
        }
      })
  }
}
