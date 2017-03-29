import {Pipe, PipeTransform} from '@angular/core';
import {names} from '../../config/russian-time';

@Pipe({
  name: 'datePipe'
})

export class DatePipeTemplate implements PipeTransform {
  transform(value: Date, args: any[]): any {
    let minutes: string;
    if(value.getMinutes().toString().length === 1){
      minutes= '0' + value.getMinutes();
    }
    return `${value.getDate()} ${names.monthNamesDate[value.getMonth()]} в ${value.getHours()}:${minutes}`;
  }
}
