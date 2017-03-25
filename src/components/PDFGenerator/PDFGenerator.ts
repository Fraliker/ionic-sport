import jsPDF from 'jspdf';
import {Booking} from "../../models/Booking";
import {Base64} from './base64Encoder';
import domtoimage from 'dom-to-image';
import {ElementRef} from "@angular/core";

export class PDFGenerator {
  constructor() {
  }

  public generateBase64PDF(booking: Booking, node: ElementRef) {
    let doc = new jsPDF('p', 'mm', 'a4');
    // let width = doc.internal.pageSize.width;
    // let height = doc.internal.pageSize.height;
    doc.setProperties({
      'title': 'Бронирование',
      'subject': 'Ваше бронирование',
      'author': 'me',
      'keywords': 'pdf'
    });

    return domtoimage.toPng(node.nativeElement).then((imgData) => {
      doc.addImage(imgData, 'PNG', 10, 25);
      return doc.output('dataurlstring');
    }).catch((err) => {
      console.log("Error in DomToImage", err);
    });
  }

  private generateHTML(booking: Booking): string {
    return `<h1>${booking.sportCenter}</h1>
            <h3>${booking.playingField}</h3>
             <h4>${booking.day}.${booking.month}.${booking.year}</h4>`;
  }
}
