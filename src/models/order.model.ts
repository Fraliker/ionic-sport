import {Place} from "./place.model";
import {User} from "./user.model";

export class Order {
  place: Place;
  time: Date;
  price: number;
  user: User;
  orderList : any[];
  comment: string;

  constructor(obj: {place: Place, time: Date, price: number, user: User, orderList: any[], comment?: string}) {
    this.place = obj.place;
    this.time = obj.time;
    this.price = obj.price;
    this.user = obj.user;
    this.orderList = obj.orderList;
    this.comment = obj.comment || '';
  }
}
