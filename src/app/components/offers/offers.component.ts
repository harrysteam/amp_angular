import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  public packages = [
    {
      "_id": "5c7d80eacdfe5c4078983c1c",
      "name": "AMP 'Lite'",
      "price": 199,
      "__v": 0
    },
    {
      "_id": "5c7d84289757a441a5b38677",
      "name": "AMP 'Pro'",
      "price": 399,
      "__v": 0
    }
  ]
  @Output('plan') selectedPlan: EventEmitter<any> = new EventEmitter<any>()
  constructor() { }

  ngOnInit() {
  }

  selectPlan(plan) {
    setTimeout(() => {
      this.selectedPlan.emit(plan);
    }, 300);
  }

}
