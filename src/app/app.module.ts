import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
/**
 * library
 */
import { TextMaskModule } from 'angular2-text-mask';
/**
 * pages import
 */
import {SmsVerifyPage, AuthenticationPage, DashboardPage,
        BookInfoPage, MainSportChoosePage, TimeSelectPage,
        PlaceChoosePage, PlacePage, OrderSubmitPage} from '../pages/pages';
/**
 * import providers
 */
import {AuthService} from '../providers/auth.service';
import {YandexMap} from "../pages/place-choose/map/map.component";
import {DashboardService} from "../pages/dashboard/dashboard.service";
import {SportCenterService} from "../providers/sport-center.service";
import {DynamicFormComponent} from "../pages/place/dynamic-form/dynamic-form";
import {DynamicFormQuestionComponent} from "../pages/place/dynamic-form/dynamic-form-question.component";
import {PaymentPage} from "../pages/payment/payment";
import {GeolocationService} from "../providers/geolocation.service";
import {DistanceKmPipe} from "../pages/place-choose/distance.pipe";

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
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    OrderSubmitPage,
    PaymentPage,
    DistanceKmPipe
  ],
  imports: [
    FormsModule,
    IonicModule.forRoot(MyApp),
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
    PaymentPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DashboardService,
    SportCenterService,
    GeolocationService
  ]
})
export class AppModule {}
