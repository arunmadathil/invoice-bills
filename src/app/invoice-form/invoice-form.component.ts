import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormItemComponent } from './form-item/form-item.component';

import { Router } from '@angular/router';


@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {

  public invoiceFormItems: FormGroup = new FormGroup({
    item: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl(''),
    total: new FormControl(''),
    gst: new FormControl('')
  });
  public discountFormFields: FormGroup = new FormGroup({
    bypercentage: new FormControl(''),
    byprice: new FormControl(''),
  })
  public grand_total: any = 0;
  public sub_total: number = 0;
  public taxType: any = false;
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.createInvoiceItemForm();
  }

  public createInvoiceItemForm(): void {
    this.invoiceFormItems = new FormGroup({
      items: new FormArray([
        FormItemComponent.addInvoiceItem(),
      ])
    });
  }
  get getInvoiceItem(): FormArray {
    return this.invoiceFormItems?.get('items') as FormArray;
  }

  getGroup(index: number) {
    return (this.invoiceFormItems.get('items') as FormArray)
      .at(index) as FormGroup
  }

  //Delete form groups
  public deleteItemFromList(index: number) {
    this.getInvoiceItem?.removeAt(index);
    this.invoiceSubTotal(this.invoiceFormItems.controls.items.value, index)
  }
  //Add new invoice item
  public addNewInvoiceItems() {
    this.getInvoiceItem.push(FormItemComponent.addInvoiceItem());
  }
  //Update individual form filed on input value change
  public updateFormControlValue(index: number) {
    this.invoiceSubTotal(this.invoiceFormItems.controls.items.value, index);
  }

  invoiceSubTotal(data: [], index: number) {
    let sub_tl = 0;
    data.forEach((item: any) => {
      if (item.total != '' && item.total != null) {
        sub_tl += parseFloat(item.total);
      }
      this.sub_total = sub_tl;
    });
    this.invoiceGrandTotal(this.sub_total )
  }

  updateGrandToatlOnDiscount(){ //Its return price
    let price = 0;
    if(this.sub_total != 0 && this.sub_total != null){
      let percentage = this.discountFormFields.controls.bypercentage.value
      price = percentage * this.sub_total/100  ;
      this.discountFormFields.controls.byprice.setValue(price.toFixed(0))
    }
    this.invoiceGrandTotal(this.sub_total);
  }

  updateGrandToatlOnPrice(){ //return Price
    let perncetage = 0;
    if(this.sub_total != 0 && this.sub_total != null){
      let price = this.discountFormFields.controls.byprice.value
      perncetage = price * 100 / this.sub_total;
      this.discountFormFields.controls.bypercentage.setValue(perncetage.toFixed(0))
    }
    this.invoiceGrandTotal(this.sub_total);
  }

  invoiceGrandTotal(sub_total : number){
    let price = this.discountFormFields.controls.byprice.value
    this.grand_total = (sub_total - price).toFixed(2);
  }

  getTaxType(e: any) {
    this.taxType = e.currentTarget.value;
  }

  public submitInvoiceForm() {
    console.log(this.invoiceFormItems.controls.items.value);
    this.router.navigateByUrl('invoice/data='+this.invoiceFormItems.controls.items.value);
    // this.router.parseUrl('/invoice');
  }
}
