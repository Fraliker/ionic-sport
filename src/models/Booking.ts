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
  orderSevices: string[] = [];
  date: Date;

  constructor(obj) {
    this.id = obj.id || null;
    this.sportCenter = obj.sportCenterName || null;
    this.playingField = obj.playingFieldName || null;
    this.year = obj.year || null;
    this.month = obj.month || null;
    this.day = obj.day || null;
    this.hour = obj.hour || null;
    this.priceTime = obj.price || 0;
    this.playFieldPrice = obj.price || 0;
    this.submit = obj.submit || 0;
    this.address = obj.address || 'Не указан';
    this.date = new Date(this.year, this.month, this.day, this.hour);
  }
}
