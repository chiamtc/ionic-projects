import { Component } from '@angular/core';
import {IonicPage,Toggle} from 'ionic-angular';
import {SettingsService} from "../../services/settings.service";
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  constructor(private settingSer:SettingsService){}

  onToggle(toggle:Toggle){
    this.settingSer.setBackground(toggle.checked);
  }

  checkAltBackground(){
    return this.settingSer.isAltBackground();
  }
}
