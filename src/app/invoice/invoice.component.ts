import { Component, OnInit } from '@angular/core';
import { Invoice, InvoiceHttpService } from './invoice-http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  console = console;
  error: any;
  company: any = "Company Name";
  public from_address = [
    "Shop",
    "Addres line 1 ",
    "Addres line 2 ",
    "Location",
    "9033553533"
  ];
  public to_address = [
    "Arun",
    "Madathil H",
    "Alachey PO",
    "Kolayad",
    "9033553533"
  ];
  public items: any = [];
  public invoice_no: any;
  public summary: any = {
    invoice: "S2342",
    discount: {
      percentage: 10,
      price: 36
    },
    subtotal: 360,
    grandtotal: 324,
    date: "27 July,2021"
  }

  constructor(private invoiceHttp: InvoiceHttpService, private route: ActivatedRoute) {
    this.invoice_no = this.route.snapshot.params.invoice_number;
    this.getInvoice(this.invoice_no);
  }

  ngOnInit(): void {
  }

  getInvoice(invoice_no: string) {
    this.invoiceHttp.getInvoiceItems(null, 'assets/invoice-test-S2342.json')
      .subscribe(
        (data) => {
          this.items = data;
        },
        error => this.error = error // error path
      );
    this.getSummaryForInvoice(invoice_no);
  }
  getSummaryForInvoice(invoice_no: string) {
    this.invoiceHttp.getInvoiceSummary(null, 'assets/summary-invoice-test-S2342.json')
      .subscribe(
        (data) => {
          this.summary = data;
        },
        error => this.error = error // error path
      );
  }

}
