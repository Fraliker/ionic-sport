export class PlaceService {
  id: number;
  name: string;
  price: number;
  sportCenterId: number;

  constructor(obj) {
    this.id = obj.id || null;
    this.name = obj.name || '';
    this.price = obj.price || null;
  }
}
