import {Component} from '@angular/core';
import {UsersPage} from "../users/users";
import {ShopPage} from "../shop/shop";
import {NavController} from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usersPage = UsersPage;
  shopPage = ShopPage;
  constructor(private navCtrl:NavController){}
  onGoToUsers(){
    this.navCtrl.push(this.usersPage)
      .catch((err)=>{
        console.log("Access denied arguement is " + err);
      });
  }

}


/**
 * Page Lifecycle will get executed automatically without implements and only on iov-header/ion-nav aka page not component
 * 1. ionViewCanEnter > navigation guard = should the page loadeD?
 * 2. ionViewDidLoad > Page has loaded; not fired when cached => setup code for page
 * 3. ionViewWillEnter > Page is about to enter and become active Page.
 *  4. ionViewDidEnter > page has fully enetered and page is acitive, also fire when cached
 *  5. ionViewCanLeave > navigation guard = may the page leave?
 *  6. ionViewWillLeave > Page is about to lkeave and become inactive
 *  7. ionViewDidLeave > page finished leaving and is no inactive
 *  8. ionViewWillUnload > page is about to be destroyed and not cached anymore.
 **/
