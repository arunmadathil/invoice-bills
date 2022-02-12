import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  round(number: number, decimalPlaces = 0): number {
    var p = Math.pow(10, decimalPlaces);
    var n = (number * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
  }
}
