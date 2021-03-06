import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {TextMaskModule} from 'angular2-text-mask';
import {
  AuthenticationPage,
  BookInfoPage,
  DashboardPage,
  MainSportChoosePage,
  OrderSubmitPage,
  PlaceChoosePage,
  PlacePage,
  SmsVerifyPage,
  TimeSelectPage
} from '../pages/pages';

import {AuthService} from '../providers/auth.service';
import {YandexMap} from "../pages/place-choose/map/map.component";
import {DashboardService} from "../pages/dashboard/dashboard.service";
import {SportCenterService} from "../providers/sport-center.service";
import {PaymentPage} from "../pages/payment/payment";
import {DistanceKmPipe, DistancePlaceSort} from "../pages/place-choose/distance.pipe";
import {PaymentService} from "../providers/payment.service";
import {MapPage} from "../pages/map/map";
import {DatePipeTemplate} from "../components/pipes/date.pipe";
import {InAppBrowser} from "@ionic-native/in-app-browser";

@NgModule({
  declarations: [
    MyApp,
    AuthenticationPage,
    SmsVerifyPage,
    DashboardPage,
    BookInfoPage,
    MainSportChoosePage,
    TimeSelectPage,
    PlaceChoosePage,
    YandexMap,
    PlacePage,
    OrderSubmitPage,
    PaymentPage,
    DistanceKmPipe,
    DatePipeTemplate,
    DistancePlaceSort,
    MapPage
  ],
  imports: [
    FormsModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    }),
    TextMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthenticationPage,
    SmsVerifyPage,
    DashboardPage,
    BookInfoPage,
    MainSportChoosePage,
    TimeSelectPage,
    PlaceChoosePage,
    PlacePage,
    OrderSubmitPage,
    PaymentPage,
    MapPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DashboardService,
    SportCenterService,
    PaymentService,
    InAppBrowser
  ]
})
export class AppModule {
}
