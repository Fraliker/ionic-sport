import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'distanceKmPipe'
})

export class DistanceKmPipe implements PipeTransform {
  transform(value: number, args: any[]): string {
    return value.toFixed(2) + " км";
  }
}
