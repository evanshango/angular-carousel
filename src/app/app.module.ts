import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductItemComponent} from './product/product-item/product-item.component';
import {CarouselComponent} from './shared/carousel/carousel.component';
import {CommonModule} from "@angular/common";
import { BannerItemComponent } from './banner-item/banner-item.component';

@NgModule({
  declarations: [
    AppComponent, ProductListComponent, ProductItemComponent, CarouselComponent, BannerItemComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule, CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
