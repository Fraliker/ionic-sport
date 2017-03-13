import {Place} from "./place.model";
import {User} from "./user.model";

export class Order {

  place: Place;
  time: Date;
  price: number;
  user: User;
  comment: string;

  constructor (obj) {

  }
}
