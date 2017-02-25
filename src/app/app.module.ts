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
        PlaceChoosePage} from '../pages/pages';
/**
 * import services
 */
import {AuthService} from '../app/services/auth.service';
import {YandexMap} from "../pages/place-choose/map/map.component";

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
    YandexMap
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
    PlaceChoosePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
