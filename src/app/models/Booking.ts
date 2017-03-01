export class Booking {
  id: number;
  sportCenter: string;
  playingField: string;
  year: number;
  mounth: number;
  day: number;
  hour: number;
  priceTime: number;
  playFieldPrice: number;

  constructor(obj) {
    this.id = obj.bookingId || null;
    this.sportCenter = obj.sportCenter || null;
    this.playingField = obj.playingField || null;
    this.year = obj.year || null;
    this.mounth = obj.mounth || null;
    this.day = obj.day || null;
    this.hour = obj.hours || null;
    this.priceTime = obj.priceTime || 0;
    this.playFieldPrice = obj.pricePlayingField || 0;
  }
}
