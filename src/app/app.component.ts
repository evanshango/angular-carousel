import {Component, OnInit} from '@angular/core';
import {banners} from "./interfaces/product";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  banners: any = banners

  constructor() {
  }

  ngOnInit(): void {

  }
}
