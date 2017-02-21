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
import {SmsVerifyPage, AuthenticationPage} from '../pages/pages';
/**
 * import services
 */
import {AuthService} from "../pages/authentication/authentication.service";

@NgModule({
  declarations: [
    MyApp,
    AuthenticationPage,
    SmsVerifyPage
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
    SmsVerifyPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
