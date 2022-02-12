import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/utils/helper.service';
@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.css']
})
export class FormItemComponent implements OnInit, OnChanges {

  @Input() public invoiceFormItem: FormGroup = new FormGroup({
    item: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl(''),
    total: new FormControl(''),
    gst: new FormControl('')
  });

  @Input() public itemIndex: number = 0;
  @Input() public passTaxType: boolean = true;
  @Output() removeItemEventEmitter: EventEmitter<number> = new EventEmitter;
  @Output() updatedFormValuesEmitter: EventEmitter<number> = new EventEmitter;

  public gstSlabs: any;
  public sgst: any = 0;
  public cgst: any = 0;

  constructor(private HelperService:HelperService) {

    this.gstSlabs = {
      '0.25': '@0.25%',
      '5': '@5%',
      '12': ' @12%',
      '18': '@18%',
      '28': '@28%'
    }
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.passTaxType == false) {
      this.passTaxType = false
    } else {
      this.passTaxType = true;
    }
  }

  static addInvoiceItem(): FormGroup {
    return new FormGroup({
      item: new FormControl(''),
      quantity: new FormControl(''),
      price: new FormControl(''),
      total: new FormControl(''),
      gst: new FormControl('')
    });
  }

  public removeItem(index: number) {
    this.removeItemEventEmitter.emit(index);
  }

  public updateOnchage(index: number) {
    return this.updatedFormValuesEmitter.emit(index);
  }

  updateOnQtyChange(itemIndex: number) {
    let price = this.invoiceFormItem.controls.price.value;
    let qty = this.invoiceFormItem.controls.quantity.value;
    let total = price * qty;
    if (this.passTaxType) {
      total = this.findGst(total);
    }
    if (price != null && price != '' && qty != null)
      this.invoiceFormItem.controls.total.setValue(this.roundDecimal(total));
    this.updateOnchage(itemIndex);
  }

  updateOnPriceChange(itemIndex: number) {
    let qty = this.invoiceFormItem.controls.quantity.value;
    let price = this.invoiceFormItem.controls.price.value;
    let total = price * qty;
    if (this.passTaxType) {
      total = this.findGst(total);
    }
    if (price != null && qty != null && qty != '')
      this.invoiceFormItem.controls.total.setValue(this.roundDecimal(total));
    this.updateOnchage(itemIndex);
  }

  updateOnTotalChange(itemIndex: number) {
    let qty = this.invoiceFormItem.controls.quantity?.value;
    if (qty == "" || qty == null || qty == undefined) {
      this.invoiceFormItem.controls.quantity.setValue(qty = 1);
    }
    let total = this.invoiceFormItem.controls.total.value;
    let gst = this.invoiceFormItem.controls.gst?.value;

    let price = total / qty;

    if (this.passTaxType) {
      price = (total / qty) - ((parseInt(this.invoiceFormItem.controls.gst?.value) * total) / 100);
      if (gst != null && gst != "")
        this.findGst(total);
    }
    if (qty != null && qty != '')
      this.invoiceFormItem.controls.price.setValue(this.roundDecimal(price));
    this.updateOnchage(itemIndex);
  }

  updateOnGstChange(itemIndex: number) {
    let qty = this.invoiceFormItem.controls.quantity?.value;
    let price = this.invoiceFormItem.controls.price?.value;
    let total = qty * price;
    if (qty != null && qty != '' && price != null && price != "")
      this.invoiceFormItem.controls.total.setValue(this.roundDecimal(this.findGst(total)));
    this.updateOnchage(itemIndex);
  }

  findGst(total: number) {
    let gst = this.invoiceFormItem.controls.gst?.value;
    let percentage = (gst * total) / 100;
    total += percentage;
    this.distributedGST(percentage) 
    return total;
  }

  distributedGST(gst: number) {//SGST and CGST
    this.sgst = this.roundDecimal(gst / 2, 2);
    this.cgst = this.sgst;
  }

  roundDecimal(num: number, place: number = 2) {
    return parseFloat(num.toFixed(place))
  }
}
