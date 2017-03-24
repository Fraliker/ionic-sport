import jsPDF from 'jspdf';
import {Booking} from "../../models/Booking";
import {Base64} from './base64Encoder';

export class PDFGenerator {
  constructor() {
  }

  public generateBase64PDF(booking: Booking) {
    let doc = new jsPDF('p', 'pt', 'a4');
    doc.setProperties({
      'title': 'Бронирование',
      'subject': 'Ваше бронирование',
      'author': 'me',
      'keywords': 'pdf'
    });

    let text = this.generateHTML(booking);
    console.log(text);
    doc.setFontSize(14);
    doc.text('Some text', 35, 25);


    // let pdfOutput = doc.output("blob");  // as a blob
    // console.log('PDF output blob', pdfOutput);
    let pdfBase64 = doc.output('datauri');
    return pdfBase64;
  }

  private generateHTML(booking: Booking): string {
    return booking.sportCenter.toString() + booking.playingField.toString() + booking.day + booking.month + booking.year;
  }
}
