export class Booking {
  id: number;
  sportCenter: string;
  playingField: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  priceTime: number;
  playFieldPrice: number;
  submit: number;
  address: string;

  constructor(obj) {
    this.id = obj.id || null;
    this.sportCenter = obj.sportCenter || null;
    this.playingField = obj.playingFieldName || null;
    this.year = obj.year || null;
    this.month = obj.month || null;
    this.day = obj.day || null;
    this.hour = obj.hour || null;
    this.priceTime = obj.price || 0;
    this.playFieldPrice = obj.price || 0;
    this.submit = obj.submit || 0;
    this.address = obj.address || '';
  }
}
