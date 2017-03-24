import {SocialSharing} from '@ionic-native/social-sharing';
import {socialText} from './socialText';
import {Booking} from "../../models/Booking";

export class SocialShare extends SocialSharing {

  constructor() {
    super();
  }

  public sendSuppotMail() {
    return this.shareViaEmail(socialText.email, socialText.email, [socialText.suppotEmail]);
  }

  public sendMailBooking(id: string, booking: Booking) {

    let title = `Подтверждение бронирования №${id}”Текст письма: детали бронирования`;
    let bookingInfo = `В спортивном центе ${booking.sportCenter}, по адресу ${booking.address}, 
    ${booking.date.getDate()} ${booking.date.getMonth()} ${booking.date.getFullYear()}года.
     Стоимостью ${booking.playFieldPrice}`;

    let options = {
      message: bookingInfo, // not supported on some apps (Facebook, Instagram)
      subject: 'Бронирование', // fi. for email
      url: 'https://www.website.com/foo/#bar?a=b',
      chooserTitle: title // Android only, you can override the default share sheet title
    };

    return this.shareWithOptions(options);
  }

  /**
   * Send sms with
   * @return {Promise<any>}
   */
  public shareToFriend(date: Date) {

    let text =
      `${socialText.shareToFriend.message} ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} 
      ${socialText.shareToFriend.hrefMarket}  ${socialText.shareToFriend.hrefAppStore}`;

    return this.shareViaSMS(text, null);
  }
}


