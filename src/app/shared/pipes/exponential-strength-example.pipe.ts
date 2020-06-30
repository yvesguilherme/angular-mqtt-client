import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponentialStrengthExample'
})
export class ExponentialStrengthExamplePipe implements PipeTransform {

  transform(value: number, exponent?: number): number {
    return Math.pow(value, isNaN(exponent) ? 1 : exponent);
  }

}
