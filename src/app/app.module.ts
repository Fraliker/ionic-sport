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
import { AuthenticationPage } from '../pages/authentication/authentication.page';
import { Page2 } from '../pages/page2/page2';

/**
 * import services
 */
import {AuthService} from "../pages/authentication/authentication.service";

@NgModule({
  declarations: [
    MyApp,
    AuthenticationPage,
    Page2
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
    Page2
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
