import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

export interface Invoice {
  "item": "Samsung Mobile",
  "quantity": 2,
  "unitprice": 100,
  "igst": {
    "percentage": 20,
    "amount": 40
  },
  "amount": 240
}
export interface InvoiceDiscount {
  "invoice": "",
  "discount": {
    "percentage": "",
    "price": ""
  }
}
@Injectable({
  providedIn: 'root'
})
export class InvoiceHttpService {

  constructor(private http: HttpClient) { }

  baseUrl = 'assets/invoice-test.json';

  getInvoiceItems(params: any, url: string): Observable<Invoice[]> {
    return this.http.get<Invoice>(`${url}`, { params: params }).pipe( //`${this.baseUrl}/${url}`
      map((res: any) => {
        return res;
      }),
      retry(3),
      catchError(this.handleError)
    )
  }

  getInvoiceSummary(params: any, url: string): Observable<InvoiceDiscount[]> {
    return this.http.get<InvoiceDiscount>(`${url}`, { params: params }).pipe( //`${this.baseUrl}/${url}`
      map((res: any) => {
        return res;
      }),
      retry(3),
      catchError(this.handleError)
    )
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
