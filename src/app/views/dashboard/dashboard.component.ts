import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'al-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  click(): void {
    alert('CLICK!!!!');
  }

}
