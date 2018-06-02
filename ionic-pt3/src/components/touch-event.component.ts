import {Component} from "@angular/core";

@Component({
  selector:'app-touch-event',
  template:`
    <div class="gesture" (click)="onElementClicked()">Click me</div>
    <div class="gesture" (tap)="onElementTap()">Tap me</div>
    <div class="gesture" (press)="onElementPress()">Tap me</div>
  `
})
export class TouchEventComponent{
  onElementClicked(){
    console.log(' I was clicked');
  }

  onElementTap(){
    console.log(' I was tapped');
  }

  onElementPress(){
    console.log(' I was pressed');
  }
}
