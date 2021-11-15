import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-banner-items',
  templateUrl: './banner-item.component.html',
  styleUrls: ['./banner-item.component.scss']
})
export class BannerItemComponent implements OnInit {
  @Input() banner: any

  constructor() { }

  ngOnInit(): void {
  }

}
